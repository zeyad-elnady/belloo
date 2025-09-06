import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const Products = () => {
  const { t } = useTranslation('common');
  
  // State to manage active product category
  const [activeCategory, setActiveCategory] = useState('greenOlives');
  
  // State to manage view type for each individual product
  const [productViews, setProductViews] = useState({});

  // Category data
  const categories = [
    { id: 'greenOlives', name: t('productsPage.categories.greenOlives'), icon: '' },
    { id: 'blackOlives', name: t('productsPage.categories.blackOlives'), icon: '' },
    { id: 'peppers', name: t('productsPage.categories.peppers'), icon: '' },
    { id: 'picklesVegetables', name: t('productsPage.categories.picklesVegetables'), icon: '' }
  ];

  // Helper function to get current view for a specific product
  const getProductView = (productName) => {
    const availablePackaging = getAvailablePackaging(productName);
    return productViews[productName] || availablePackaging[0] || 'glass-jars';
  };

  // Helper function to set view for a specific product
  const setProductView = (productName, packaging) => {
    setProductViews(prev => ({
      ...prev,
      [productName]: packaging
    }));
  };

  // Helper function to render packaging buttons
  const renderPackagingButtons = (productName) => {
    const availablePackaging = getAvailablePackaging(productName);
    const currentView = getProductView(productName);
    const packagingLabels = {
      'glass-jars': t('productsPage.packagingTypes.glassJars'),
      'cans': t('productsPage.packagingTypes.cans'), 
      'vacuum-bags': t('productsPage.packagingTypes.vacuum'),
      'plastic-buckets': t('productsPage.packagingTypes.buckets'),
      'barrels': t('productsPage.packagingTypes.barrels'),
      'pet-packs': t('productsPage.packagingTypes.petPacks')
    };
    
    return availablePackaging.map((packaging) => (
      <button 
        key={packaging}
        className={`view-toggle-btn ${currentView === packaging ? 'active' : ''}`}
        onClick={() => setProductView(productName, packaging)}
      >
        {packagingLabels[packaging]}
      </button>
    ));
  };

  const getAvailablePackaging = (productName) => {
    const packagingMap = {
      // Green Olives - available in GLASS JARS, CANS, VACUUM BAGS + generic types
      'Whole Green Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Green Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Green Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      
      // Black Olives - specific availability based on actual image files
      'Whole Black Olives': ['cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'], // Not in glass jars
      'Pitted Black Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Black Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Whole Black Natural Kalamata Olives': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Natural Kalamata Olives': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Black Natural Kalamata Olives': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Whole Black Natural Picual Olives': ['glass-jars', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Natural Picual Olives': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Black Natural Picual Olives': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Olive Black Natural Dolce': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Natural Dolce': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      
      // Peppers - based on actual image availability
      'Pepperoncini Pepper': ['glass-jars', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Cherry Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Kardoula Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Whole Lombardi Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Lombardi Pepper': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Green Jalapeno Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Red en Jalapeno Pepper': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Habiba Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Mexican Pepper': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Macedonian Pepper': ['vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      
      // Artichokes
      'Artichoke Hearts': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Artichoke Quarter': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Artichoke Bottom': ['plastic-buckets', 'barrels', 'pet-packs'], // Only generic types
    };
    
    return packagingMap[productName] || ['plastic-buckets']; // Default to plastic buckets if no specific mapping
  };

  // Function to get the correct image based on product name and its current packaging view
  const getProductImage = (productName) => {
    const currentView = getProductView(productName);
    const availablePackaging = getAvailablePackaging(productName);
    
    const folderMap = {
      'glass-jars': 'GLASS JARS',
      'cans': 'CANS', 
      'vacuum-bags': 'VACUUM BAGS',
      'plastic-buckets': 'PLASTIC BUCKETS',
      'barrels': 'BARRELS',
      'pet-packs': 'PET PACKS'
    };
    
    // Comprehensive image mapping for each packaging type based on actual files
    const imageMapByPackaging = {
      'glass-jars': {
        'Whole Green Olives': 'Whole Green Olives .jpg',
        'Pitted Green Olives': 'Pitted Green Olives .jpg',
        'Sliced Green Olives': 'Sliced Green Olives .jpg',
        'Pitted Black Olives': 'Pitted Black Olives .jpg',
        'Sliced Black Olives': 'Sliced Black Olives .jpg',
        'Whole Black Natural Picual Olives': 'Whole Black Natural Picual Olives .jpg',
        'Pepperoncini Pepper': 'pepperoncini Pepper.jpg',
        'Cherry Pepper': 'Cherry Pepper.jpg',
        'Kardoula Pepper': 'Kardoula Pepper.jpg',
        'Whole Lombardi Pepper': 'Whole Lombardi Pepper.jpg',
        'Sliced Green Jalapeno Pepper': 'Sliced Green Jalapeno Pepper.jpg',
        'Habiba Pepper': 'Habiba Peppper.jpg',
        'Artichoke Hearts': 'Artichoke Hearts .jpg',
        'Artichoke Quarter': 'Artichoke Quarter .jpg',
      },
      'cans': {
        'Whole Green Olives': 'Whole Green Olives .jpg',
        'Pitted Green Olives': 'Pitted Green Olives .jpg',
        'Sliced Green Olives': 'Sliced Green Olives .jpg',
        'Whole Black Olives': 'Whole Black Olives .jpg',
        'Pitted Black Olives': 'Pitted Black Olives .jpg',
        'Sliced Black Olives': 'Sliced Black Olives .jpg',
        'Cherry Pepper': 'Cherry Pepper.jpg',
        'Habiba Pepper': 'Habiba Peppper.jpg',
        'Kardoula Pepper': 'Kardoula Pepper.jpg',
        'Sliced Green Jalapeno Pepper': 'Sliced Green Jalapeno Pepper.jpg',
        'Whole Lombardi Pepper': 'Whole Lombardi Pepper.jpg',
        'Artichoke Hearts': 'Artichoke Hearts .jpg',
        'Artichoke Quarter': 'Artichoke Quarter .jpg',
      },
      'vacuum-bags': {
        'Whole Green Olives': 'Whole Green Olives .jpg',
        'Pitted Green Olives': 'Pitted Green Olives.jpg', // Note: no space
        'Sliced Green Olives': 'Sliced Green Olives .jpg',
        'Whole Black Olives': 'Whole Black Olives .jpg',
        'Pitted Black Olives': 'Pitted Black Olives .jpg',
        'Sliced Black Olives': 'Sliced Black Olives .jpg',
        'Whole Black Natural Kalamata Olives': 'Whole Black Natural Kalamata Olives .jpg',
        'Pitted Black Natural Kalamata Olives': 'Pitted Black Natural Kalamata Olives .jpg',
        'Sliced Black Natural Kalamata Olives': 'Sliced Black Natural Kalamata Olives .jpg',
        'Whole Black Natural Picual Olives': 'Whole Black Natural Picual Olives .jpg',
        'Pitted Black Natural Picual Olives': 'Pitted Black Natural Picual Olives .jpg',
        'Sliced Black Natural Picual Olives': 'Sliced  Black Natural Picual Olives .jpg', // Note: double space
        'Olive Black Natural Dolce': 'Whole Black Natural Dolce.jpg',
        'Pitted Black Natural Dolce': 'Pitted Black Natural Dolce.jpg',
        'Pepperoncini Pepper': 'pepperoncini Pepper.jpg',
        'Cherry Pepper': 'Cherry Pepper.jpg',
        'Kardoula Pepper': 'Kardoula Pepper.jpg',
        'Whole Lombardi Pepper': 'Whole Lombardi Pepper.jpg',
        'Sliced Lombardi Pepper': 'Sliced Lombardi Pepper.jpg',
        'Sliced Green Jalapeno Pepper': 'Sliced Green Jalapeno Pepper.jpg',
        'Sliced Red en Jalapeno Pepper': 'Sliced Red en Jalapeno Pepper.jpg',
        'Habiba Pepper': 'Habiba Peppper.jpg',
        'Mexican Pepper': 'Mexican pepper.jpg',
        'Macedonian Pepper': 'Macedonian pepper.jpg',
        'Artichoke Hearts': 'Artichoke Hearts .jpg',
        'Artichoke Quarter': 'Artichoke Quarter .jpg',
      }
    };
    
    // Handle generic packaging types (only one image per type for all products)
    if (currentView === 'plastic-buckets' || currentView === 'barrels' || currentView === 'pet-packs') {
      const folder = folderMap[currentView];
      const genericImages = {
        'plastic-buckets': 'Untitled-14.png',
        'barrels': 'blue.png',
        'pet-packs': 'pet packs.png'
      };
      return `/assets/images/products/${folder}/${genericImages[currentView]}`;
    }
    
    // For specific packaging types, use the mapped image
    const folder = folderMap[currentView];
    const imageMap = imageMapByPackaging[currentView];
    const imageName = imageMap && imageMap[productName];
    
    if (imageName) {
      return `/assets/images/products/${folder}/${imageName}`;
    }
    
    // Fallback: try to find image in another packaging type if current doesn't have it
    for (const [packagingType, images] of Object.entries(imageMapByPackaging)) {
      if (images[productName] && availablePackaging.includes(packagingType)) {
        const fallbackFolder = folderMap[packagingType];
        return `/assets/images/products/${fallbackFolder}/${images[productName]}`;
      }
    }
    
    // Final fallback to a default image
    return '/assets/images/products/GLASS JARS/Whole Green Olives .jpg';
  };
  
  return (
    <Layout header={3} footer={3}>
      <PageBanner pageName={t('productsPage.pageTitle')} />
      {/* Main Title Section */}
      <section className="service-section pt-100 pb-40">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('productsPage.subtitle')}
                </span>
                <h2>{t('productsPage.title')}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="products-tabs-section pt-50 pb-100">
        <div className="container">
          {/* Category Tabs */}
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8">
              <div className="category-tabs-wrapper">
                <div className="category-tabs">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category.id)}
                      data-wow-delay={`${0.1 + index * 0.1}s`}
                    >
                      <span className="tab-name">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-content">
            
            {/* Green Olives Products */}
            <div className={`category-content ${activeCategory === 'greenOlives' ? 'active' : ''}`}>
          <div className="row">
                {/* Whole Green Olives */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".1s">
                    <div className="product-image">
                      <img src={getProductImage('Whole Green Olives')} alt="Whole Green Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Whole Green Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.wholeGreenOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.availableMultiplePackaging')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Whole Green Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Green Olives */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('Pitted Green Olives')} alt="Pitted Green Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Pitted Green Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.pittedGreenOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.availableMultiplePackaging')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Pitted Green Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Green Olives */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Green Olives')} alt="Sliced Green Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Green Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedGreenOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.availableMultiplePackaging')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Green Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Black Olives Products */}
            <div className={`category-content ${activeCategory === 'blackOlives' ? 'active' : ''}`}>
              <div className="row">
                {/* Whole Black Olives */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".1s">
                    <div className="product-image">
                      <img src={getProductImage('Whole Black Olives')} alt="Whole Black Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Whole Black Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.wholeBlackOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.cansVacuumPackaging')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Whole Black Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('Pitted Black Olives')} alt="Pitted Black Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Pitted Black Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.pittedBlackOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Pitted Black Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Black Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Black Olives')} alt="Sliced Black Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Black Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedBlackOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Black Olives')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

                {/* Whole Black Natural Kalamata Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".25s">
                    <div className="product-image">
                      <img src={getProductImage('Whole Black Natural Kalamata Olives')} alt="Whole Black Natural Kalamata Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Whole Black Natural Kalamata Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.wholeBlackNaturalKalamataOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Whole Black Natural Kalamata Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Natural Kalamata Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".27s">
                    <div className="product-image">
                      <img src={getProductImage('Pitted Black Natural Kalamata Olives')} alt="Pitted Black Natural Kalamata Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Pitted Black Natural Kalamata Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.pittedBlackNaturalKalamataOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Pitted Black Natural Kalamata Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Black Natural Kalamata Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".29s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Black Natural Kalamata Olives')} alt="Sliced Black Natural Kalamata Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Black Natural Kalamata Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedBlackNaturalKalamataOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Black Natural Kalamata Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Whole Black Natural Picual Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".31s">
                    <div className="product-image">
                      <img src={getProductImage('Whole Black Natural Picual Olives')} alt="Whole Black Natural Picual Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Whole Black Natural Picual Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.wholeBlackNaturalPicualOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Whole Black Natural Picual Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Natural Picual Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".33s">
                    <div className="product-image">
                      <img src={getProductImage('Pitted Black Natural Picual Olives')} alt="Pitted Black Natural Picual Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Pitted Black Natural Picual Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.pittedBlackNaturalPicualOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Pitted Black Natural Picual Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Black Natural Picual Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".35s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Black Natural Picual Olives')} alt="Sliced Black Natural Picual Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Black Natural Picual Olives')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedBlackNaturalPicualOlives')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Black Natural Picual Olives')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Olive Black Natural Dolce - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".37s">
                    <div className="product-image">
                      <img src={getProductImage('Olive Black Natural Dolce')} alt="Olive Black Natural Dolce" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Olive Black Natural Dolce')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.oliveBlackNaturalDolce')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Olive Black Natural Dolce')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Natural Dolce - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".39s">
                    <div className="product-image">
                      <img src={getProductImage('Pitted Black Natural Dolce')} alt="Pitted Black Natural Dolce" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Pitted Black Natural Dolce')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.pittedBlackNaturalDolce')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Pitted Black Natural Dolce')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Peppers Products */}
            <div className={`category-content ${activeCategory === 'peppers' ? 'active' : ''}`}>
              <div className="row">
                {/* Pepperoncini Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".1s">
                    <div className="product-image">
                      <img src={getProductImage('Pepperoncini Pepper')} alt="Pepperoncini Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Pepperoncini Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.pepperonciniPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Pepperoncini Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cherry Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('Cherry Pepper')} alt="Cherry Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Cherry Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.cherryPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Cherry Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kardoula Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('Kardoula Pepper')} alt="Kardoula Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Kardoula Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.kardoulaPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Kardoula Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Whole Lombardi Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".22s">
                    <div className="product-image">
                      <img src={getProductImage('Whole Lombardi Pepper')} alt="Whole Lombardi Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Whole Lombardi Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.wholeLombardiPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Whole Lombardi Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Lombardi Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".24s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Lombardi Pepper')} alt="Sliced Lombardi Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Lombardi Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedLombardiPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Lombardi Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Green Jalapeno Pepper - A10 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".26s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Green Jalapeno Pepper')} alt="Sliced Green Jalapeno Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Green Jalapeno Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedGreenJalapenoPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.a10Tins')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Green Jalapeno Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Red en Jalapeno Pepper - A10 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".28s">
                    <div className="product-image">
                      <img src={getProductImage('Sliced Red en Jalapeno Pepper')} alt="Sliced Red en Jalapeno Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Sliced Red en Jalapeno Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.slicedRedJalapenoPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.a10Tins')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Sliced Red en Jalapeno Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Habiba Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".35s">
                    <div className="product-image">
                      <img src={getProductImage('Habiba Pepper')} alt="Habiba Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Habiba Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.habibaPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Habiba Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mexican Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".4s">
                    <div className="product-image">
                      <img src={getProductImage('Mexican Pepper')} alt="Mexican Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Mexican Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.mexicanPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Mexican Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macedonian Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".45s">
                    <div className="product-image">
                      <img src={getProductImage('Macedonian Pepper')} alt="Macedonian Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Macedonian Pepper')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.macedonianPepper')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Macedonian Pepper')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pickles & Vegetables Products */}
            <div className={`category-content ${activeCategory === 'picklesVegetables' ? 'active' : ''}`}>
              <div className="row">
                {/* Artichoke Hearts - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".1s">
                    <div className="product-image">
                      <img src={getProductImage('Artichoke Hearts')} alt="Artichoke Hearts" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Artichoke Hearts')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.artichokeHearts')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Artichoke Hearts')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artichoke Quarter - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('Artichoke Quarter')} alt="Artichoke Quarter" />
                      <div className="product-overlay">
                        <Link legacyBehavior href={`/specifications?package=${getProductView('Artichoke Quarter')}`}>
                          <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.artichokeQuarter')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Artichoke Quarter')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artichoke Bottom - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('Artichoke Bottom')} alt="Artichoke Bottom" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">{t('productsPage.buttons.getQuote')}</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">{t('productsPage.products.artichokeBottom')}</h5>
                      <p className="product-package">{t('productsPage.descriptions.glassJar370ml')}</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          {renderPackagingButtons('Artichoke Bottom')}
                        </div>
                      </div>
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

export default Products;
