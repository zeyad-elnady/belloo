import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Layout from '@/src/layouts/Layout';
import PageBanner from '@/src/components/PageBanner';

const Specifications = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { package: packageType } = router.query;
  const [currentPackage, setCurrentPackage] = useState('glass-jars');

  useEffect(() => {
    if (packageType) {
      setCurrentPackage(packageType);
    }
  }, [packageType]);

  const packagingSpecs = {
    'glass-jars': {
      title: t('specificationsPage.packages.glassJars.title'),
      description: t('specificationsPage.packages.glassJars.description'),
      specs: [
        { size: '370ml', grossWeight: '570g', netWeight: '370g', drainedWeight: '200g' },
        { size: '467ml', grossWeight: '700g', netWeight: '467g', drainedWeight: '280g' },
        { size: '720ml', grossWeight: '1050g', netWeight: '720g', drainedWeight: '420g' },
        { size: '1050ml', grossWeight: '1550g', netWeight: '1050g', drainedWeight: '550g' }
      ]
    },
    'cans': {
      title: t('specificationsPage.packages.cans.title'),
      description: t('specificationsPage.packages.cans.description'),
      specs: [
        { size: 'Easy open 65mm', grossWeight: '330g', netWeight: '300g', drainedWeight: '110g (Whole/Stuffed)' },
        { size: 'Easy open 73mm', grossWeight: '440g', netWeight: '400g', drainedWeight: '200g (Whole/Stuffed)' },
        { size: 'Easy open 99mm', grossWeight: '1.2kg', netWeight: '800g', drainedWeight: '420g (Whole/Stuffed)' },
        { size: 'A9', grossWeight: '2850g', netWeight: '2650g', drainedWeight: '1250g (Whole/Stuffed)' },
        { size: 'A10', grossWeight: '3300g', netWeight: '3100g', drainedWeight: '1750g (Whole/Stuffed)' },
        { size: 'A12', grossWeight: '4500g', netWeight: '4250g', drainedWeight: '2500g (Whole/Stuffed)' }
      ]
    },
    'vacuum-bags': {
      title: t('specificationsPage.packages.vacuumBags.title'),
      description: t('specificationsPage.packages.vacuumBags.description'),
      specs: [
        { size: '1kg', grossWeight: '1250g', netWeight: '1200g', drainedWeight: '1000g' },
        { size: '1.5kg', grossWeight: '1750g', netWeight: '1700g', drainedWeight: '1500g' },
        { size: '2kg', grossWeight: '2250g', netWeight: '2200g', drainedWeight: '2000g' }
      ]
    },
    'plastic-buckets': {
      title: t('specificationsPage.packages.plasticBuckets.title'),
      description: t('specificationsPage.packages.plasticBuckets.description'),
      specs: [
        { size: '5kg', grossWeight: '9.5kg', netWeight: '9kg', drainedWeight: '5kg' },
        { size: '10kg', grossWeight: '17.5kg', netWeight: '17kg', drainedWeight: '10kg' }
      ]
    },
    'barrels': {
      title: t('specificationsPage.packages.barrels.title'),
      description: t('specificationsPage.packages.barrels.description'),
      specs: [
        { size: 'Whole', grossWeight: '260 kg', netWeight: '250 kg', drainedWeight: '160 kg' },
        { size: 'Sliced', grossWeight: '260 kg', netWeight: '250 kg', drainedWeight: '120 kg' },
        { size: 'Pitted', grossWeight: '260 kg', netWeight: '250 kg', drainedWeight: '130 kg' },
        { size: 'Stuffed', grossWeight: '260 kg', netWeight: '250 kg', drainedWeight: '140 kg' }
      ]
    },
    'pet-packs': {
      title: t('specificationsPage.packages.petPacks.title'),
      description: t('specificationsPage.packages.petPacks.description'),
      specs: [
        { size: '3 L', grossWeight: '3300 g', netWeight: '3000 g', drainedWeight: '1500 g' },
        { size: '4 L', grossWeight: '4000 g', netWeight: '3780 g', drainedWeight: '1500 - 2000 g' }
      ]
    }
  };

  const currentSpecs = packagingSpecs[currentPackage] || packagingSpecs['glass-jars'];

  const handlePackageChange = (packageType) => {
    setCurrentPackage(packageType);
    router.push(`/specifications?package=${packageType}`, undefined, { shallow: true });
  };

  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('specificationsPage.pageTitle')} />
      
      <section className="specifications-section pt-130 pb-130">
        <div className="container">
          {/* Back Button */}
          <div className="row mb-40">
            <div className="col-12">
              <Link href="/" className="back-button">
                <i className="far fa-arrow-left"></i>
                <span>{t('common.backToHome') || 'Back to Home'}</span>
              </Link>
            </div>
          </div>

          {/* Package Type Selector */}
          <div className="package-selector mb-60">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="package-tabs">
                  {Object.keys(packagingSpecs).map((packageKey) => (
                    <button
                      key={packageKey}
                      className={`package-tab ${currentPackage === packageKey ? 'active' : ''}`}
                      onClick={() => handlePackageChange(packageKey)}
                    >
                      {packagingSpecs[packageKey].title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Content */}
          <div className="specifications-content">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {/* Header */}
                <div className="specs-header text-center mb-50">
                  <h2 className="specs-title">{currentSpecs.title}</h2>
                  <div className="rating mb-20">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <p className="specs-description">{currentSpecs.description}</p>
                </div>

                {/* Specifications Table */}
                <div className="specs-table-wrapper">
                  <table className="specs-table">
                    <thead>
                      <tr>
                        <th>{currentPackage === 'barrels' ? t('specificationsPage.table.barrelType') : (currentPackage === 'pet-packs' ? t('specificationsPage.table.petJarsType') : t('specificationsPage.table.packageSize'))}</th>
                        {currentSpecs.specs.map((spec, index) => (
                          <th key={index}>{spec.size}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('specificationsPage.table.grossWeight')}</td>
                        {currentSpecs.specs.map((spec, index) => (
                          <td key={index}>{spec.grossWeight}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{t('specificationsPage.table.netWeight')}</td>
                        {currentSpecs.specs.map((spec, index) => (
                          <td key={index}>{spec.netWeight}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{t('specificationsPage.table.drainedWeight')}</td>
                        {currentSpecs.specs.map((spec, index) => (
                          <td key={index}>{spec.drainedWeight}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Contact Information */}
                <div className="contact-info text-center mt-50">
                  <h4>{t('specificationsPage.contact.title')}</h4>
                  <p>{t('specificationsPage.contact.description')}</p>
                  <a href="/contact" className="main-btn filled-btn">{t('specificationsPage.contact.button')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Specifications;

export async function getStaticProps({ locale }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}


