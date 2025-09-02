import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

const JoinUs = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('joinUsPage.pageTitle')} />
      <section className="team-section pt-95 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('joinUsPage.subtitle')}
                </span>
                <h2>{t('joinUsPage.title')}</h2>
                <p className="mt-20">
                  {t('joinUsPage.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-40">
              <div className="career-item wow fadeInLeft">
                <h4>{t('joinUsPage.whyWorkWithUs.title')}</h4>
                <ul className="check-style-one mt-30">
                  <li><i className="far fa-check" />{t('joinUsPage.whyWorkWithUs.benefits.competitive')}</li>
                  <li><i className="far fa-check" />{t('joinUsPage.whyWorkWithUs.benefits.development')}</li>
                  <li><i className="far fa-check" />{t('joinUsPage.whyWorkWithUs.benefits.technology')}</li>
                  <li><i className="far fa-check" />{t('joinUsPage.whyWorkWithUs.benefits.environment')}</li>
                  <li><i className="far fa-check" />{t('joinUsPage.whyWorkWithUs.benefits.flexibility')}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 mb-40">
              <div className="career-item wow fadeInRight">
                <h4>{t('joinUsPage.currentOpenings.title')}</h4>
                <div className="job-list mt-30">
                  <div className="job-item mb-20">
                    <h6>{t('joinUsPage.currentOpenings.jobs.qualityManager.title')}</h6>
                    <p>{t('joinUsPage.currentOpenings.jobs.qualityManager.details')}</p>
                  </div>
                  <div className="job-item mb-20">
                    <h6>{t('joinUsPage.currentOpenings.jobs.exportSpecialist.title')}</h6>
                    <p>{t('joinUsPage.currentOpenings.jobs.exportSpecialist.details')}</p>
                  </div>
                  <div className="job-item mb-20">
                    <h6>{t('joinUsPage.currentOpenings.jobs.productionSupervisor.title')}</h6>
                    <p>{t('joinUsPage.currentOpenings.jobs.productionSupervisor.details')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-40">
            <div className="col-lg-12 text-center">
              <div className="cta-content wow fadeInUp">
                <h3 className="mb-30">{t('joinUsPage.cta.title')}</h3>
                <p className="mb-40">
                  {t('joinUsPage.cta.description')}
                </p>
                <Link legacyBehavior href="/contact">
                  <a className="main-btn primary-btn">{t('joinUsPage.cta.applyNow')}</a>
                </Link>
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

export default JoinUs;
