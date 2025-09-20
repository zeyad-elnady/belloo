import PageBanner from "@/src/components/PageBanner";

import Layout from "@/src/layouts/Layout";
import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const About = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  // Get the appropriate video based on locale
  const getVideoSource = () => {
    if (router.locale === 'ar') {
      return "/assets/video/world map arabic.mp4";
    }
    return "/assets/video/world map.mp4"; // Default for English and Russian
  };
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('aboutPage.pageTitle')} />
      <section className="about-section pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {/*====== Section-title ======*/}
              <div className="section-title mb-50 wow fadeInLeft">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('aboutPage.subtitle')}
                </span>
                <h2>{t('aboutPage.title')}</h2>
              </div>
            </div>
            <div className="col-lg-6">
              {/*====== About Content Box ======*/}
              <div className="about-content-box mb-50 wow fadeInRight">
                <p className="mb-30">
                  {t('aboutPage.description')}
                </p>
                <ul className="check-style-one mb-40">
                  {t('aboutPage.checkList', { returnObjects: true }).map((item, index) => (
                    <li key={index}>
                      <i className="far fa-check" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-6">
              {/*====== About Image Item ======*/}
              <div className="about-img-item mb-30 wow fadeInUp">
                <img src="/assets/images/about/about-3.jpg" alt="About Image" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              {/*====== About Image Item ======*/}
              <div className="about-img-item mb-30 wow fadeInDown">
                <img src="/assets/images/about/about-4.jpg" alt="About Image" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              {/*====== About Image Item ======*/}
              <div className="about-img-item mb-30 wow fadeInUp">
                <img src="/assets/images/about/about-5.jpg" alt="About Image" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/*====== About Wrapper ======*/}
              <div className="about-wrapper-two gray-bg mt-minus-110 p-r wow fadeInDown">
                <div className="row no-gutters justify-content-center">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    {/*====== About features Item ======*/}
                    <div className="about-features-item text-center">
                      <div
                        className="hover-bg bg_cover"
                        style={{
                          backgroundImage:
                            "url(/assets/images/about/hover-bg.jpg)",
                        }}
                      />
                      <div className="icon">
                        <i className="flaticon-target" />
                      </div>
                      <div className="text">
                        <h3 className="title">{t('aboutPage.mission.title')}</h3>
                        <p>
                          {t('aboutPage.mission.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    {/*====== About features Item ======*/}
                    <div className="about-features-item item-active text-center">
                      <div
                        className="hover-bg bg_cover"
                        style={{
                          backgroundImage:
                            "url(/assets/images/about/hover-bg.jpg)",
                        }}
                      />
                      <div className="icon">
                        <i className="flaticon-vision" />
                      </div>
                      <div className="text">
                        <h3 className="title">{t('aboutPage.whyBello.title')}</h3>
                        <p>
                          {t('aboutPage.whyBello.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    {/*====== About features Item ======*/}
                    <div className="about-features-item text-center">
                      <div
                        className="hover-bg bg_cover"
                        style={{
                          backgroundImage:
                            "url(/assets/images/about/hover-bg.jpg)",
                        }}
                      />
                      <div className="icon">
                        <i className="flaticon-management" />
                      </div>
                      <div className="text">
                        <h3 className="title">{t('aboutPage.promise.title')}</h3>
                        <p>
                          {t('aboutPage.promise.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About Section ======*/}
      {/*====== Start Features Section ======*/}
      <section className="features-section p-r z-1" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="features-wrapper" style={{ minHeight: '700px', display: 'flex', alignItems: 'stretch' }}>
          <div
            className="features-bg bg_cover"
            style={{
              backgroundImage: "url(/assets/images/bg/features-bg-1.jpg)",
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="features-bgc-content-box main-bg text-white wow fadeInRight" 
            style={{
              marginLeft: 'auto',
              width: '55%',
              minHeight: '700px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
              padding: '80px 60px'
            }}
          >
            <div className="features-content-box" style={{ width: '100%' }}>
              {/*====== Section-title ======*/}
              <div className="section-title mb-50 wow fadeInUp">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('aboutPage.features.subtitle')}
                </span>
                <h2>{t('aboutPage.features.title')}</h2>
              </div>
              <p className="mb-40">
                {t('aboutPage.features.description')}
              </p>
              <div className="single-features-item mb-30 wow fadeInDown">
                <div className="icon">
                  <img src="/assets/images/icon/jar icon.svg" alt="Premium Quality Products" />
                  <span className="shape-circle" />
                </div>
                <div className="text">
                  <h5 className="title">{t('aboutPage.features.qualityProducts.title')}</h5>
                  <p>
                    {t('aboutPage.features.qualityProducts.description')}
                  </p>
                </div>
              </div>
              <div className="single-features-item mb-30 wow fadeInUp">
                <div className="icon">
                  <img src="/assets/images/icon/001-05.png" alt="Global Export Excellence" />
                  <span className="shape-circle" />
                </div>
                <div className="text">
                  <h5 className="title">{t('aboutPage.features.globalExport.title')}</h5>
                  <p>
                    {t('aboutPage.features.globalExport.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @media (max-width: 1200px) {
            .features-bgc-content-box {
              padding: 60px 40px !important;
            }
          }
          
          @media (max-width: 991px) {
            .features-wrapper {
              flex-direction: column !important;
              min-height: auto !important;
            }
            
            .features-bg {
              position: relative !important;
              width: 100% !important;
              height: 350px !important;
            }
            
            .features-bgc-content-box {
              width: 100% !important;
              margin-left: 0 !important;
              min-height: auto !important;
              padding: 60px 40px !important;
            }
          }
          
          @media (max-width: 768px) {
            .features-bg {
              height: 300px !important;
            }
            
            .features-bgc-content-box {
              padding: 40px 30px !important;
            }
            
            .section-title h2 {
              font-size: 28px !important;
            }
            
            .single-features-item {
              margin-bottom: 25px !important;
            }
          }
          
          @media (max-width: 480px) {
            .features-bgc-content-box {
              padding: 30px 20px !important;
            }
          }
        `}</style>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start CTA Section  ======*/}
      <section
        className="cta-bg-section bg_cover pt-100 p-r z-1"
        style={{ backgroundImage: "url(/assets/images/bg/cta-bg-1.jpg)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              {/*======  CTA Content Box  ======*/}
              <div className="cta-content-box text-white mb-50 wow fadeInLeft">
                <div className="section-title mb-20">
                  <span className="sub-title">
                    <i className="flaticon-plant" />
                    {t('aboutPage.cta.subtitle')}
                  </span>
                  <h2>{t('aboutPage.cta.title')}</h2>
                </div>
                <p className="mb-30">
                  {t('aboutPage.cta.description')}
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              {/*======  CTA Image Box  ======*/}
              <div className="cta-image-box mb-50 wow fadeInRight">
                <img src="/assets/images/gallery/cta-1.jpg" alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End CTA Section  ======*/}
      {/*====== Start Testimonial Section  ======*/}
      <section className="testimonial-section pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-12">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('aboutPage.testimonialSection.subtitle')}
                </span>
                <h2>{t('aboutPage.testimonialSection.title')}</h2>
              </div>
            </div>
          </div>
          {/*====== Testimonial Slider  ======*/}
          <Slider
            {...sliderProps.testimonialSliderOne}
            className="testimonial-slider-one wow fadeInUp"
          >
            {/*====== Testimonial Item  ======*/}
            <div className="single-testimonial-item">
              <div className="testimonial-inner-content">
                <div className="quote-rating-box">
                  <div className="icon">
                    <img
                      src="/assets/images/testimonial/quote.png"
                      alt="quote icon"
                    />
                  </div>
                  <div className="ratings-box">
                    <h6>{t('aboutPage.testimonialSection.qualityServices')}</h6>
                    <ul className="ratings">
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  {t('aboutPage.testimonialSection.testimonialText')}
                </p>
              </div>
            </div>
            {/*====== Testimonial Item  ======*/}
            <div className="single-testimonial-item">
              <div className="testimonial-inner-content">
                <div className="quote-rating-box">
                  <div className="icon">
                    <img
                      src="/assets/images/testimonial/quote.png"
                      alt="quote icon"
                    />
                  </div>
                  <div className="ratings-box">
                    <h6>{t('aboutPage.testimonialSection.qualityServices')}</h6>
                    <ul className="ratings">
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  {t('aboutPage.testimonialSection.testimonialText')}
                </p>
              </div>
            </div>
            {/*====== Testimonial Item  ======*/}
            <div className="single-testimonial-item">
              <div className="testimonial-inner-content">
                <div className="quote-rating-box">
                  <div className="icon">
                    <img
                      src="/assets/images/testimonial/quote.png"
                      alt="quote icon"
                    />
                  </div>
                  <div className="ratings-box">
                    <h6>{t('aboutPage.testimonialSection.qualityServices')}</h6>
                    <ul className="ratings">
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  {t('aboutPage.testimonialSection.testimonialText')}
                </p>
              </div>
            </div>
            {/*====== Testimonial Item  ======*/}
            <div className="single-testimonial-item">
              <div className="testimonial-inner-content">
                <div className="quote-rating-box">
                  <div className="icon">
                    <img
                      src="/assets/images/testimonial/quote.png"
                      alt="quote icon"
                    />
                  </div>
                  <div className="ratings-box">
                    <h6>{t('aboutPage.testimonialSection.qualityServices')}</h6>
                    <ul className="ratings">
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  {t('aboutPage.testimonialSection.testimonialText')}
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Testimonial Section  ======*/}
      
      {/*====== Start Global Reach Video Section  ======*/}
      <section className="global-reach-section pt-100 pb-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('aboutPage.globalReach.subtitle') || 'Our Global Reach'}
                </span>
                <h2>{t('aboutPage.globalReach.title') || 'From Egypt to the World'}</h2>
                <p className="section-description">
                  {t('aboutPage.globalReach.description') || 'Discover our worldwide presence and export network that brings premium Egyptian products to international markets'}
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="global-reach-video-box wow fadeInUp" data-wow-delay="0.2s">
                <div 
                  className="video-container"
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    background: '#f8f9fa'
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
                    <source src={getVideoSource()} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Overlay with company info */}
                  <div className="video-overlay map-text-overlay">
                    <h4 className="map-overlay-title">
                      {t('aboutPage.globalReach.overlayTitle') || 'Exporting Excellence Worldwide'}
                    </h4>
                    <p className="map-overlay-description">
                      {t('aboutPage.globalReach.overlayDescription') || 'From our facilities in Egypt, we serve markets across continents with premium quality products'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Global Reach Video Section  ======*/}
      
      {/*====== Start Catalog Download Section  ======*/}
      <section className="catalog-section pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="catalog-wrapper text-center">
                <div className="section-title mb-50 wow fadeInDown">
                  <span className="sub-title">
                    <i className="flaticon-plant" />
                    {t('catalog.title')}
                  </span>
                  <p className="catalog-description">
                    {t('catalog.description')}
                  </p>
                </div>
                
                <div className="catalog-download-box wow fadeInUp">
                  <button 
                    className="main-catalog-btn"
                    onClick={() => document.getElementById('catalogModal').style.display = 'block'}
                  >
                    <i className="far fa-download" />
                    {t('catalog.downloadButton')}
                  </button>
                </div>
                
                {/* Catalog Language Selection Modal */}
                <div 
                  id="catalogModal" 
                  className="catalog-modal"
                  onClick={(e) => {
                    if (e.target.id === 'catalogModal') {
                      document.getElementById('catalogModal').style.display = 'none';
                    }
                  }}
                >
                  <div className="catalog-modal-content">
                    <div className="catalog-modal-header">
                      <h3>{t('catalog.selectLanguage')}</h3>
                      <span 
                        className="catalog-close"
                        onClick={() => document.getElementById('catalogModal').style.display = 'none'}
                      >
                        &times;
                      </span>
                    </div>
                    <div className="catalog-modal-body">
                      <p>{t('catalog.description')}</p>
                      <div className="catalog-language-options">
                        <button 
                          className="catalog-language-btn english-option"
                          onClick={async () => {
                            try {
                              // Fetch the PDF file as blob
                              const response = await fetch('/assets/pdf/Olive profile (25 x 15 cm)  EN-HD.pdf');
                              if (!response.ok) throw new Error('Network response was not ok');
                              
                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);
                              
                              // Create download link
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = 'Bello-Food-Catalog-English.pdf';
                              document.body.appendChild(link);
                              link.click();
                              
                              // Cleanup
                              document.body.removeChild(link);
                              window.URL.revokeObjectURL(url);
                              document.getElementById('catalogModal').style.display = 'none';
                            } catch (error) {
                              console.error('Download failed:', error);
                              // Fallback: Open in new tab
                              window.open('/assets/pdf/Olive profile (25 x 15 cm)  EN-HD.pdf', '_blank');
                              document.getElementById('catalogModal').style.display = 'none';
                            }
                          }}
                        >
                          <div className="flag-icon">🇺🇸</div>
                          <div className="language-info">
                            <span className="language-name">{t('catalog.english')}</span>
                            <small>PDF • 45MB</small>
                          </div>
                          <i className="far fa-download" />
                        </button>
                        
                        <button 
                          className="catalog-language-btn russian-option"
                          onClick={async () => {
                            try {
                              // Fetch the PDF file as blob
                              const response = await fetch('/assets/pdf/Olive profile (25 x 15 cm)  RU-HD.pdf');
                              if (!response.ok) throw new Error('Network response was not ok');
                              
                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);
                              
                              // Create download link
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = 'Bello-Food-Catalog-Russian.pdf';
                              document.body.appendChild(link);
                              link.click();
                              
                              // Cleanup
                              document.body.removeChild(link);
                              window.URL.revokeObjectURL(url);
                              document.getElementById('catalogModal').style.display = 'none';
                            } catch (error) {
                              console.error('Download failed:', error);
                              // Fallback: Open in new tab
                              window.open('/assets/pdf/Olive profile (25 x 15 cm)  RU-HD.pdf', '_blank');
                              document.getElementById('catalogModal').style.display = 'none';
                            }
                          }}
                        >
                          <div className="flag-icon">🇷🇺</div>
                          <div className="language-info">
                            <span className="language-name">{t('catalog.russian')}</span>
                            <small>PDF • 25MB</small>
                          </div>
                          <i className="far fa-download" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Catalog Download Section  ======*/}

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

export default About;
