import Link from "next/link";
import { useTranslation } from 'next-i18next';

const Footer3 = () => {
  const { t } = useTranslation('common');
  
  return (
    <footer className="footer-area footer-wave pt-100 p-r z-1">
      <div className="wave-shapes">
        <img
          src="/assets/images/shape/wave-shape-1.png"
          className="w-shape one"
          alt="wave shape"
        />
        <img
          src="/assets/images/shape/wave-shape-2.png"
          className="w-shape two"
          alt="wave shape"
        />
      </div>
      <div className="footer-wrapper text-white main-bg p-r z-1">
        <div className="shape shape-one animate-float-y">
          <span>
            <img src="/assets/images/shape/tree.png" alt="Tree Image" />
          </span>
        </div>
        <div className="shape shape-two animate-float-y">
          <span>
            <img src="/assets/images/shape/tree2.png" alt="Tree Image" />
          </span>
        </div>
        <div className="container">
          {/*====== Footer Widget ======*/}
          <div className="footer-widget-area pt-55 pb-40 p-r z-1">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/*====== Footer Widget ======*/}
                <div className="footer-widget footer-about-widget mb-40 pr-lg-70 wow fadeInDown">
                  <div className="widget-content">
                    <div className="footer-logo mb-25">
                      <Link legacyBehavior href="/">
                        <a>
                          <div style={{ 
                            color: 'white', 
                            fontSize: '24px', 
                            fontWeight: 'bold',
                            fontFamily: 'Arial, sans-serif',
                            textDecoration: 'none'
                          }}>
                            Bello Food
                          </div>
                        </a>
                      </Link>
                    </div>
                    <p>
                      {t('footer.aboutCompany')}
                    </p>
                    <Link legacyBehavior href="/contact">
                      <a className="main-btn filled-btn filled-white">
                        {t('footer.contactUs')}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                {/*====== Footer Widget ======*/}
                <div className="footer-widget contact-info-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">{t('footer.getInTouch')}</h4>
                  <div className="widget-content">
                    <ul className="info-list">
                      <li>{t('footer.address')}</li>
                      <li>
                        <a href={`mailto:${t('footer.email')}`}>{t('footer.email')}</a>
                      </li>
                      <li>
                        <a href={`tel:${t('footer.phone')}`}>{t('footer.phone')}</a>
                      </li>
                      <li>
                        <a href={`https://${t('footer.website')}`} target="_blank" rel="noopener noreferrer">{t('footer.website')}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12">
                {/*====== Footer Widget ======*/}
                <div className="footer-widget footer-nav-widget mb-40 wow fadeInDown">
                  <h4 className="widget-title">{t('footer.quickLink')}</h4>
                  <div className="widget-content">
                    <ul className="footer-nav">
                      <li>
                        <Link legacyBehavior href="/about">
                          <a>{t('footer.aboutCompanyLink')}</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/products">
                          <a>{t('footer.ourProducts')}</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/join-us">
                          <a>{t('footer.joinUs')}</a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href="/contact">
                          <a>{t('footer.contactUs')}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                {/*====== Footer Widget ======*/}
                <div className="footer-widget footer-gallery-widget float-lg-right mb-40 wow fadeInUp">
                  <h4 className="widget-title">Gallery</h4>
                  <div className="widget-content">
                    <ul className="gallery-list">
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/gallery/thumb-widget-1.jpg"
                            alt="Image"
                          />
                          <div className="hover-overlay">
                            <i className="fas fa-arrow-right" />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/gallery/thumb-widget-2.png"
                            alt="Image"
                          />
                          <div className="hover-overlay">
                            <i className="fas fa-arrow-right" />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/gallery/thumb-widget-3.png"
                            alt="Image"
                          />
                          <div className="hover-overlay">
                            <i className="fas fa-arrow-right" />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/gallery/thumb-widget-4.png"
                            alt="Image"
                          />
                          <div className="hover-overlay">
                            <i className="fas fa-arrow-right" />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/gallery/thumb-widget-5.png"
                            alt="Image"
                          />
                          <div className="hover-overlay">
                            <i className="fas fa-arrow-right" />
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="/assets/images/gallery/thumb-widget-6.png"
                            alt="Image"
                          />
                          <div className="hover-overlay">
                            <i className="fas fa-arrow-right" />
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*=== Copyright Area ===*/}
          <div className="copyright-area">
            <div className="row">
              <div className="col-lg-6">
                {/*====== Copyright Text ======*/}
                <div className="copyright-text">
                  <p>{t('footer.copyright')}</p>
                </div>
              </div>
              <div className="col-lg-6">
                {/*====== Copyright Nav ======*/}
                <div className="copyright-nav float-lg-right">
                  <ul>
                    <li>
                      <a href="#">{t('footer.settingPrivacy')}</a>
                    </li>
                    <li>
                      <a href="#">{t('footer.faqs')}</a>
                    </li>
                    <li>
                      <Link legacyBehavior href="/products">
                        <a>{t('footer.products')}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer3;
