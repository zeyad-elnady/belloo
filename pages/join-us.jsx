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
          {/* Application Form Section */}
          <div className="row justify-content-center mt-60">
            <div className="col-lg-10 col-xl-8">
              <div className="application-form-wrapper">
                <div className="section-title text-center mb-50 wow fadeInDown">
                  <h3>Application Form</h3>
                  <p className="mt-20">
                    Ready to join our team? Fill out the application form below and we'll get back to you soon.
                  </p>
                </div>
                
                <form className="application-form wow fadeInUp" onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  
                  // Here you would typically send the form data to your backend
                  console.log('Form submitted:', {
                    name: formData.get('name'),
                    title: formData.get('title'),
                    position: formData.get('position'),
                    company: formData.get('company'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    cv: formData.get('cv')
                  });
                  
                  // Show success message
                  alert('Application submitted successfully! We will review your application and get back to you soon.');
                  e.target.reset();
                }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="name" className="form-label">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="title" className="form-label">Title *</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="form-control"
                          placeholder="Your professional title"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="position" className="form-label">Position Applied For *</label>
                        <select
                          id="position"
                          name="position"
                          className="form-control"
                          required
                        >
                          <option value="">Select a position</option>
                          <option value="quality-manager">Quality Manager</option>
                          <option value="export-specialist">Export Specialist</option>
                          <option value="production-supervisor">Production Supervisor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="company" className="form-label">Current Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="form-control"
                          placeholder="Current employer (if applicable)"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="phone" className="form-label">Cell Phone *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-40">
                        <label htmlFor="cv" className="form-label">Upload CV *</label>
                        <div className="file-upload-wrapper">
                          <input
                            type="file"
                            id="cv"
                            name="cv"
                            className="form-control file-input"
                            accept=".pdf,.doc,.docx"
                            required
                          />
                          <div className="file-upload-info">
                            <small className="text-muted">
                              Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <button type="submit" className="main-btn primary-btn">
                        <i className="far fa-paper-plane mr-2" />
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
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
