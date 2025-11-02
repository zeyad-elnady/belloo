import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function WebsiteEditor() {
  const [activeSection, setActiveSection] = useState('products');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Products state
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // News state
  const [news, setNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [showNewsModal, setShowNewsModal] = useState(false);

  // Homepage featured products state
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Media state
  const [media, setMedia] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingMedia, setEditingMedia] = useState(null);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  
  // Gallery images for products
  const [galleryImages, setGalleryImages] = useState([]);

  // Image Replacer state
  const [selectedImage, setSelectedImage] = useState('');
  const [replacePreview, setReplacePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageCategory, setImageCategory] = useState('all');

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
      fetchAllData();
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchProducts(),
      fetchNews(),
      fetchMedia()
    ]);
    setLoading(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      const data = await response.json();
      if (data.success) {
        // Add cache-busting timestamp to all image URLs
        const mediaWithCacheBust = data.data.map(item => ({
          ...item,
          public_url: item.is_static 
            ? `${item.public_url}?t=${Date.now()}` 
            : item.public_url
        }));
        setMedia(mediaWithCacheBust);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Products Section Component
  const ProductsSection = () => (
    <div className="cms-section">
      <div className="cms-header">
        <h2>
          <i className="fas fa-box"></i> Products Management
        </h2>
        <button className="btn btn-primary" onClick={() => {
          setEditingProduct(null);
          setShowProductModal(true);
        }}>
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>

      <div className="cms-stats">
        <div className="stat-card">
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">All Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.category === 'green-olives').length}</div>
          <div className="stat-label">Green Olives</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.category === 'black-olives').length}</div>
          <div className="stat-label">Black Olives</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.category === 'peppers').length}</div>
          <div className="stat-label">Peppers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.category === 'artichokes' || p.category === 'pickles').length}</div>
          <div className="stat-label">Pickles & Vegetables</div>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.main_image ? (
                <img src={product.main_image} alt={product.name_en} />
              ) : (
                <div className="no-image">
                  <i className="fas fa-box"></i>
                </div>
              )}
              {product.is_featured && (
                <span className="badge badge-featured">
                  <i className="fas fa-star"></i> Featured
                </span>
              )}
              <span className={`badge badge-status ${product.is_published ? 'published' : 'draft'}`}>
                {product.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="product-info">
              <h3>#{product.display_id} - {product.name_en}</h3>
              {product.category && <span className="category-badge">{product.category}</span>}
              <div className="product-actions">
                <button className="btn btn-sm btn-edit" onClick={() => {
                  setEditingProduct(product);
                  setShowProductModal(true);
                }}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => handleDeleteProduct(product.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-box-open"></i>
          <h3>No Products Yet</h3>
          <p>Start by adding your first product</p>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-box"></i>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button className="modal-close" onClick={() => setShowProductModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="product-form">
              <div className="form-section">
                <h3>Basic Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Slug (URL-friendly name) *</label>
                    <input
                      type="text"
                      name="slug"
                      defaultValue={editingProduct?.slug}
                      placeholder="whole-green-olives"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category *</label>
                    <select name="category" defaultValue={editingProduct?.category} required>
                      <option value="">Select category</option>
                      <option value="green-olives">Green Olives</option>
                      <option value="black-olives">Black Olives</option>
                      <option value="peppers">Peppers</option>
                      <option value="artichokes">Artichokes</option>
                      <option value="pickles">Pickles & Vegetables</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Name (English) *</label>
                    <input
                      type="text"
                      name="name_en"
                      defaultValue={editingProduct?.name_en}
                      placeholder="Whole Green Olives"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Name (Arabic)</label>
                    <input
                      type="text"
                      name="name_ar"
                      defaultValue={editingProduct?.name_ar}
                      placeholder="زيتون أخضر كامل"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Name (Russian)</label>
                    <input
                      type="text"
                      name="name_ru"
                      defaultValue={editingProduct?.name_ru}
                      placeholder="Зеленые оливки целые"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Description</h3>
                
                <div className="form-group">
                  <label>Description (English)</label>
                  <textarea
                    name="description_en"
                    defaultValue={editingProduct?.description_en}
                    placeholder="Premium whole green olives..."
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Description (Arabic)</label>
                  <textarea
                    name="description_ar"
                    defaultValue={editingProduct?.description_ar}
                    placeholder="زيتون أخضر كامل ممتاز..."
                    rows="3"
                    dir="rtl"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Description (Russian)</label>
                  <textarea
                    name="description_ru"
                    defaultValue={editingProduct?.description_ru}
                    placeholder="Премиум целые зеленые оливки..."
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h3>Main Product Image (Glass Jars)</h3>
                
                <div className="form-group">
                  <label>Upload Glass Jars Photo from Device</label>
                  <input
                    type="file"
                    name="main_image_file"
                    accept="image/*"
                    className="file-input"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const preview = document.getElementById('image-preview');
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          preview.src = e.target.result;
                          preview.style.display = 'block';
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <small>This will be the default view. Supported formats: JPG, PNG, WebP (max 5MB)</small>
                </div>

                {editingProduct?.main_image && (
                  <div className="form-group">
                    <label>Current Image</label>
                    <div className="current-image-preview">
                      <img src={editingProduct.main_image} alt="Current product" />
                    </div>
                  </div>
                )}

                <div className="image-preview-container">
                  <img id="image-preview" className="image-preview" style={{ display: 'none' }} alt="Preview" />
                </div>

                <div className="form-group">
                  <label>Or paste image URL (optional)</label>
                  <input
                    type="text"
                    name="main_image_url"
                    defaultValue={editingProduct?.main_image}
                    placeholder="/assets/images/products/..."
                  />
                  <small>Use this if the image is already uploaded elsewhere</small>
                </div>
              </div>

              <div className="form-section">
                <h3>
                  <i className="fas fa-images"></i>
                  Other Packaging Views (Optional)
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  Upload images for other packaging types. These will appear as toggle buttons on the product page.
                </p>

                <div className="gallery-simple-upload">
                  <div className="form-group">
                    <label>1. Cans Photo</label>
                    <input
                      type="file"
                      id="gallery-cans"
                      accept="image/*"
                      className="file-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>2. Vacuum Bags Photo</label>
                    <input
                      type="file"
                      id="gallery-vacuum"
                      accept="image/*"
                      className="file-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>3. Buckets Photo</label>
                    <input
                      type="file"
                      id="gallery-buckets"
                      accept="image/*"
                      className="file-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>4. Barrels Photo</label>
                    <input
                      type="file"
                      id="gallery-barrels"
                      accept="image/*"
                      className="file-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>5. PET Packs Photo</label>
                    <input
                      type="file"
                      id="gallery-pet-packs"
                      accept="image/*"
                      className="file-input"
                    />
                  </div>

                  <div style={{ marginTop: '15px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#1e40af' }}>
                      <i className="fas fa-info-circle"></i> <strong>Tip:</strong> Upload only the packaging types you have. Leave others empty if not needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Settings</h3>
                
                <div className="form-checkboxes">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="is_published"
                      defaultChecked={editingProduct?.is_published !== false}
                    />
                    <span>Published (visible on website)</span>
                  </label>
                  
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="is_featured"
                      defaultChecked={editingProduct?.is_featured}
                    />
                    <span>Featured Product</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowProductModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i>
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // News Section Component
  const NewsSection = () => (
    <div className="cms-section">
      <div className="cms-header">
        <h2>
          <i className="fas fa-newspaper"></i> News & Blog Management
        </h2>
        <button className="btn btn-primary" onClick={() => {
          setEditingNews(null);
          setShowNewsModal(true);
        }}>
          <i className="fas fa-plus"></i> Add New Article
        </button>
      </div>

      <div className="cms-stats">
        <div className="stat-card">
          <div className="stat-value">{news.length}</div>
          <div className="stat-label">Total Articles</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{news.filter(n => n.is_published).length}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {news.reduce((sum, n) => sum + (n.views_count || 0), 0)}
          </div>
          <div className="stat-label">Total Views</div>
        </div>
      </div>

      <div className="news-list">
        {news.map((article) => (
          <div key={article.id} className="news-card">
            <div className="news-image">
              {article.featured_image ? (
                <img src={article.featured_image} alt={article.title_en} />
              ) : (
                <div className="no-image">
                  <i className="fas fa-newspaper"></i>
                </div>
              )}
            </div>
            <div className="news-content">
              <div className="news-header">
                <h3>#{article.display_id} - {article.title_en}</h3>
                <span className={`badge badge-status ${article.is_published ? 'published' : 'draft'}`}>
                  {article.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              {article.excerpt_en && <p className="news-excerpt">{article.excerpt_en}</p>}
              <div className="news-meta">
                {article.category && <span className="category-badge">{article.category}</span>}
                {article.author_name && <span><i className="fas fa-user"></i> {article.author_name}</span>}
                <span><i className="fas fa-eye"></i> {article.views_count || 0} views</span>
                <span><i className="fas fa-calendar"></i> {formatDate(article.created_at)}</span>
              </div>
              <div className="news-actions">
                <button className="btn btn-sm btn-edit" onClick={() => {
                  setEditingNews(article);
                  setShowNewsModal(true);
                }}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => handleDeleteNews(article.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-newspaper"></i>
          <h3>No Articles Yet</h3>
          <p>Start by adding your first news article or blog post</p>
        </div>
      )}

      {/* News Modal */}
      {showNewsModal && (
        <div className="modal-overlay" onClick={() => setShowNewsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-newspaper"></i>
                {editingNews ? 'Edit Article' : 'Add New Article'}
              </h2>
              <button className="modal-close" onClick={() => setShowNewsModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSaveNews} className="product-form" key={editingNews?.id || 'new'}>
              
              {/* Quick Settings Row */}
              <div className="form-section" style={{ background: '#f8fafc', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label><strong>Category</strong></label>
                    <select name="category" defaultValue={editingNews?.category || ''} style={{ width: '100%' }}>
                      <option value="">Select category</option>
                      <option value="News">News</option>
                      <option value="Blog">Blog</option>
                      <option value="Technology">Technology</option>
                      <option value="Quality">Quality</option>
                      <option value="Business">Business</option>
                      <option value="Sustainability">Sustainability</option>
                    </select>
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label><strong>Author</strong></label>
                    <input
                      type="text"
                      name="author_name"
                      defaultValue={editingNews?.author_name || 'Expert Team'}
                      placeholder="Expert Team"
                    />
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label><strong>Date</strong></label>
                    <input
                      type="date"
                      name="published_at"
                      defaultValue={editingNews?.published_at ? new Date(editingNews.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0, paddingBottom: '5px' }}>
                    <label className="checkbox-label" style={{ marginBottom: 0 }}>
                      <input
                        type="checkbox"
                        name="is_published"
                        defaultChecked={editingNews?.is_published !== false}
                      />
                      <span><strong>Published</strong></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Hidden slug field - auto-generated from title */}
              <input type="hidden" name="slug" defaultValue={editingNews?.slug || editingNews?.title_en?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'new-article'} />

              {/* Main Content - English */}
              <div className="form-section">
                <h3 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #e2e8f0' }}>
                  <i className="fas fa-newspaper"></i> Article Content
                </h3>
                
                <div className="form-group">
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>Title (English) *</label>
                  <input
                    type="text"
                    name="title_en"
                    defaultValue={editingNews?.title_en}
                    placeholder="Enter article title..."
                    required
                    style={{ fontSize: '16px', padding: '12px' }}
                  />
                </div>
                
                <div className="form-group">
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>Summary (English)</label>
                  <textarea
                    name="excerpt_en"
                    defaultValue={editingNews?.excerpt_en}
                    placeholder="Brief summary of the article (1-2 sentences)..."
                    rows="2"
                    style={{ fontSize: '15px' }}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                    Full Article (English)
                  </label>
                  <textarea
                    name="content_en"
                    defaultValue={editingNews?.content_en}
                    placeholder="Write your full article content here. You can use HTML tags like <h2>, <p>, <ul>, <li>..."
                    rows="12"
                    style={{ fontSize: '15px', fontFamily: 'monospace' }}
                  ></textarea>
                  <small style={{ display: 'block', marginTop: '8px', padding: '8px', background: '#f1f5f9', borderRadius: '4px' }}>
                    💡 <strong>Tip:</strong> Use HTML: <code>&lt;h2&gt;Heading&lt;/h2&gt;</code> <code>&lt;p&gt;Paragraph&lt;/p&gt;</code> <code>&lt;ul&gt;&lt;li&gt;List&lt;/li&gt;&lt;/ul&gt;</code>
                  </small>
                </div>
              </div>

              {/* Arabic Content - Collapsible */}
              <details className="form-section" style={{ cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0' }}>
                <summary style={{ padding: '15px 20px', background: '#f8fafc', fontWeight: '600', borderRadius: '8px' }}>
                  <i className="fas fa-language"></i> Arabic Translation (Optional - Click to expand)
                </summary>
                <div style={{ padding: '20px' }}>
                  <div className="form-group">
                    <label>Title (Arabic)</label>
                    <input
                      type="text"
                      name="title_ar"
                      defaultValue={editingNews?.title_ar}
                      placeholder="عنوان المقال بالعربية..."
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Summary (Arabic)</label>
                    <textarea
                      name="excerpt_ar"
                      defaultValue={editingNews?.excerpt_ar}
                      placeholder="ملخص المقال..."
                      rows="2"
                      dir="rtl"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label>Full Article (Arabic)</label>
                    <textarea
                      name="content_ar"
                      defaultValue={editingNews?.content_ar}
                      placeholder="المحتوى الكامل للمقال..."
                      rows="8"
                      dir="rtl"
                    ></textarea>
                  </div>
                </div>
              </details>

              {/* Russian Content - Collapsible */}
              <details className="form-section" style={{ cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0' }}>
                <summary style={{ padding: '15px 20px', background: '#f8fafc', fontWeight: '600', borderRadius: '8px' }}>
                  <i className="fas fa-language"></i> Russian Translation (Optional - Click to expand)
                </summary>
                <div style={{ padding: '20px' }}>
                  <div className="form-group">
                    <label>Title (Russian)</label>
                    <input
                      type="text"
                      name="title_ru"
                      defaultValue={editingNews?.title_ru}
                      placeholder="Заголовок статьи..."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Summary (Russian)</label>
                    <textarea
                      name="excerpt_ru"
                      defaultValue={editingNews?.excerpt_ru}
                      placeholder="Краткое изложение статьи..."
                      rows="2"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label>Full Article (Russian)</label>
                    <textarea
                      name="content_ru"
                      defaultValue={editingNews?.content_ru}
                      placeholder="Полное содержание статьи..."
                      rows="8"
                    ></textarea>
                  </div>
                </div>
              </details>

              {/* Featured Image - Collapsible */}
              <details className="form-section" style={{ cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0' }}>
                <summary style={{ padding: '15px 20px', background: '#f8fafc', fontWeight: '600', borderRadius: '8px' }}>
                  <i className="fas fa-image"></i> Featured Image (Optional - Click to expand)
                </summary>
                <div style={{ padding: '20px' }}>
                  {editingNews?.featured_image && (
                    <div className="form-group">
                      <label>Current Image</label>
                      <div className="current-image-preview">
                        <img src={editingNews.featured_image} alt="Current featured" />
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Upload New Image</label>
                    <input
                      type="file"
                      name="featured_image_file"
                      accept="image/*"
                      className="file-input"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const preview = document.getElementById('news-image-preview');
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            preview.src = e.target.result;
                            preview.style.display = 'block';
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <div className="image-preview-container">
                    <img id="news-image-preview" className="image-preview" style={{ display: 'none' }} alt="Preview" />
                  </div>

                  <div className="form-group">
                    <label>Or paste image URL</label>
                    <input
                      type="text"
                      name="featured_image_url"
                      defaultValue={editingNews?.featured_image}
                      placeholder="/assets/images/blog/..."
                    />
                  </div>
                </div>
              </details>

              <div className="modal-footer" style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowNewsModal(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 30px' }}>
                  <i className="fas fa-save"></i>
                  {editingNews ? 'Save Changes' : 'Create Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Homepage Section Component
  const HomepageSection = () => {
    const [selectedProducts, setSelectedProducts] = useState([null, null, null, null, null, null]);
    const [saving, setSaving] = useState(false);

    // Fetch current featured products on mount
    useEffect(() => {
      const fetchFeaturedProducts = async () => {
        try {
          const response = await fetch('/api/homepage/featured-products');
          const result = await response.json();
          if (result.success && result.data) {
            setSelectedProducts(result.data);
          }
        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
      };
      fetchFeaturedProducts();
    }, []);

    const handleProductSelect = (index, productId) => {
      const newSelected = [...selectedProducts];
      newSelected[index] = productId;
      setSelectedProducts(newSelected);
    };

    const handleSaveFeaturedProducts = async () => {
      setSaving(true);
      try {
        const response = await fetch('/api/homepage/featured-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds: selectedProducts })
        });

        const result = await response.json();
        if (result.success) {
          alert('Featured products updated successfully!');
        } else {
          alert('Failed to update featured products: ' + (result.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error saving featured products:', error);
        alert('Failed to save featured products');
      } finally {
        setSaving(false);
      }
    };

    const getProductById = (id) => {
      return products.find(p => p.id === id);
    };

    return (
      <div className="cms-section">
        <div className="cms-header">
          <h2>
            <i className="fas fa-home"></i> Homepage Featured Products
          </h2>
          <button 
            className="btn btn-primary" 
            onClick={handleSaveFeaturedProducts}
            disabled={saving}
          >
            <i className="fas fa-save"></i> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ margin: 0, fontSize: '15px', color: '#475569' }}>
            <i className="fas fa-info-circle" style={{ color: '#3b82f6', marginRight: '8px' }}></i>
            Select 6 products to display in the "Popular Products" section on the homepage. 
            These products will be shown to all visitors when they first visit your website.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const selectedProduct = getProductById(selectedProducts[index]);
            return (
              <div key={index} style={{ 
                background: 'white', 
                border: '2px solid #e2e8f0', 
                borderRadius: '8px', 
                padding: '20px' 
              }}>
                <h4 style={{ marginBottom: '15px', color: '#1e293b' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '32px', 
                    height: '32px', 
                    background: '#10b981', 
                    color: 'white', 
                    borderRadius: '50%', 
                    textAlign: 'center', 
                    lineHeight: '32px', 
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </span>
                  Position {index + 1}
                </h4>

                <select
                  value={selectedProducts[index] || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const productId = value === '' ? null : value; // Keep UUID as string
                    handleProductSelect(index, productId);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '15px',
                    marginBottom: '15px'
                  }}
                >
                  <option value="">-- Select a product --</option>
                  {products.length === 0 ? (
                    <option value="" disabled>Loading products...</option>
                  ) : (
                    products
                      .filter(p => p.is_published)
                      .map(product => (
                        <option key={product.id} value={product.id}>
                          #{product.display_id} - {product.name_en}
                        </option>
                      ))
                  )}
                </select>

                {selectedProduct && (
                  <div style={{ 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '6px', 
                    padding: '15px',
                    background: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      {selectedProduct.main_image && (
                        <img 
                          src={selectedProduct.main_image} 
                          alt={selectedProduct.name_en}
                          style={{ 
                            width: '80px', 
                            height: '80px', 
                            objectFit: 'cover', 
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0'
                          }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                          {selectedProduct.name_en}
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>
                          {selectedProduct.category}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#fff', 
          borderRadius: '8px', 
          border: '2px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <button 
            className="btn btn-primary" 
            onClick={handleSaveFeaturedProducts}
            disabled={saving}
            style={{ fontSize: '16px', padding: '12px 40px' }}
          >
            <i className="fas fa-save"></i> {saving ? 'Saving Changes...' : 'Save Featured Products'}
          </button>
        </div>
      </div>
    );
  };

  // Image Replacer Section Component
  const ImageReplacerSection = () => {
    const websiteImages = [
      // Hero Section
      { 
        id: 'hero-1',
        name: 'Hero Slider - Image 1',
        path: '/assets/images/hero/hero_two-slider-1.jpg',
        currentPath: '/assets/images/hero/hero_two-slider-1.jpg',
        usage: 'Homepage - Hero section slider',
        category: 'Hero Section'
      },
      { 
        id: 'hero-2',
        name: 'Hero Slider - Image 2',
        path: '/assets/images/hero/hero_two-slider-2.jpg',
        currentPath: '/assets/images/hero/hero_two-slider-2.jpg',
        usage: 'Homepage - Hero section slider',
        category: 'Hero Section'
      },
      { 
        id: 'hero-3',
        name: 'Hero Slider - Image 3',
        path: '/assets/images/hero/hero_two-slider-3.jpg',
        currentPath: '/assets/images/hero/hero_two-slider-3.jpg',
        usage: 'Homepage - Hero section slider',
        category: 'Hero Section'
      },
      
      // Skills Section
      { 
        id: 'skill-4',
        name: 'Skills Background - Left',
        path: '/assets/images/skill/skill-4.png',
        currentPath: '/assets/images/skill/skill-4.png',
        usage: 'Homepage - Skills section background (left)',
        category: 'Skills Section'
      },
      { 
        id: 'skill-5',
        name: 'Skills Background - Right',
        path: '/assets/images/skill/skill-5.png',
        currentPath: '/assets/images/skill/skill-5.png',
        usage: 'Homepage - Skills section background (right)',
        category: 'Skills Section'
      },
      
      // About Section Images
      { 
        id: 'about-1',
        name: 'About - Image 1',
        path: '/assets/images/about/about-1.jpg',
        currentPath: '/assets/images/about/about-1.jpg',
        usage: 'About page - Gallery image',
        category: 'About Section'
      },
      { 
        id: 'about-3',
        name: 'About - Image 3',
        path: '/assets/images/about/about-3.jpg',
        currentPath: '/assets/images/about/about-3.jpg',
        usage: 'About page - Gallery image',
        category: 'About Section'
      },
      { 
        id: 'about-4',
        name: 'About - Image 4',
        path: '/assets/images/about/about-4.jpg',
        currentPath: '/assets/images/about/about-4.jpg',
        usage: 'About page - Gallery image',
        category: 'About Section'
      },
      { 
        id: 'about-5',
        name: 'About - Image 5',
        path: '/assets/images/about/about-5.jpg',
        currentPath: '/assets/images/about/about-5.jpg',
        usage: 'About page - Gallery image',
        category: 'About Section'
      },
      
      // Gallery Section
      { 
        id: 'gallery-cta-1',
        name: 'Gallery - CTA Image',
        path: '/assets/images/gallery/cta-1.jpg',
        currentPath: '/assets/images/gallery/cta-1.jpg',
        usage: 'Gallery section - Call to action',
        category: 'Gallery'
      },
      { 
        id: 'gallery-widget-1',
        name: 'Gallery - Widget Image 1',
        path: '/assets/images/gallery/thumb-widget-1.jpg',
        currentPath: '/assets/images/gallery/thumb-widget-1.jpg',
        usage: 'Gallery section - Widget thumbnail',
        category: 'Gallery'
      },
      { 
        id: 'gallery-widget-2',
        name: 'Gallery - Widget Image 2',
        path: '/assets/images/gallery/thumb-widget-2.png',
        currentPath: '/assets/images/gallery/thumb-widget-2.png',
        usage: 'Gallery section - Widget thumbnail',
        category: 'Gallery'
      },
      { 
        id: 'gallery-widget-3',
        name: 'Gallery - Widget Image 3',
        path: '/assets/images/gallery/thumb-widget-3.png',
        currentPath: '/assets/images/gallery/thumb-widget-3.png',
        usage: 'Gallery section - Widget thumbnail',
        category: 'Gallery'
      },
      { 
        id: 'gallery-widget-4',
        name: 'Gallery - Widget Image 4',
        path: '/assets/images/gallery/thumb-widget-4.png',
        currentPath: '/assets/images/gallery/thumb-widget-4.png',
        usage: 'Gallery section - Widget thumbnail',
        category: 'Gallery'
      },
      { 
        id: 'gallery-widget-5',
        name: 'Gallery - Widget Image 5',
        path: '/assets/images/gallery/thumb-widget-5.png',
        currentPath: '/assets/images/gallery/thumb-widget-5.png',
        usage: 'Gallery section - Widget thumbnail',
        category: 'Gallery'
      },
      { 
        id: 'gallery-widget-6',
        name: 'Gallery - Widget Image 6',
        path: '/assets/images/gallery/thumb-widget-6.png',
        currentPath: '/assets/images/gallery/thumb-widget-6.png',
        usage: 'Gallery section - Widget thumbnail',
        category: 'Gallery'
      },
      
      // Background Images
      { 
        id: 'bg-about',
        name: 'Background - About Section',
        path: '/assets/images/bg/about-bg-1.jpg',
        currentPath: '/assets/images/bg/about-bg-1.jpg',
        usage: 'About page background',
        category: 'Backgrounds'
      },
      { 
        id: 'bg-page',
        name: 'Background - Page Header',
        path: '/assets/images/bg/page-bg-1.jpg',
        currentPath: '/assets/images/bg/page-bg-1.jpg',
        usage: 'Page header background',
        category: 'Backgrounds'
      },
      { 
        id: 'bg-features',
        name: 'Background - Features Section',
        path: '/assets/images/bg/features-bg-1.jpg',
        currentPath: '/assets/images/bg/features-bg-1.jpg',
        usage: 'Features section background',
        category: 'Backgrounds'
      }
    ];

    const handleReplaceClick = (imageId) => {
      setSelectedImage(imageId);
      // Trigger file input
      const fileInput = document.getElementById(`file-${imageId}`);
      if (fileInput) {
        fileInput.click();
      }
    };

    const handleFileChange = async (e, imageId) => {
      const file = e.target.files[0];
      if (!file) return;

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setReplacePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Confirm replacement
      const confirmed = confirm(
        `Replace "${websiteImages.find(img => img.id === imageId)?.name}"?\n\n` +
        'After replacing, you must restart the server to see changes.'
      );

      if (!confirmed) {
        e.target.value = '';
        setReplacePreview('');
        return;
      }

      setUploading(true);
      setSelectedImage(imageId);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetImage', imageId);

        const response = await fetch('/api/replace-website-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        alert('✅ Image replaced successfully!\n\n' + 
              'IMPORTANT: You must restart the dev server:\n' +
              '1. Press Ctrl+C in terminal\n' +
              '2. Run: npm run dev\n' +
              '3. Open website in incognito window\n\n' +
              'Then you will see the new image!');
        
        setReplacePreview('');
        setSelectedImage('');
        e.target.value = '';
        
      } catch (error) {
        console.error('Replace error:', error);
        alert(`Failed to replace image: ${error.message}`);
        e.target.value = '';
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="cms-section">
        <div className="cms-header">
          <h2>
            <i className="fas fa-exchange-alt"></i> Replace Website Images
          </h2>
          <p style={{ margin: '10px 0', color: '#666', fontSize: '14px' }}>
            Click the "Replace" button on any image to upload a new one
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn-sm ${imageCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setImageCategory('all')}
          >
            All Images ({websiteImages.length})
          </button>
          {['Hero Section', 'Skills Section', 'About Section', 'Gallery', 'Backgrounds'].map((cat) => {
            const count = websiteImages.filter(img => img.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${imageCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setImageCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Image Cards Grid */}
        <div className="image-cards-grid">
          {websiteImages.filter(img => imageCategory === 'all' || img.category === imageCategory).map((img) => (
            <div key={img.id} className={`image-card ${uploading && selectedImage === img.id ? 'uploading' : ''}`}>
              <div className="image-card-preview">
                <img src={img.currentPath} alt={img.name} />
                <div className="image-card-overlay">
                  <span className="image-card-category">{img.category}</span>
                </div>
              </div>
              <div className="image-card-body">
                <h4 className="image-card-title">{img.name}</h4>
                <p className="image-card-usage">{img.usage}</p>
                <small className="image-card-path">{img.path}</small>
              </div>
              <div className="image-card-footer">
                <input
                  type="file"
                  id={`file-${img.id}`}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, img.id)}
                  style={{ display: 'none' }}
                />
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handleReplaceClick(img.id)}
                  disabled={uploading}
                >
                  {uploading && selectedImage === img.id ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Uploading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-exchange-alt"></i> Replace
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {websiteImages.filter(img => imageCategory === 'all' || img.category === imageCategory).length === 0 && (
          <div className="empty-state">
            <i className="fas fa-images"></i>
            <h3>No Images Found</h3>
            <p>No images in this category</p>
          </div>
        )}
      </div>
    );
  };

  const getFilteredMedia = () => {
    if (selectedFolder === 'all') return media;
    return media.filter(m => m.folder === selectedFolder);
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', selectedFolder === 'all' ? 'general' : selectedFolder);

      try {
        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          await fetchMedia();
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchProducts();
        alert('Product deleted successfully');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchNews();
        alert('Article deleted successfully');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete article');
    }
  };

  const handleDeleteMedia = async (id) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [id] })
      });

      if (response.ok) {
        await fetchMedia();
        alert('File deleted successfully');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    }
  };

  const handleReplaceMedia = async (mediaItem) => {
    setEditingMedia(mediaItem);
    setShowReplaceModal(true);
  };

  const handleReplaceMediaSubmit = async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('replace-media-file');
    const file = fileInput?.files[0];
    
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mediaId', editingMedia.id);
      formData.append('oldPath', editingMedia.file_path);
      formData.append('folder', editingMedia.folder);

      const response = await fetch('/api/media/replace', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      alert('Photo replaced successfully! Refreshing to show new image...');
      setShowReplaceModal(false);
      setEditingMedia(null);
      // Wait a moment then refresh to ensure file is written
      setTimeout(() => {
        fetchMedia();
      }, 500);
    } catch (error) {
      console.error('Replace error:', error);
      alert(`Failed to replace photo: ${error.message}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'products');

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload response error:', errorText);
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data.public_url;
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert(`Image upload failed: ${error.message}\n\nPlease make sure Supabase storage buckets are created.\nSee STORAGE_SETUP.md for instructions.`);
      return null;
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Handle main image upload
    let mainImageUrl = formData.get('main_image_url') || editingProduct?.main_image;
    const imageFile = formData.get('main_image_file');
    
    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await handleImageUpload(imageFile);
      if (uploadedUrl) {
        mainImageUrl = uploadedUrl;
      } else {
        alert('Failed to upload main image. Please try again.');
        return;
      }
    }

    // Handle gallery images upload (other packaging types)
    const galleryUploads = [];
    const packagingTypes = [
      { id: 'gallery-cans', type: 'cans', label: 'Cans' },
      { id: 'gallery-vacuum', type: 'vacuum', label: 'Vacuum' },
      { id: 'gallery-buckets', type: 'buckets', label: 'Buckets' },
      { id: 'gallery-barrels', type: 'barrels', label: 'Barrels' },
      { id: 'gallery-pet-packs', type: 'pet-packs', label: 'PET Packs' }
    ];

    for (const pkg of packagingTypes) {
      const fileInput = document.getElementById(pkg.id);
      if (fileInput && fileInput.files[0]) {
        const uploadedUrl = await handleImageUpload(fileInput.files[0]);
        if (uploadedUrl) {
          galleryUploads.push({
            url: uploadedUrl,
            type: pkg.type,
            label: pkg.label
          });
        }
      }
    }

    const productData = {
      slug: formData.get('slug'),
      name_en: formData.get('name_en'),
      name_ar: formData.get('name_ar'),
      name_ru: formData.get('name_ru'),
      description_en: formData.get('description_en'),
      description_ar: formData.get('description_ar'),
      description_ru: formData.get('description_ru'),
      category: formData.get('category'),
      main_image: mainImageUrl,
      gallery_images: galleryUploads,
      is_published: formData.get('is_published') === 'on',
      is_featured: formData.get('is_featured') === 'on',
    };

    console.log('📦 Product data being sent:', productData);
    console.log('  Slug:', productData.slug);
    console.log('  Name (EN):', productData.name_en);
    console.log('  Category:', productData.category);
    console.log('  Main Image:', productData.main_image);
    console.log('  Gallery Images:', productData.gallery_images.length, 'items');

    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}`
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (result.success) {
        await fetchProducts();
        setShowProductModal(false);
        setEditingProduct(null);
        // Clear file inputs
        packagingTypes.forEach(pkg => {
          const fileInput = document.getElementById(pkg.id);
          if (fileInput) fileInput.value = '';
        });
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        console.error('❌ Product save failed:', result);
        console.error('Error details:', result.error);
        
        let errorMessage = result.error || 'Failed to save product';
        
        // Make slug error more helpful
        if (errorMessage.includes('Slug already exists')) {
          errorMessage = 'Slug already exists!\n\nThe slug "' + productData.slug + '" is already used by another product.\nPlease choose a different slug (e.g., "' + productData.slug + '-2" or "premium-' + productData.slug + '")';
        }
        
        alert('❌ Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      console.error('Error details:', error.message);
      alert('Failed to save product: ' + error.message);
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let featuredImageUrl = formData.get('featured_image_url') || editingNews?.featured_image;
    const imageFile = formData.get('featured_image_file');

    if (imageFile && imageFile.size > 0) {
      const uploadedUrl = await handleImageUpload(imageFile);
      if (uploadedUrl) {
        featuredImageUrl = uploadedUrl;
      } else {
        alert('Failed to upload featured image. Please try again.');
        return;
      }
    }

    const newsData = {
      slug: formData.get('slug'),
      title_en: formData.get('title_en'),
      title_ar: formData.get('title_ar'),
      title_ru: formData.get('title_ru'),
      content_en: formData.get('content_en'),
      content_ar: formData.get('content_ar'),
      content_ru: formData.get('content_ru'),
      excerpt_en: formData.get('excerpt_en'),
      excerpt_ar: formData.get('excerpt_ar'),
      excerpt_ru: formData.get('excerpt_ru'),
      category: formData.get('category'),
      featured_image: featuredImageUrl,
      author_name: formData.get('author_name'),
      is_published: formData.get('is_published') === 'on',
      published_at: formData.get('published_at') || new Date().toISOString(),
    };

    console.log('📰 News data being sent:', newsData);

    try {
      const url = editingNews 
        ? `/api/news/${editingNews.id}`
        : '/api/news';
      
      const method = editingNews ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });

      const result = await response.json();

      if (result.success) {
        await fetchNews();
        setShowNewsModal(false);
        setEditingNews(null);
        alert(editingNews ? 'Article updated successfully!' : 'Article created successfully!');
      } else {
        console.error('❌ News save failed:', result);
        alert('Error: ' + (result.error || 'Failed to save article'));
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save article: ' + error.message);
    }
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Authenticating...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Website Editor - Belloo CMS</title>
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/fonts/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/admin-modern.css" />
        <link rel="stylesheet" href="/assets/css/cms-editor.css" />
      </Head>

      <div className="admin-body">
        <div className="admin-container">
          {/* Header */}
          <div className="admin-header">
            <div className="admin-header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img 
                  src="/assets/images/logo/logo.svg" 
                  alt="Belloo Logo" 
                  style={{ 
                    height: '50px', 
                    width: 'auto',
                    filter: 'brightness(0) invert(1)',
                    opacity: '0.95'
                  }}
                />
                <h1 className="admin-title" style={{ margin: 0 }}>
                  Website Editor
                </h1>
              </div>
              <div className="admin-user-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '500'
                }}>
                  <i className="fas fa-user-circle" style={{ fontSize: '18px' }}></i>
                  <span>{user?.full_name || user?.username}</span>
                </div>
                <button 
                  className="btn btn-sm" 
                  onClick={() => router.push('/admin')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '8px 16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="fas fa-arrow-left"></i> Back to Admin
                </button>
                <button 
                  className="btn btn-sm btn-danger" 
                  onClick={handleLogout}
                  style={{
                    padding: '8px 16px',
                    fontWeight: '500'
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="admin-tabs">
            <ul className="admin-tab-list">
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeSection === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveSection('products')}
                >
                  <i className="fas fa-box"></i>
                  <span>Products</span>
                  <span className="admin-tab-counter">{products.length}</span>
                </button>
              </li>
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeSection === 'news' ? 'active' : ''}`}
                  onClick={() => setActiveSection('news')}
                >
                  <i className="fas fa-newspaper"></i>
                  <span>News & Blog</span>
                  <span className="admin-tab-counter">{news.length}</span>
                </button>
              </li>
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeSection === 'homepage' ? 'active' : ''}`}
                  onClick={() => setActiveSection('homepage')}
                >
                  <i className="fas fa-home"></i>
                  <span>Homepage</span>
                </button>
              </li>
              <li className="admin-tab-item">
                <button 
                  className={`admin-tab-button ${activeSection === 'replace-images' ? 'active' : ''}`}
                  onClick={() => setActiveSection('replace-images')}
                >
                  <i className="fas fa-exchange-alt"></i>
                  <span>Replace Images</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Content */}
          {loading ? (
            <div className="admin-loading">
              <div className="admin-loading-spinner"></div>
              <div className="admin-loading-text">Loading...</div>
            </div>
          ) : (
            <div className="admin-content">
              {activeSection === 'products' && <ProductsSection />}
              {activeSection === 'news' && <NewsSection />}
              {activeSection === 'homepage' && <HomepageSection />}
              {activeSection === 'replace-images' && <ImageReplacerSection />}
            </div>
          )}
        </div>
      </div>

      {/* Replace Media Modal */}
      {showReplaceModal && editingMedia && (
        <div className="modal-overlay" onClick={() => setShowReplaceModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-image"></i> Replace Image
              </h2>
              <button className="modal-close" onClick={() => setShowReplaceModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleReplaceMediaSubmit}>
              <div className="modal-body">
                <div className="form-section">
                  <h3>Current Image</h3>
                  <div className="current-image-preview">
                    <img src={editingMedia.public_url} alt={editingMedia.file_name} />
                  </div>
                  <div className="media-info-display">
                    <p><strong>File Name:</strong> {editingMedia.file_name}</p>
                    <p><strong>Category:</strong> {editingMedia.folder}</p>
                    {editingMedia.alt_text && <p><strong>Alt Text:</strong> {editingMedia.alt_text}</p>}
                    {editingMedia.caption && <p><strong>Usage:</strong> {editingMedia.caption}</p>}
                    <p><strong>Size:</strong> {editingMedia.file_size ? `${(editingMedia.file_size / 1024).toFixed(1)} KB` : 'N/A'}</p>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Upload New Image</h3>
                  <div className="form-group">
                    <label>Select New Image from Device</label>
                    <input
                      type="file"
                      id="replace-media-file"
                      accept="image/*"
                      className="file-input"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const preview = document.getElementById('replace-preview');
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            preview.src = e.target.result;
                            preview.style.display = 'block';
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <small>The new image will replace the old one. Website will automatically use the new image.</small>
                  </div>
                  <div className="image-preview-container">
                    <img id="replace-preview" className="image-preview" style={{ display: 'none' }} alt="Preview" />
                  </div>
                  {editingMedia.is_static && (
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle"></i> This is a website asset. The new image will be uploaded to storage and the website will use it instead of the static file.
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowReplaceModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-upload"></i> Replace Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

