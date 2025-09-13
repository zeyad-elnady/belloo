import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import { useTranslation } from 'next-i18next';

const Sustainability = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('sustainabilityPage.pageTitle')} />
      
      {/* Hero Section */}
      <section className="sustainability-hero-section pt-120 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-70 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('sustainabilityPage.subtitle')}
                </span>
                <h2 className="sustainability-main-title">{t('sustainabilityPage.title')}</h2>
              </div>
              <div className="hero-description text-center wow fadeInUp">
                <p className="lead-text">
                  {t('sustainabilityPage.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="sustainability-content-section pb-120">
        <div className="container">
          
          {/* Commitment Card */}
          <div className="row mb-80">
            <div className="col-lg-12">
              <div className="sustainability-card commitment-card wow fadeInUp">
                <div className="card-header">
                  <div className="icon-container">
                    <div className="icon-circle">
                      <i className="fas fa-leaf"></i>
                    </div>
                  </div>
                  <h3 className="card-title">{t('sustainabilityPage.commitment.title')}</h3>
                </div>
                <div className="card-content">
                  <div className="commitment-items-grid">
                    {t('sustainabilityPage.commitment.items', { returnObjects: true }).map((item, index) => (
                      <div key={index} className="commitment-item">
                        <div className="item-icon">
                          <i className="fas fa-check"></i>
                        </div>
                        <span className="item-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Assurance Card */}
          <div className="row mb-80">
            <div className="col-lg-12">
              <div className="sustainability-card quality-card wow fadeInUp" data-wow-delay=".1s">
                <div className="card-header">
                  <div className="icon-container">
                    <div className="icon-circle quality-icon">
                      <i className="fas fa-award"></i>
                    </div>
                  </div>
                  <h3 className="card-title">{t('sustainabilityPage.qualityAssurance.title')}</h3>
                </div>
                <div className="card-content">
                  <p className="card-description">
                    {t('sustainabilityPage.qualityAssurance.description')}
                  </p>
                  <div className="certifications-section">
                    <h4 className="certifications-title">{t('sustainabilityPage.qualityAssurance.certifications.title')}</h4>
                    <div className="certifications-grid">
                      <div className="certification-item">
                        <div className="cert-logo">
                          <img 
                            src="/assets/images/icon/brc-logo.png" 
                            alt="BRC Certified" 
                            className="cert-image"
                          />
                        </div>
                        <span className="cert-text">
                          {t('sustainabilityPage.qualityAssurance.certifications.items', { returnObjects: true })[0]}
                        </span>
                      </div>
                      
                      <div className="certification-item">
                        <div className="cert-logo">
                          <img 
                            src="/assets/images/icon/fda.jpg" 
                            alt="FDA Approved" 
                            className="cert-image"
                          />
                        </div>
                        <span className="cert-text">
                          {t('sustainabilityPage.qualityAssurance.certifications.items', { returnObjects: true })[1]}
                        </span>
                      </div>
                      
                      <div className="certification-item">
                        <div className="cert-logo">
                          <img 
                            src="/assets/images/icon/iso.jpg" 
                            alt="ISO Certified" 
                            className="cert-image"
                          />
                        </div>
                        <span className="cert-text">
                          {t('sustainabilityPage.qualityAssurance.certifications.items', { returnObjects: true })[2]}
                        </span>
                      </div>
                      
                      <div className="certification-item">
                        <div className="cert-logo">
                          <img 
                            src="/assets/images/icon/حلا-01-01.png" 
                            alt="Halal Certified" 
                            className="cert-image"
                          />
                        </div>
                        <span className="cert-text">
                          {t('sustainabilityPage.qualityAssurance.certifications.items', { returnObjects: true })[3]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Reach & Customer Promise - Two Column Layout */}
          <div className="row">
            <div className="col-lg-6 mb-50">
              <div className="sustainability-card global-reach-card wow fadeInLeft" data-wow-delay=".2s">
                <div className="card-header">
                  <div className="icon-container">
                    <div className="icon-circle global-icon">
                      <i className="fas fa-globe"></i>
                    </div>
                  </div>
                  <h3 className="card-title">{t('sustainabilityPage.globalReach.title')}</h3>
                </div>
                <div className="card-content">
                  <p className="card-description">
                    {t('sustainabilityPage.globalReach.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-50">
              <div className="sustainability-card promise-card wow fadeInRight" data-wow-delay=".3s">
                <div className="card-header">
                  <div className="icon-container">
                    <div className="icon-circle promise-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                  </div>
                  <h3 className="card-title">{t('sustainabilityPage.customerPromise.title')}</h3>
                </div>
                <div className="card-content">
                  <div className="promise-items-grid">
                    {t('sustainabilityPage.customerPromise.items', { returnObjects: true }).map((item, index) => (
                      <div key={index} className="promise-item">
                        <div className="item-icon">
                          <i className="fas fa-star"></i>
                        </div>
                        <span className="item-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Closing Statement */}
      <section className="closing-statement-section pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="statement-container text-center wow fadeInUp">
                <div className="statement-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <blockquote className="statement-text">
                  {t('sustainabilityPage.statement')}
                </blockquote>
                <div className="statement-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for certification logos */}
      <style jsx>{`
        .cert-logo {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          margin-bottom: 15px;
          border: 2px solid #f0f0f0;
        }

        .cert-logo:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          border-color: #4d602c;
        }

        .cert-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .certification-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 25px;
          border-radius: 16px;
          background: rgba(255,255,255,0.8);
          transition: all 0.3s ease;
          min-height: 180px;
          justify-content: flex-start;
        }

        .certification-item:hover {
          background: rgba(77, 96, 44, 0.05);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }

        .cert-text {
          font-size: 14px;
          line-height: 1.4;
          color: #555;
          font-weight: 500;
          max-width: 180px;
        }

        @media (max-width: 768px) {
          .certifications-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
          }
          
          .cert-logo {
            width: 60px;
            height: 60px;
          }
          
          .cert-text {
            font-size: 13px;
          }
        }

        /* Add padding to main card content areas with important declarations to override existing CSS */
        .card-content {
          padding: 20px 30px !important;
        }

        .card-description {
          margin-bottom: 25px !important;
          line-height: 1.7 !important;
          padding: 0 15px !important;
        }

        .certifications-title {
          margin-bottom: 20px !important;
          padding: 0 15px !important;
        }

        .sustainability-card {
          padding: 45px 40px !important;
          border-radius: 20px !important;
          margin-bottom: 30px !important;
        }

        @media (max-width: 768px) {
          .card-content {
            padding: 15px 25px !important;
          }
          
          .sustainability-card {
            padding: 35px 25px !important;
          }
          
          .card-description {
            padding: 0 10px !important;
          }

          .certifications-title {
            padding: 0 10px !important;
          }
        }

        @media (max-width: 480px) {
          .certifications-grid {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .certification-item {
            min-height: 150px;
            padding: 20px 15px;
          }

          .card-content {
            padding: 15px 20px !important;
          }
          
          .sustainability-card {
            padding: 25px 20px !important;
          }
          
          .card-description {
            padding: 0 5px !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
          }

          .certifications-title {
            padding: 0 5px !important;
          }
        }
      `}</style>
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

export default Sustainability;
