import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import Counter from "@/src/components/Counter";
import { useTranslation } from 'next-i18next';

const Highlights = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('highlightsPage.pageTitle')} />
      <section className="features-section pt-95 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('highlightsPage.subtitle')}
                </span>
                <h2>{t('highlightsPage.title')}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-counter-item-two mb-40 wow fadeInDown" data-wow-delay=".2s">
                <div className="inner-counter">
                  <div className="icon">
                    <i className="fas fa-check" />
                  </div>
                  <h2 className="number">
                    <Counter end={20} />+
                  </h2>
                  <p>{t('highlightsPage.stats.countries')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-counter-item-two mb-40 wow fadeInUp" data-wow-delay=".25s">
                <div className="inner-counter">
                  <div className="icon">
                    <i className="fas fa-star" />
                  </div>
                  <h2 className="number">
                    <Counter end={30} />+
                  </h2>
                  <p>{t('highlightsPage.stats.products')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-counter-item-two mb-40 wow fadeInDown" data-wow-delay=".3s">
                <div className="inner-counter">
                  <div className="icon">
                    <i className="fas fa-users" />
                  </div>
                  <h2 className="number">
                    <Counter end={99} />%
                  </h2>
                  <p>{t('highlightsPage.stats.satisfaction')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="single-counter-item-two mb-40 wow fadeInUp" data-wow-delay=".35s">
                <div className="inner-counter">
                  <div className="icon">
                    <i className="fas fa-award" />
                  </div>
                  <h2 className="number">
                    <Counter end={25} />+
                  </h2>
                  <p>{t('highlightsPage.stats.experience')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-60">
            <div className="col-lg-12">
              <div className="content-box text-center wow fadeInUp">
                <h3 className="mb-30">{t('highlightsPage.achievements.title')}</h3>
                <div className="row">
                  <div className="col-md-4 mb-30">
                    <div className="highlight-item">
                      <h5>{t('highlightsPage.achievements.certification.title')}</h5>
                      <p>{t('highlightsPage.achievements.certification.description')}</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-30">
                    <div className="highlight-item">
                      <h5>{t('highlightsPage.achievements.export.title')}</h5>
                      <p>{t('highlightsPage.achievements.export.description')}</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-30">
                    <div className="highlight-item">
                      <h5>{t('highlightsPage.achievements.quality.title')}</h5>
                      <p>{t('highlightsPage.achievements.quality.description')}</p>
                    </div>
                  </div>
                </div>
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

export default Highlights;
