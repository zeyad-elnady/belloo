import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import { useTranslation } from 'next-i18next';

const Sustainability = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('sustainabilityPage.pageTitle')} />
      
      {/* Hero Section */}
      <section className="sustainability-hero-section pt-100 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('sustainabilityPage.subtitle')}
                </span>
                <h2>{t('sustainabilityPage.title')}</h2>
              </div>
              <div className="hero-description text-center wow fadeInUp mb-50">
                <p className="lead">
                  {t('sustainabilityPage.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Cards Section */}
      <section className="sustainability-content-section pb-100">
        <div className="container">
          <div className="row justify-content-center">
            {/* Eco-Friendly Practices Card */}
            <div className="col-lg-6 col-md-12 mb-40">
              <div className="sustainability-card eco-friendly-card wow fadeInLeft">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <div className="card-icon">
                      <i className="fas fa-leaf"></i>
                    </div>
                  </div>
                  <h3 className="card-title">{t('sustainabilityPage.ecoFriendly.title')}</h3>
                  <p className="card-subtitle">{t('sustainabilityPage.ecoFriendly.subtitle')}</p>
                </div>
                <div className="card-body">
                  <ul className="modern-check-list">
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.ecoFriendly.items.farming.title')}</strong>
                        <span>{t('sustainabilityPage.ecoFriendly.items.farming.description')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.ecoFriendly.items.production.title')}</strong>
                        <span>{t('sustainabilityPage.ecoFriendly.items.production.description')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.ecoFriendly.items.impact.title')}</strong>
                        <span>{t('sustainabilityPage.ecoFriendly.items.impact.description')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.ecoFriendly.items.composting.title')}</strong>
                        <span>{t('sustainabilityPage.ecoFriendly.items.composting.description')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certified Quality Card */}
            <div className="col-lg-6 col-md-12 mb-40">
              <div className="sustainability-card quality-card wow fadeInRight">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <div className="card-icon">
                      <i className="fas fa-award"></i>
                    </div>
                  </div>
                  <h3 className="card-title">{t('sustainabilityPage.quality.title')}</h3>
                  <p className="card-subtitle">{t('sustainabilityPage.quality.subtitle')}</p>
                </div>
                <div className="card-body">
                  <ul className="modern-check-list">
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.quality.items.certifications.title')}</strong>
                        <span>{t('sustainabilityPage.quality.items.certifications.description')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.quality.items.approvals.title')}</strong>
                        <span>{t('sustainabilityPage.quality.items.approvals.description')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.quality.items.compliance.title')}</strong>
                        <span>{t('sustainabilityPage.quality.items.compliance.description')}</span>
                      </div>
                    </li>
                    <li>
                      <div className="check-icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="check-content">
                        <strong>{t('sustainabilityPage.quality.items.varieties.title')}</strong>
                        <span>{t('sustainabilityPage.quality.items.varieties.description')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="row justify-content-center mt-60">
            <div className="col-lg-10">
              <div className="sustainability-statement text-center wow fadeInUp">
                <div className="statement-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <h3 className="statement-text">
                  {t('sustainabilityPage.statement')}
                </h3>
                <div className="statement-decoration"></div>
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
