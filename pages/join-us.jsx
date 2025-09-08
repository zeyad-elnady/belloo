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
          {/* Why Work With Us Section */}
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8">
              <div className="career-item wow fadeInUp text-center">
                <h4 style={{
                  color: '#2c3e50',
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  fontFamily: '"Montserrat", sans-serif'
                }}>{t('joinUsPage.whyWorkWithUs.title')}</h4>
                <div style={{
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                  borderRadius: '2px',
                  margin: '0 auto 40px auto'
                }}></div>
                <ul className="check-style-one mt-30" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '15px 40px',
                  listStyle: 'none',
                  padding: 0,
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#666',
                    minWidth: '300px'
                  }}><i className="far fa-check" style={{
                    color: '#4d602c',
                    marginRight: '12px',
                    fontSize: '18px'
                  }} />{t('joinUsPage.whyWorkWithUs.benefits.competitive')}</li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#666',
                    minWidth: '300px'
                  }}><i className="far fa-check" style={{
                    color: '#4d602c',
                    marginRight: '12px',
                    fontSize: '18px'
                  }} />{t('joinUsPage.whyWorkWithUs.benefits.development')}</li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#666',
                    minWidth: '300px'
                  }}><i className="far fa-check" style={{
                    color: '#4d602c',
                    marginRight: '12px',
                    fontSize: '18px'
                  }} />{t('joinUsPage.whyWorkWithUs.benefits.technology')}</li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#666',
                    minWidth: '300px'
                  }}><i className="far fa-check" style={{
                    color: '#4d602c',
                    marginRight: '12px',
                    fontSize: '18px'
                  }} />{t('joinUsPage.whyWorkWithUs.benefits.environment')}</li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#666',
                    minWidth: '300px'
                  }}><i className="far fa-check" style={{
                    color: '#4d602c',
                    marginRight: '12px',
                    fontSize: '18px'
                  }} />{t('joinUsPage.whyWorkWithUs.benefits.flexibility')}</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Job Listings Section */}
          <div className="row justify-content-center mb-60">
            <div className="col-lg-12">
              <div className="career-openings-section wow fadeInUp">
                <div className="section-header mb-40 text-center">
                  <h4 style={{
                    color: '#2c3e50',
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '10px',
                    fontFamily: '"Montserrat", sans-serif'
                  }}>{t('joinUsPage.currentOpenings.title')}</h4>
                  <div style={{
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                    borderRadius: '2px',
                    margin: '0 auto 20px auto'
                  }}></div>
                  <p style={{
                    color: '#666',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    margin: 0,
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}>
                    Join our dynamic team and grow your career in the food export industry
                  </p>
                </div>
                
                <div className="row justify-content-center">
                  {/* Quality Manager Position */}
                  <div className="col-lg-4 col-md-6 mb-30">
                    <div 
                      className="job-offer-card wow fadeInUp" 
                      data-wow-delay="0.1s"
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '30px 25px',
                        height: '100%',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(77, 96, 44, 0.15)';
                        e.currentTarget.style.borderColor = '#4d602c';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                        e.currentTarget.style.borderColor = '#f0f0f0';
                      }}
                    >
                      {/* Accent Line */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)'
                      }}></div>
                      
                      <div className="job-header" style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                        flexDirection: 'column',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '15px'
                        }}>
                          <i className="fas fa-clipboard-check" style={{ fontSize: '28px', color: '#ffffff' }}></i>
                        </div>
                        <div>
                          <h5 style={{
                            color: '#2c3e50',
                            fontSize: '20px',
                            fontWeight: '700',
                            margin: '0 0 8px 0',
                            lineHeight: '1.2',
                            fontFamily: '"Montserrat", sans-serif'
                          }}>
                            {t('joinUsPage.currentOpenings.jobs.qualityManager.title')}
                          </h5>
                          <span style={{
                            color: '#4d602c',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Full Time • Quality Department</span>
                        </div>
                      </div>
                      
                      <p style={{
                        color: '#666',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        margin: '0 0 20px 0',
                        textAlign: 'center',
                        flex: 1
                      }}>
                        {t('joinUsPage.currentOpenings.jobs.qualityManager.details')}
                      </p>
                      
                      <div className="job-tags" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '20px',
                        justifyContent: 'center'
                      }}>
                        <span style={{
                          background: '#f8f9fa',
                          color: '#4d602c',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>Food Safety</span>
                        <span style={{
                          background: '#f8f9fa',
                          color: '#4d602c',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>ISO Standards</span>
                        <span style={{
                          background: '#f8f9fa',
                          color: '#4d602c',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>Leadership</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          document.getElementById('application-form').scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '25px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          justifyContent: 'center',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 5px 15px rgba(77, 96, 44, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Apply Now <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Export Specialist Position */}
                  <div className="col-lg-4 col-md-6 mb-30">
                    <div 
                      className="job-offer-card wow fadeInUp" 
                      data-wow-delay="0.2s"
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '30px 25px',
                        height: '100%',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(77, 96, 44, 0.15)';
                        e.currentTarget.style.borderColor = '#4d602c';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                        e.currentTarget.style.borderColor = '#f0f0f0';
                      }}
                    >
                      {/* Accent Line */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)'
                      }}></div>
                      
                      <div className="job-header" style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                        flexDirection: 'column',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                          borderRadius: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '15px'
                        }}>
                          <i className="fas fa-globe-americas" style={{ fontSize: '28px', color: '#ffffff' }}></i>
                        </div>
                        <div>
                          <h5 style={{
                            color: '#2c3e50',
                            fontSize: '20px',
                            fontWeight: '700',
                            margin: '0 0 8px 0',
                            lineHeight: '1.2',
                            fontFamily: '"Montserrat", sans-serif'
                          }}>
                            {t('joinUsPage.currentOpenings.jobs.exportSpecialist.title')}
                          </h5>
                          <span style={{
                            color: '#4d602c',
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>Full Time • Sales Department</span>
                        </div>
                      </div>
                      
                      <p style={{
                        color: '#666',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        margin: '0 0 20px 0',
                        textAlign: 'center',
                        flex: 1
                      }}>
                        {t('joinUsPage.currentOpenings.jobs.exportSpecialist.details')}
                      </p>
                      
                      <div className="job-tags" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '20px',
                        justifyContent: 'center'
                      }}>
                        <span style={{
                          background: '#f8f9fa',
                          color: '#4d602c',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>Export Sales</span>
                        <span style={{
                          background: '#f8f9fa',
                          color: '#4d602c',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>International Trade</span>
                        <span style={{
                          background: '#f8f9fa',
                          color: '#4d602c',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>Relationship Management</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          document.getElementById('application-form').scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '25px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          justifyContent: 'center',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 5px 15px rgba(77, 96, 44, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Apply Now <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Production Supervisor Position */}
                  <div className="col-lg-4 col-md-6 mb-30">
                    <div 
                      className="job-offer-card wow fadeInUp" 
                      data-wow-delay="0.3s"
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '30px 25px',
                        height: '100%',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(77, 96, 44, 0.15)';
                      e.currentTarget.style.borderColor = '#4d602c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
                  >
                    {/* Accent Line */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)'
                    }}></div>
                    
                    <div className="job-header" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      flexDirection: 'column',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '15px'
                      }}>
                        <i className="fas fa-cogs" style={{ fontSize: '28px', color: '#ffffff' }}></i>
                      </div>
                      <div>
                        <h5 style={{
                          color: '#2c3e50',
                          fontSize: '20px',
                          fontWeight: '700',
                          margin: '0 0 8px 0',
                          lineHeight: '1.2',
                          fontFamily: '"Montserrat", sans-serif'
                        }}>
                          {t('joinUsPage.currentOpenings.jobs.productionSupervisor.title')}
                        </h5>
                        <span style={{
                          color: '#4d602c',
                          fontSize: '13px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Full Time • Production Department</span>
                      </div>
                    </div>
                    
                    <p style={{
                      color: '#666',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      margin: '0 0 20px 0',
                      textAlign: 'center',
                      flex: 1
                    }}>
                      {t('joinUsPage.currentOpenings.jobs.productionSupervisor.details')}
                    </p>
                    
                    <div className="job-tags" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '20px',
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Production Management</span>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Safety Protocols</span>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Team Leadership</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        document.getElementById('application-form').scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(77, 96, 44, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Apply Now <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </button>
                  </div>
                  
                  {/* Export Specialist Position */}
                  <div 
                    className="job-offer-card wow fadeInUp" 
                    data-wow-delay="0.2s"
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      padding: '30px 25px',
                      marginBottom: '20px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      border: '1px solid #f0f0f0',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(77, 96, 44, 0.15)';
                      e.currentTarget.style.borderColor = '#4d602c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
                  >
                    {/* Accent Line */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)'
                    }}></div>
                    
                    <div className="job-header" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}>
                        <i className="fas fa-globe-americas" style={{ fontSize: '22px', color: '#ffffff' }}></i>
                      </div>
                      <div>
                        <h5 style={{
                          color: '#2c3e50',
                          fontSize: '20px',
                          fontWeight: '700',
                          margin: 0,
                          lineHeight: '1.2',
                          fontFamily: '"Montserrat", sans-serif'
                        }}>
                          {t('joinUsPage.currentOpenings.jobs.exportSpecialist.title')}
                        </h5>
                        <span style={{
                          color: '#4d602c',
                          fontSize: '13px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Full Time • Sales Department</span>
                      </div>
                    </div>
                    
                    <p style={{
                      color: '#666',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      margin: '0 0 20px 0'
                    }}>
                      {t('joinUsPage.currentOpenings.jobs.exportSpecialist.details')}
                    </p>
                    
                    <div className="job-tags" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Export Sales</span>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>International Trade</span>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Relationship Management</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        document.getElementById('application-form').scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(77, 96, 44, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Apply Now <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </button>
                  </div>
                  
                  {/* Production Supervisor Position */}
                  <div 
                    className="job-offer-card wow fadeInUp" 
                    data-wow-delay="0.3s"
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      padding: '30px 25px',
                      marginBottom: '20px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      border: '1px solid #f0f0f0',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(77, 96, 44, 0.15)';
                      e.currentTarget.style.borderColor = '#4d602c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
                  >
                    {/* Accent Line */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)'
                    }}></div>
                    
                    <div className="job-header" style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}>
                        <i className="fas fa-cogs" style={{ fontSize: '22px', color: '#ffffff' }}></i>
                      </div>
                      <div>
                        <h5 style={{
                          color: '#2c3e50',
                          fontSize: '20px',
                          fontWeight: '700',
                          margin: 0,
                          lineHeight: '1.2',
                          fontFamily: '"Montserrat", sans-serif'
                        }}>
                          {t('joinUsPage.currentOpenings.jobs.productionSupervisor.title')}
                        </h5>
                        <span style={{
                          color: '#4d602c',
                          fontSize: '13px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>Full Time • Production Department</span>
                      </div>
                    </div>
                    
                    <p style={{
                      color: '#666',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      margin: '0 0 20px 0'
                    }}>
                      {t('joinUsPage.currentOpenings.jobs.productionSupervisor.details')}
                    </p>
                    
                    <div className="job-tags" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Production Management</span>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Safety Protocols</span>
                      <span style={{
                        background: '#f8f9fa',
                        color: '#4d602c',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Team Leadership</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        document.getElementById('application-form').scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #4d602c 0%, #5a6f35 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(77, 96, 44, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Apply Now <i className="fas fa-arrow-right" style={{ fontSize: '12px' }}></i>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Application Form Section */}
          <div className="row justify-content-center mt-60" id="application-form">
            <div className="col-lg-10 col-xl-8">
              <div className="application-form-wrapper">
                <div className="section-title text-center mb-50 wow fadeInDown">
                  <h3>{t('joinUsPage.applicationForm.title')}</h3>
                  <p className="mt-20">
                    {t('joinUsPage.applicationForm.description')}
                  </p>
                </div>
                
                  <form className="application-form" onSubmit={async (e) => {
                    console.log('Form submission started');
                  e.preventDefault();
                  
                  try {
                    const formData = new FormData(e.target);
                    
                    // Validate required fields
                    const name = formData.get('name');
                    const title = formData.get('title');
                    let position = formData.get('position');
                    
                    // Fix for nice-select plugin - if position is empty, try to get it from the nice-select
                    if (!position) {
                      const niceSelectCurrent = document.querySelector('.nice-select .current');
                      
                      if (niceSelectCurrent && niceSelectCurrent.textContent !== 'Select a position') {
                        const positionMap = {
                          'Quality Manager': 'quality-manager',
                          'Export Specialist': 'export-specialist',
                          'Production Supervisor': 'production-supervisor',
                          'Other': 'other'
                        };
                        position = positionMap[niceSelectCurrent.textContent] || niceSelectCurrent.textContent.toLowerCase().replace(/\s+/g, '-');
                      }
                    }
                    
                    const phone = formData.get('phone');
                    const email = formData.get('email');
                    
                    if (!name || !title || !position || !phone || !email) {
                      alert('Please fill in all required fields.');
                      return;
                    }
                    
                    // Prepare data for Google Sheets - EXACT SAME FORMAT AS WORKING TEST
                    const submissionData = {
                      name: (name || '').trim(),
                      title: (title || '').trim(),
                      position: position || '',
                      company: (formData.get('company')?.trim() || 'N/A'),
                      phone: (phone || '').trim(),
                      email: (email || '').trim(),
                      cvLink: (formData.get('cv')?.trim() || 'N/A'),
                      submissionDate: new Date().toLocaleString(),
                      timestamp: new Date().toISOString()
                    };
                    
                    // Show loading state
                    const submitButton = e.target.querySelector('button[type="submit"]');
                    
                    if (submitButton) {
                      const originalText = submitButton.innerHTML;
                      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
                      submitButton.disabled = true;
                      
                      try {
                        console.log('Submitting application...');
                        
                        const response = await fetch('https://script.google.com/macros/s/AKfycbxXFUF4Mw8-ytVXKCEBg-aF1E4OY5Zwe5HSBAwTKKfP4woyvdsZXn6AEJI5T3osNQJWGw/exec', {
                          method: 'POST',
                          mode: 'no-cors',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(submissionData)
                        });
                        
                        console.log('Application submitted successfully');
                        alert('✅ Application submitted successfully! We will review your application and get back to you soon.');
                  e.target.reset();
                        
                      } catch (error) {
                        console.error('Submission error:', error);
                        alert('Your application may have been submitted. Please check your Google Sheet to confirm, or contact us directly if you don\'t see your entry.');
                      } finally {
                        // Restore button state
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                      }
                    } else {
                      alert('There was an error finding the submit button. Please try again.');
                    }
                  } catch (error) {
                    console.error('Form submission error:', error);
                    alert('There was an error processing your application. Please try again.');
                  }
                }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="name" className="form-label">{t('joinUsPage.applicationForm.fields.name')} *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder={t('joinUsPage.applicationForm.fields.namePlaceholder')}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="title" className="form-label">{t('joinUsPage.applicationForm.fields.title')} *</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="form-control"
                          placeholder={t('joinUsPage.applicationForm.fields.titlePlaceholder')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="position" className="form-label">{t('joinUsPage.applicationForm.fields.position')} *</label>
                        <select
                          id="position"
                          name="position"
                          className="form-control position-select"
                        >
                          <option value="">{t('joinUsPage.applicationForm.fields.positionPlaceholder')}</option>
                          <option value="quality-manager">{t('joinUsPage.applicationForm.positions.qualityManager')}</option>
                          <option value="export-specialist">{t('joinUsPage.applicationForm.positions.exportSpecialist')}</option>
                          <option value="production-supervisor">{t('joinUsPage.applicationForm.positions.productionSupervisor')}</option>
                          <option value="other">{t('joinUsPage.applicationForm.positions.other')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="company" className="form-label">{t('joinUsPage.applicationForm.fields.company')}</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="form-control"
                          placeholder={t('joinUsPage.applicationForm.fields.companyPlaceholder')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="phone" className="form-label">{t('joinUsPage.applicationForm.fields.phone')} *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder={t('joinUsPage.applicationForm.fields.phonePlaceholder')}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <label htmlFor="email" className="form-label">{t('joinUsPage.applicationForm.fields.email')} *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder={t('joinUsPage.applicationForm.fields.emailPlaceholder')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-40">
                        <label htmlFor="cv" className="form-label">{t('joinUsPage.applicationForm.fields.cvLink')}</label>
                          <input
                          type="url"
                            id="cv"
                            name="cv"
                          className="form-control"
                          placeholder={t('joinUsPage.applicationForm.fields.cvLinkPlaceholder')}
                          pattern="https://drive\.google\.com/.*"
                          title="Please enter a valid Google Drive link"
                          />
                          <div className="file-upload-info">
                            <small className="text-muted">
                            {t('joinUsPage.applicationForm.helpTexts.cvLink')}
                            </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <button 
                        type="submit" 
                        className="main-btn primary-btn"
onClick={(e) => {
                          console.log('Submit button clicked');
                        }}
                      >
                        <i className="far fa-paper-plane mr-2" />
                        {t('joinUsPage.applicationForm.submitButton')}
                      </button>
                    </div>
                  </div>
                </form>
                
                {/* JavaScript to fix nice-select position field */}
                <script dangerouslySetInnerHTML={{
                  __html: `
                    // Wait for nice-select to be initialized
                    setTimeout(function() {
                      const niceSelect = document.querySelector('.application-form .nice-select');
                      const originalSelect = document.querySelector('.application-form select[name="position"]');
                      
                      if (niceSelect && originalSelect) {
                        console.log('Setting up nice-select sync for position field');
                        
                        // Map display text to form values
                        const positionMap = {
                          'Quality Manager': 'quality-manager',
                          'Export Specialist': 'export-specialist', 
                          'Production Supervisor': 'production-supervisor',
                          'Other': 'other'
                        };
                        
                        // Function to sync values
                        function syncSelectValue() {
                          const currentElement = niceSelect.querySelector('.current');
                          if (currentElement) {
                            const currentText = currentElement.textContent;
                            
                            if (currentText && currentText !== 'Select a position') {
                              const value = positionMap[currentText] || currentText.toLowerCase().replace(/\\s+/g, '-');
                              originalSelect.value = value;
                              originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                          }
                        }
                        
                        // Listen for multiple events
                        niceSelect.addEventListener('click', function(e) {
                          setTimeout(syncSelectValue, 150);
                        });
                        
                        // Also listen for changes in the dropdown list
                        const observer = new MutationObserver(function(mutations) {
                          mutations.forEach(function(mutation) {
                            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                              setTimeout(syncSelectValue, 50);
                            }
                          });
                        });
                        
                        observer.observe(niceSelect, {
                          childList: true,
                          subtree: true,
                          characterData: true
                        });
                        
                        // Initial sync in case there's already a value
                        setTimeout(syncSelectValue, 500);
                        
                      }
                    }, 1500);
                  `
                }} />
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
