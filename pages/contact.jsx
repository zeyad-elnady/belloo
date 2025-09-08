import PageBanner from "@/src/components/PageBanner";

import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

const Contact = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('contactPage.pageTitle')} />

      {/*====== Start Contact Info section ======*/}
      <section className="contact-info-section pt-100 pb-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('contactPage.info.subtitle')}
                </span>
                <h2>{t('contactPage.info.title')}</h2>
                <p className="section-description">
                  {t('contactPage.description') || 'We\'re here to help you. Contact us for prices and premium Mediterranean products'}
                </p>
              </div>
            </div>
          </div>
          <div className="contact-info-wrapper wow fadeInUp" data-wow-delay="0.2s">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 mb-40">
                {/*====== Contact Info Item ======*/}
                <div className="contact-info-item-professional text-center wow fadeInUp" data-wow-delay="0.1s">
                  <div className="icon-wrapper">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="info">
                    <h4 className="title">{t('contactPage.info.address')}</h4>
                    <p className="address">{t('footer.address')}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-40">
                {/*====== Contact Info Item ======*/}
                <div className="contact-info-item-professional text-center wow fadeInUp" data-wow-delay="0.2s">
                  <div className="icon-wrapper">
                    <div className="icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                  <div className="info">
                    <h4 className="title">{t('contactPage.info.email')}</h4>
                    <p className="email">
                      <a href="mailto:marketing@bello-food.com">{t('footer.email')}</a>
                    </p>
                    <p className="email">
                      <a href="mailto:info@bello-food.com">info@bello-food.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-40">
                {/*====== Contact Info Item ======*/}
                <div className="contact-info-item-professional text-center wow fadeInUp" data-wow-delay="0.3s">
                  <div className="icon-wrapper">
                    <div className="icon">
                      <i className="fas fa-phone"></i>
                    </div>
                  </div>
                  <div className="info">
                    <h4 className="title">{t('contactPage.info.phone')}</h4>
                    <p className="phone">
                      <a href="tel:+201101511185">{t('footer.phoneNumber')}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Info section ======*/}
      {/*====== Start Contact section ======*/}
      <section className="contact-section pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              {/*====== Section-title ======*/}
              <div className="section-title wow fadeInRight mb-50">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('contactPage.subtitle')}
                </span>
                <h2>{t('contactPage.title')}</h2>
              </div>
            </div>
          </div>
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-6">
                {/*=== Video Map Box ===*/}
                <div className="video-map-box wow fadeInLeft mb-50">
                  <div 
                    className="video-container"
                    onClick={() => {
                      // Open Google Maps in new tab
                      window.open('https://maps.google.com/maps?q=10th+of+Ramadan+City,+Egypt&t=&z=13', '_blank', 'noopener,noreferrer');
                    }}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      background: '#f8f9fa'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    >
                      <source src="/assets/video/world map.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Overlay with click instruction */}
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        color: 'white',
                        padding: '20px',
                        textAlign: 'center'
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
                        Click to view on Google Maps
                      </p>
                    </div>
                    
                    {/* Click indicator icon */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        color: '#4d602c',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                      }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                {/*====== Contact Form Wrapper ======*/}
                <div className="contact-form-wrapper mb-50 wow fadeInRight">
                  <form
                    onSubmit={async (e) => {
                      console.log('Contact form submission started');
                      e.preventDefault();
                      
                      try {
                        const formData = new FormData(e.target);
                        
                        // Validate required fields
                        const name = formData.get('name');
                        const email = formData.get('email');
                        const phone = formData.get('phone');
                        const subject = formData.get('subject');
                        const message = formData.get('message');
                        
                        if (!name || !email || !phone || !subject || !message) {
                          alert('Please fill in all required fields.');
                          return;
                        }
                        
                        // Prepare data for Google Sheets
                        const submissionData = {
                          name: name.trim(),
                          email: email.trim(),
                          phone: phone.trim(),
                          subject: subject.trim(),
                          message: message.trim(),
                          submissionDate: new Date().toLocaleString(),
                          timestamp: new Date().toISOString()
                        };
                        
                        // Show loading state
                        const submitButton = e.target.querySelector('button[type="submit"]');
                        if (submitButton) {
                          const originalText = submitButton.innerHTML;
                          submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                          submitButton.disabled = true;
                          
                          try {
                            console.log('Submitting contact message...');
                            
                            const response = await fetch('https://script.google.com/macros/s/AKfycbzU0_lALt_WwPx7QH8nRlE7OI84rxuvBfFtLzlyjwjV5uTWKw0cBfR3nkrzdAYYuOjQDw/exec', {
                              method: 'POST',
                              mode: 'no-cors',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(submissionData)
                            });
                            
                            console.log('Contact message sent successfully');
                            alert('✅ Thank you! Your message has been sent successfully. We will get back to you soon.');
                            e.target.reset();
                            
                          } catch (error) {
                            console.error('Contact submission error:', error);
                            alert('Your message may have been sent. If you don\'t receive a confirmation, please contact us directly.');
                          } finally {
                            // Restore button state
                            submitButton.innerHTML = originalText;
                            submitButton.disabled = false;
                          }
                        }
                      } catch (error) {
                        console.error('Contact form error:', error);
                        alert('There was an error processing your message. Please try again.');
                      }
                    }}
                    className="contact-form"
                  >
                    <div className="form_group">
                      <label>
                        <i className="far fa-user" />
                      </label>
                      <input
                        type="text"
                        className="form_control"
                        placeholder={t('contactPage.form.name')}
                        name="name"
                        required
                      />
                    </div>
                    <div className="form_group">
                      <label>
                        <i className="far fa-envelope" />
                      </label>
                      <input
                        type="email"
                        className="form_control"
                        placeholder={t('contactPage.form.email')}
                        name="email"
                        required
                      />
                    </div>
                    <div className="form_group">
                      <label>
                        <i className="far fa-phone-plus" />
                      </label>
                      <input
                        type="text"
                        className="form_control"
                        placeholder={t('contactPage.form.phone')}
                        name="phone"
                        required
                      />
                    </div>
                    <div className="form_group">
                      <label>
                        <i className="far fa-map-marker-exclamation" />
                      </label>
                      <input
                        type="text"
                        className="form_control"
                        placeholder={t('contactPage.form.subject')}
                        name="subject"
                        required
                      />
                    </div>
                    <div className="form_group">
                      <label>
                        <i className="far fa-pen-fancy" />
                      </label>
                      <textarea
                        className="form_control"
                        rows={3}
                        placeholder={t('contactPage.form.message')}
                        name="message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form_group">
                      <button type="submit" className="main-btn primary-btn">
                        {t('contactPage.form.submit')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact section ======*/}
      {/*====== Start Info Section ======*/}
      <section className="info-section py-80" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-xl-4 col-md-6">
              {/*====== Modern Contact Card ======*/}
              <div 
                className="modern-info-card contact-card wow fadeInUp" 
                data-wow-delay="0.1s"
                style={{
                  background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                  borderRadius: '24px',
                  padding: '45px 35px',
                  boxShadow: '0 20px 60px rgba(77, 96, 44, 0.15)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(77, 96, 44, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(77, 96, 44, 0.15)';
                }}
              >
                {/* Animated Background Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-100px',
                  right: '-100px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'float 6s ease-in-out infinite',
                  zIndex: 1
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '-50px',
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                  zIndex: 1
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <i className="fas fa-envelope" style={{ fontSize: '28px', color: '#ffffff' }}></i>
                    </div>
                    <span style={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: '13px', 
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px'
                    }}>{t('common.contactUs')}</span>
                </div>
                  
                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '22px', 
                    fontWeight: '700',
                    lineHeight: '1.3',
                    marginBottom: 'auto',
                    fontFamily: '"Montserrat", sans-serif'
                  }}>
                    At Bello Food, we're always excited to connect with partners, clients, and customers worldwide. Whether you're interested in our products, private label solutions, or tailored packaging, our team is here to assist you.
                  </h4>
                  
                  <div style={{ marginTop: '30px' }}>
                    <Link href="/contact" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.95)',
                      color: '#4d602c',
                      padding: '14px 28px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      minWidth: '140px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    >
                      {t('common.getQuote') || 'Get A Quote'}
                      <i className="fas fa-arrow-right" style={{ marginLeft: '10px', fontSize: '12px' }}></i>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6">
              {/*====== Modern WhatsApp Card ======*/}
              <div 
                className="modern-info-card whatsapp-card wow fadeInDown" 
                data-wow-delay="0.2s"
                style={{
                  background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                  borderRadius: '24px',
                  padding: '45px 35px',
                  boxShadow: '0 20px 60px rgba(77, 96, 44, 0.15)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(77, 96, 44, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(77, 96, 44, 0.15)';
                }}
              >
                {/* Animated Background Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-80px',
                  left: '-80px',
                  width: '160px',
                  height: '160px',
                  background: 'radial-gradient(circle, rgba(37, 211, 102, 0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'float 4s ease-in-out infinite reverse',
                  zIndex: 1
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'rgba(37, 211, 102, 0.2)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(37, 211, 102, 0.3)'
                    }}>
                      <i className="fab fa-whatsapp" style={{ fontSize: '32px', color: '#25d366' }}></i>
                    </div>
                    <span style={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: '13px', 
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px'
                    }}>{t('common.contactUs')}</span>
                </div>
                  
                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '22px', 
                    fontWeight: '700',
                    lineHeight: '1.3',
                    marginBottom: 'auto',
                    fontFamily: '"Montserrat", sans-serif'
                  }}>
                    Connect with us directly on WhatsApp for quick support and inquiries.
                  </h4>
                  
                  <div style={{ marginTop: '30px' }}>
                    <a
                      href="https://wa.me/201101511185?text=Hello%20Bello%20Food%2C%20I%20would%20like%20to%20inquire%20about%20your%20products"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #25d366 0%, #20c55a 100%)',
                        color: '#ffffff',
                        padding: '14px 28px',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #20c55a 0%, #1ea952 100%)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(37, 211, 102, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #25d366 0%, #20c55a 100%)';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.3)';
                      }}
                    >
                      <i className="fab fa-whatsapp" style={{ marginRight: '10px', fontSize: '16px' }}></i>
                      {t('footer.whatsappButton') || 'Chat On WhatsApp'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-4 col-md-6">
              {/*====== Modern Career Card ======*/}
              <div 
                className="modern-info-card career-card wow fadeInUp" 
                data-wow-delay="0.3s"
                style={{
                  background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                  borderRadius: '24px',
                  padding: '45px 35px',
                  boxShadow: '0 20px 60px rgba(77, 96, 44, 0.15)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(77, 96, 44, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(77, 96, 44, 0.15)';
                }}
              >
                {/* Animated Background Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-80px',
                  right: '-80px',
                  width: '160px',
                  height: '160px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'float 5s ease-in-out infinite',
                  zIndex: 1
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '-50px',
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                  zIndex: 1
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <i className="fas fa-users" style={{ fontSize: '28px', color: '#ffffff' }}></i>
                    </div>
                    <span style={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: '13px', 
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px'
                    }}>Career Opportunities</span>
                </div>
                  
                  <h4 style={{ 
                    color: '#ffffff', 
                    fontSize: '22px', 
                    fontWeight: '700',
                    lineHeight: '1.3',
                    marginBottom: 'auto',
                    fontFamily: '"Montserrat", sans-serif'
                  }}>
                    Join our team! We're looking for passionate individuals to grow with us.
                  </h4>
                  
                  <div style={{ marginTop: '30px' }}>
                    <Link href="/join-us" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.95)',
                      color: '#4d602c',
                      padding: '14px 28px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      minWidth: '140px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    >
                      {t('joinUsPage.cta.applyNow') || 'Apply Now'}
                      <i className="fas fa-arrow-right" style={{ marginLeft: '10px', fontSize: '12px' }}></i>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Info Section ======*/}

    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Contact;
