import Link from "next/link";
import { Modal } from "react-bootstrap";
import { useTranslation } from 'next-i18next';

const Sidebar = ({ show, handleClose }) => {
  const { t } = useTranslation('common');
  return (
    <Modal
      className="modal fade sidebar-panel-wrapper"
      show={show}
      onHide={handleClose}
    >
      <div className="modal-content">
        <button className="close" data-dismiss="modal" onClick={handleClose}>
          <i className="far fa-times" />
        </button>
        <div className="sidebar-wrapper">
          <div className="sidebar-information-area">
            <div className="row no-gutters">
              <div className="col-lg-4 sidebar-widget">
                <div className="sidebar-info-widget">
                  <h4 className="title">Bello Food</h4>
                  <Link legacyBehavior href="/">
                    <a className="footer-logo">
                      <img
                        src="/assets/images/logo/01-04.svg"
                        alt="Bello Food Logo"
                        style={{ filter: 'brightness(0) invert(1)', maxHeight: '60px' }}
                      />
                    </a>
                  </Link>
                  <p>
                    {t('footer.about')}
                  </p>
                  <div className="social-item">
                    <h6>{t('footer.followUs')}</h6>
                    <ul className="social-link">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-pinterest-p" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 sidebar-widget">
                <div className="sidebar-info-widget">
                  <h4 className="title">{t('footer.getInTouch')}</h4>
                  <div className="contact-info-item-two">
                    <h6 className="title">
                      <i className="far fa-map-marker-alt" />
                      {t('footer.location')}
                    </h6>
                    <p>{t('footer.address')}</p>
                  </div>
                  <div className="contact-info-item-two">
                    <h6 className="title">
                      <i className="far fa-envelope-open" />
                      {t('footer.emailUs')}
                    </h6>
                    <p>
                      <a href="mailto:marketing@bello-food.com">{t('footer.email')}</a>
                    </p>
                  </div>
                  <div className="contact-info-item-two">
                    <h6 className="title">
                      <i className="far fa-phone-plus" />
                      {t('common.contactUs')}
                    </h6>
                    <p>
                      <a href="tel:+201101511185">{t('footer.phone')}</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 sidebar-widget">
                <div className="sidebar-info-widget">
                  <h4 className="title">{t('footer.whatsappContact')}</h4>
                  <p>{t('footer.whatsappDescription')}</p>
                  <a 
                    href="https://wa.me/201101511185" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="main-btn secondary-btn d-flex align-items-center justify-content-center"
                    style={{ gap: '8px' }}
                  >
                    <i className="fab fa-whatsapp" style={{ fontSize: '18px' }}></i>
                    {t('footer.whatsappButton')}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
};
export default Sidebar;
