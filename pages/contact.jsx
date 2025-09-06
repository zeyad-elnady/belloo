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
                {/*=== Map Box ===*/}
                <div className="map-box wow fadeInLeft mb-50">
                  <iframe src="https://maps.google.com/maps?q=10th+of+Ramadan+City,+Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed" />
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
      <section className="info-section pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6">
              {/*====== Single Info Item ======*/}
              <div className="single-info-item style-one mb-40 wow fadeInUp" data-wow-delay="0.1s">
                <div className="shape shape-one">
                  <span>
                    <img
                      src="/assets/images/shape/info-shape-1.png"
                      alt="shape"
                    />
                  </span>
                </div>
                <div className="info">
                  <span>{t('common.contactUs')}</span>
                  <h4 className="title">
                    {t('contactPage.description')}
                  </h4>
                  <Link legacyBehavior href="/contact">
                    <a className="main-btn golden-btn">{t('common.getQuote')}</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              {/*====== Single Info Item ======*/}
              <div className="single-info-item style-two mb-40 wow fadeInDown" data-wow-delay="0.2s">
                <div className="shape shape-one">
                  <span>
                    <img
                      src="/assets/images/shape/info-shape-1.png"
                      alt="shape"
                    />
                  </span>
                </div>
                <div className="info">
                  <span>{t('common.contactUs')}</span>
                  <h4 className="title">
                    {t('footer.whatsappDescription')}
                  </h4>
                  <a
                    href="https://wa.me/201101511185?text=Hello%20Bello%20Food%2C%20I%20would%20like%20to%20inquire%20about%20your%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="main-btn golden-btn"
                  >
                    <i className="fab fa-whatsapp" style={{marginRight: '8px'}}></i>
                    {t('footer.whatsappButton')}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              {/*====== Single Info Item ======*/}
              <div className="single-info-item style-three mb-40 wow fadeInUp" data-wow-delay="0.3s">
                <div className="shape shape-one">
                  <span>
                    <img
                      src="/assets/images/shape/info-shape-2.png"
                      alt="shape"
                    />
                  </span>
                </div>
                <div className="info">
                  <span>{t('joinUsPage.subtitle')}</span>
                  <h4 className="title">
                    Join our team! We're looking for passionate individuals to grow with us.
                  </h4>
                  <Link legacyBehavior href="/join-us">
                    <a className="main-btn primary-btn">{t('joinUsPage.cta.applyNow')}</a>
                  </Link>
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
