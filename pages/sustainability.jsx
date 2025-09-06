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
                      {t('sustainabilityPage.qualityAssurance.certifications.items', { returnObjects: true }).map((cert, index) => (
                        <div key={index} className="certification-item">
                          <div className="cert-icon">
                            <i className="fas fa-certificate"></i>
                          </div>
                          <span className="cert-text">{cert}</span>
                        </div>
                      ))}
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
