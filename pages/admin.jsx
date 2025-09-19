import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Admin() {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('contact');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Use direct verify endpoint for production
      const isProduction = typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || 
         window.location.hostname === 'smartbookingcrm.live' ||
         window.location.protocol === 'https:');
      
      const authEndpoint = isProduction
        ? '/api/verify-direct'  // Use matching direct verify endpoint
        : '/api/auth/verify';
      
      const response = await fetch(authEndpoint);
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
      fetchData();
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch contact submissions
      const contactResponse = await fetch('/api/contact');
      const contactData = await contactResponse.json();
      
      if (contactData.success) {
        setContactSubmissions(contactData.data);
      }

      // Fetch job applications (use appropriate endpoint)
      const isProduction = typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || 
         window.location.hostname === 'smartbookingcrm.live' ||
         window.location.protocol === 'https:');
      
      const jobApiEndpoint = isProduction
        ? '/api/job-application-vercel'  // Use Vercel-optimized endpoint
        : '/api/job-application';        // Use original endpoint for local dev
      
      const jobResponse = await fetch(jobApiEndpoint);
      const jobData = await jobResponse.json();
      
      if (jobData.success) {
        setJobApplications(jobData.data);
      }

    } catch (err) {
      setError('Failed to fetch data');
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleLogout = async () => {
    try {
      // Use direct logout endpoint for production
      const isProduction = typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || 
         window.location.hostname === 'smartbookingcrm.live' ||
         window.location.protocol === 'https:');
      
      const logoutEndpoint = isProduction
        ? '/api/logout-direct'  // Use matching direct logout endpoint
        : '/api/auth/logout';
      
      await fetch(logoutEndpoint, { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const handleSelectItem = (id, type) => {
    const itemKey = `${type}-${id}`;
    setSelectedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(item => item !== itemKey)
        : [...prev, itemKey]
    );
  };

  const handleSelectAll = (type) => {
    const items = type === 'contact' ? contactSubmissions : jobApplications;
    const allItems = items.map(item => `${type}-${item.id}`);
    const currentTypeSelected = selectedItems.filter(item => item.startsWith(`${type}-`));
    
    if (currentTypeSelected.length === allItems.length) {
      // Deselect all of this type
      setSelectedItems(prev => prev.filter(item => !item.startsWith(`${type}-`)));
    } else {
      // Select all of this type
      setSelectedItems(prev => [
        ...prev.filter(item => !item.startsWith(`${type}-`)),
        ...allItems
      ]);
    }
  };

  const handleBulkDelete = async (type) => {
    const itemsToDelete = selectedItems
      .filter(item => item.startsWith(`${type}-`))
      .map(item => item.split('-')[1]);

    if (itemsToDelete.length === 0) {
      alert('Please select items to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${itemsToDelete.length} ${type} submission(s)? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/${type === 'contact' ? 'contact' : 'job-application'}/bulk-delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: itemsToDelete })
      });

      if (response.ok) {
        // Remove deleted items from state
        if (type === 'contact') {
          setContactSubmissions(prev => prev.filter(item => !itemsToDelete.includes(item.id.toString())));
        } else {
          setJobApplications(prev => prev.filter(item => !itemsToDelete.includes(item.id.toString())));
        }
        
        // Clear selections
        setSelectedItems(prev => prev.filter(item => !item.startsWith(`${type}-`)));
        
        alert(`Successfully deleted ${itemsToDelete.length} item(s)`);
      } else {
        alert('Failed to delete items');
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
      alert('Error deleting items');
    }
  };

  const exportToCSV = (data, filename, type) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    let headers, rows;
    if (type === 'contact') {
      headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Submitted'];
      rows = data.map(item => [
        item.id,
        item.name,
        item.email,
        item.phone,
        item.subject,
        item.message.replace(/[\n\r]/g, ' '), // Remove line breaks
        formatDate(item.created_at)
      ]);
    } else {
      headers = ['ID', 'Name', 'Title', 'Position', 'Email', 'Phone', 'Company', 'CV File', 'Submitted'];
      rows = data.map(item => [
        item.id,
        item.name,
        item.title,
        item.position,
        item.email,
        item.phone,
        item.company || 'N/A',
        item.cv_file_name || 'No CV',
        formatDate(item.created_at)
      ]);
    }

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredData = (data) => {
    let filtered = data;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(term)
        )
      );
    }

    // Date filter
    if (dateFilter.start || dateFilter.end) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.created_at);
        const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
        const endDate = dateFilter.end ? new Date(dateFilter.end + 'T23:59:59') : null;

        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
      });
    }

    return filtered;
  };

  const ProfileSettings = () => {
    const [profileData, setProfileData] = useState({
      full_name: user?.full_name || '',
      email: user?.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState('');
    const [profileError, setProfileError] = useState('');

    const handleProfileChange = (e) => {
      setProfileData({
        ...profileData,
        [e.target.name]: e.target.value
      });
      setProfileMessage('');
      setProfileError('');
    };

    const handleProfileSubmit = async (e) => {
      e.preventDefault();
      setProfileLoading(true);
      setProfileMessage('');
      setProfileError('');

      // Validate password change
      if (profileData.new_password && profileData.new_password !== profileData.confirm_password) {
        setProfileError('New passwords do not match');
        setProfileLoading(false);
        return;
      }

      try {
        const updateData = {
          full_name: profileData.full_name,
          email: profileData.email,
        };

        if (profileData.new_password) {
          updateData.current_password = profileData.current_password;
          updateData.new_password = profileData.new_password;
        }

        // Use direct profile endpoint for production
        const isProduction = typeof window !== 'undefined' && 
          (window.location.hostname.includes('vercel.app') || 
           window.location.hostname === 'smartbookingcrm.live' ||
           window.location.protocol === 'https:');
        
        const profileEndpoint = isProduction
          ? '/api/profile-direct'  // Use matching direct profile endpoint
          : '/api/auth/profile';
        
        const response = await fetch(profileEndpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setProfileMessage('Profile updated successfully');
          // Update local user data
          setUser({ ...user, full_name: profileData.full_name, email: profileData.email });
          // Clear password fields
          setProfileData({
            ...profileData,
            current_password: '',
            new_password: '',
            confirm_password: ''
          });
        } else {
          setProfileError(data.error || 'Failed to update profile');
        }
      } catch (error) {
        setProfileError('Network error. Please try again.');
      } finally {
        setProfileLoading(false);
      }
    };

    return (
      <div className="admin-profile-container">
        <div className="admin-profile-card">
          <div className="admin-profile-header">
            <h2 className="admin-profile-title">
              <i className="fas fa-user-cog"></i>
              Profile Settings
            </h2>
          </div>
          <div className="admin-profile-body">
            {profileMessage && (
              <div className="admin-alert admin-alert-success">
                <i className="fas fa-check-circle"></i>
                {profileMessage}
              </div>
            )}

            {profileError && (
              <div className="admin-alert admin-alert-danger">
                <i className="fas fa-exclamation-triangle"></i>
                {profileError}
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="full_name" className="admin-form-label">Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="admin-form-input"
                    value={profileData.full_name}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="email" className="admin-form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="admin-form-input"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>

              <hr className="admin-form-divider" />

              <h6 className="admin-form-section-title">Change Password (Optional)</h6>

              <div className="admin-form-group">
                <label htmlFor="current_password" className="admin-form-label">Current Password</label>
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  className="admin-form-input"
                  value={profileData.current_password}
                  onChange={handleProfileChange}
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label htmlFor="new_password" className="admin-form-label">New Password</label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    className="admin-form-input"
                    value={profileData.new_password}
                    onChange={handleProfileChange}
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="confirm_password" className="admin-form-label">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    className="admin-form-input"
                    value={profileData.confirm_password}
                    onChange={handleProfileChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="admin-form-footer">
                <button
                  type="submit"
                  className="admin-form-submit"
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <>
                      <div className="admin-spinner"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      Update Profile
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="admin-profile-info">
              <i className="fas fa-info-circle me-1"></i>
              Username: <strong>{user?.username}</strong> | 
              Last login: {user?.last_login ? formatDate(user.last_login) : 'Never'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactSubmissionsTable = () => {
    const filteredData = getFilteredData(contactSubmissions);
    const selectedContactItems = selectedItems.filter(item => item.startsWith('contact-'));

    return (
      <>
        {/* Advanced Controls */}
        <div className="admin-controls">
          <div className="admin-controls-row">
            <div className="admin-search-container">
              <div className="admin-search-box">
                <i className="fas fa-search admin-search-icon"></i>
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="admin-search-clear"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="admin-action-buttons">
              <button 
                className={`admin-btn admin-btn-filters ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="fas fa-filter"></i>
                <span>Filters</span>
              </button>
              <button 
                className="admin-btn admin-btn-export"
                onClick={() => exportToCSV(filteredData, 'contact-submissions.csv', 'contact')}
              >
                <i className="fas fa-download"></i>
                <span>Export CSV</span>
              </button>
              {selectedContactItems.length > 0 && (
                <button 
                  className="admin-btn admin-btn-delete"
                  onClick={() => handleBulkDelete('contact')}
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete Selected ({selectedContactItems.length})</span>
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="admin-filter-panel">
              <div className="admin-filter-row">
                <div className="admin-filter-group">
                  <label className="admin-filter-label">From Date</label>
                  <input
                    type="date"
                    className="admin-filter-input"
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div className="admin-filter-group">
                  <label className="admin-filter-label">To Date</label>
                  <input
                    type="date"
                    className="admin-filter-input"
                    value={dateFilter.end}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
                <div className="admin-filter-group">
                  <label className="admin-filter-label">&nbsp;</label>
                  <button 
                    className="admin-filter-clear"
                    onClick={() => setDateFilter({ start: '', end: '' })}
                  >
                    Clear Dates
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="admin-results-summary">
          Showing {filteredData.length} of {contactSubmissions.length} submissions
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="admin-checkbox"
                    onChange={() => handleSelectAll('contact')}
                    checked={selectedContactItems.length === contactSubmissions.length && contactSubmissions.length > 0}
                  />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={selectedItems.includes(`contact-${submission.id}`)}
                      onChange={() => handleSelectItem(submission.id, 'contact')}
                    />
                  </td>
                  <td><span className="admin-badge">{submission.id}</span></td>
                  <td className="admin-cell-name">{submission.name}</td>
                  <td className="admin-cell-contact">
                    <div className="admin-contact-info">
                      <div className="admin-contact-item email">
                        <a href={`mailto:${submission.email}`} className="admin-contact-link">
                          <i className="fas fa-envelope admin-contact-icon"></i>
                          <span>{submission.email}</span>
                        </a>
                      </div>
                      <div className="admin-contact-item phone">
                        <a href={`tel:${submission.phone}`} className="admin-contact-link">
                          <i className="fas fa-phone admin-contact-icon"></i>
                          <span>{submission.phone}</span>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="admin-cell-subject">{submission.subject}</td>
                  <td className="admin-cell-message">
                    <div className="admin-message-container">
                      <div className="admin-message-preview" title={submission.message}>
                        {submission.message}
                      </div>
                      {submission.message.length > 100 && (
                        <button className="admin-message-expand" title="View full message">
                          <i className="fas fa-expand-alt"></i>
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="admin-cell-date">{formatDate(submission.created_at)}</td>
                  <td className="admin-cell-actions">
                    <button 
                      className="admin-action-btn"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this submission?')) {
                          setSelectedItems([`contact-${submission.id}`]);
                          setTimeout(() => handleBulkDelete('contact'), 100);
                        }
                      }}
                      title="Delete submission"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="admin-no-data">
              <div className="admin-no-data-icon">
                <i className="fas fa-inbox"></i>
              </div>
              <h5 className="admin-no-data-title">No submissions found</h5>
              <p className="admin-no-data-text">
                {searchTerm || dateFilter.start || dateFilter.end 
                  ? 'Try adjusting your search or filters' 
                  : 'Contact submissions will appear here'}
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  const JobApplicationsTable = () => {
    const filteredData = getFilteredData(jobApplications);
    const selectedJobItems = selectedItems.filter(item => item.startsWith('jobs-'));

    return (
      <>
        {/* Advanced Controls */}
        <div className="admin-controls">
          <div className="admin-controls-row">
            <div className="admin-search-container">
              <div className="admin-search-box">
                <i className="fas fa-search admin-search-icon"></i>
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="admin-search-clear"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="admin-action-buttons">
              <button 
                className={`admin-btn admin-btn-filters ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="fas fa-filter"></i>
                <span>Filters</span>
              </button>
              <button 
                className="admin-btn admin-btn-export"
                onClick={() => exportToCSV(filteredData, 'job-applications.csv', 'jobs')}
              >
                <i className="fas fa-download"></i>
                <span>Export CSV</span>
              </button>
              {selectedJobItems.length > 0 && (
                <button 
                  className="admin-btn admin-btn-delete"
                  onClick={() => handleBulkDelete('jobs')}
                >
                  <i className="fas fa-trash"></i>
                  <span>Delete Selected ({selectedJobItems.length})</span>
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="admin-filter-panel">
              <div className="admin-filter-row">
                <div className="admin-filter-group">
                  <label className="admin-filter-label">From Date</label>
                  <input
                    type="date"
                    className="admin-filter-input"
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div className="admin-filter-group">
                  <label className="admin-filter-label">To Date</label>
                  <input
                    type="date"
                    className="admin-filter-input"
                    value={dateFilter.end}
                    onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
                <div className="admin-filter-group">
                  <label className="admin-filter-label">&nbsp;</label>
                  <button 
                    className="admin-filter-clear"
                    onClick={() => setDateFilter({ start: '', end: '' })}
                  >
                    Clear Dates
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="admin-results-summary">
          Showing {filteredData.length} of {jobApplications.length} applications
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Table */}
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="admin-checkbox"
                    onChange={() => handleSelectAll('jobs')}
                    checked={selectedJobItems.length === jobApplications.length && jobApplications.length > 0}
                  />
                </th>
                <th>ID</th>
                <th>Candidate</th>
                <th>Position</th>
                <th>Contact</th>
                <th>CV</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((application) => (
                <tr key={application.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={selectedItems.includes(`jobs-${application.id}`)}
                      onChange={() => handleSelectItem(application.id, 'jobs')}
                    />
                  </td>
                  <td><span className="admin-badge">{application.id}</span></td>
                  <td className="admin-cell-candidate">
                    <div className="admin-candidate-info">
                      <div className="admin-candidate-name">{application.name}</div>
                      <div className="admin-candidate-title">{application.title}</div>
                      {application.company && (
                        <div className="admin-candidate-company">
                          <i className="fas fa-building"></i>
                          {application.company}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="admin-cell-position">
                    <span className="admin-position-badge">{application.position}</span>
                  </td>
                  <td className="admin-cell-contact">
                    <div className="admin-contact-info">
                      <div className="admin-contact-item email">
                        <a href={`mailto:${application.email}`} className="admin-contact-link">
                          <i className="fas fa-envelope admin-contact-icon"></i>
                          <span>{application.email}</span>
                        </a>
                      </div>
                      <div className="admin-contact-item phone">
                        <a href={`tel:${application.phone}`} className="admin-contact-link">
                          <i className="fas fa-phone admin-contact-icon"></i>
                          <span>{application.phone}</span>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="admin-cell-cv">
                    {application.cv_file_path ? (
                      <div className="admin-cv-container">
                        <div className="admin-cv-file-info">
                          <div className="admin-cv-icon">
                            <i className="fas fa-file-pdf"></i>
                          </div>
                          <div className="admin-cv-details">
                            <div className="admin-cv-name" title={application.cv_file_name}>
                              {application.cv_file_name}
                            </div>
                            <div className="admin-cv-size">
                              {(application.cv_file_size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <a 
                          href={`/api/download-cv/${application.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="admin-cv-download"
                          title="Download CV"
                        >
                          <i className="fas fa-download"></i>
                          <span>Download</span>
                        </a>
                      </div>
                    ) : application.cv_link ? (
                      <div className="admin-cv-container">
                        <div className="admin-cv-file-info">
                          <i className="fas fa-external-link-alt"></i>
                          <span>External CV</span>
                        </div>
                        <a href={application.cv_link} target="_blank" rel="noopener noreferrer" className="admin-cv-download">
                          <i className="fas fa-eye"></i>
                          <span>View</span>
                        </a>
                      </div>
                    ) : (
                      <div className="admin-no-cv">
                        <i className="fas fa-file-times"></i>
                        <span>No CV</span>
                      </div>
                    )}
                  </td>
                  <td className="admin-cell-date">{formatDate(application.created_at)}</td>
                  <td className="admin-cell-actions">
                    <button 
                      className="admin-action-btn"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this application?')) {
                          setSelectedItems([`jobs-${application.id}`]);
                          setTimeout(() => handleBulkDelete('jobs'), 100);
                        }
                      }}
                      title="Delete application"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="admin-no-data">
              <div className="admin-no-data-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h5 className="admin-no-data-title">No applications found</h5>
              <p className="admin-no-data-text">
                {searchTerm || dateFilter.start || dateFilter.end 
                  ? 'Try adjusting your search or filters' 
                  : 'Job applications will appear here'}
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  if (!user) {
    return (
      <div className="admin-body">
        <div className="admin-container">
          <div className="admin-loading">
            <div className="admin-loading-spinner"></div>
            <div className="admin-loading-text">Authenticating...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Belloo</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/fonts/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/admin-modern.css" />
      </Head>

      <div className="admin-body">
        <div className="admin-container">
          <div className="admin-header">
            <div className="admin-header-content">
              <h1 className="admin-title">Admin Dashboard</h1>
              <div className="admin-user-info">
                <div className="admin-user-dropdown">
                  <button 
                    className="admin-user-trigger" 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowProfile(!showProfile);
                    }}
                  >
                    <i className="fas fa-user-circle"></i>
                    <span>{user?.full_name || user?.username}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  {showProfile && (
                    <div className="admin-user-menu">
                      <button 
                        className="admin-user-menu-item" 
                        onClick={() => {
                          setActiveTab('profile');
                          setShowProfile(false);
                        }}
                      >
                        <i className="fas fa-user-cog me-2"></i>
                        Profile Settings
                      </button>
                      <button 
                        className="admin-user-menu-item danger" 
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={fetchData} 
                  className="admin-refresh-btn"
                  disabled={loading}
                >
                  <i className="fas fa-sync-alt me-1"></i>
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="admin-alert admin-alert-danger">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="admin-tabs">
            <ul className="admin-tab-list">
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <i className="fas fa-envelope"></i>
                  <span>Contact Submissions</span>
                  <span className="admin-tab-counter">{contactSubmissions.length}</span>
                </button>
              </li>
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('jobs')}
                >
                  <i className="fas fa-briefcase"></i>
                  <span>Job Applications</span>
                  <span className="admin-tab-counter">{jobApplications.length}</span>
                </button>
              </li>
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="fas fa-user-cog"></i>
                  <span>Profile Settings</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          {loading ? (
            <div className="admin-loading">
              <div className="admin-loading-spinner"></div>
              <div className="admin-loading-text">Loading data...</div>
            </div>
          ) : (
            <div className="admin-content">
              {activeTab === 'contact' && <ContactSubmissionsTable />}
              {activeTab === 'jobs' && <JobApplicationsTable />}
              {activeTab === 'profile' && <ProfileSettings />}
            </div>
          )}
        </div>
      </div>

    </>
  );
}
