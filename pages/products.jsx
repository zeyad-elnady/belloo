import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const Products = () => {
  const { t } = useTranslation('common');
  
  // State to manage active product category
  const [activeCategory, setActiveCategory] = useState('greenOlives');
  
  // State to manage view type (jar/can)
  const [viewType, setViewType] = useState('jar');

  // Category data
  const categories = [
    { id: 'greenOlives', name: 'Green Olives', icon: '' },
    { id: 'blackOlives', name: 'Black Olives', icon: '' },
    { id: 'peppers', name: 'Peppers', icon: '' }
  ];

  // Function to get the correct image based on category and view type
  const getProductImage = (category) => {
    if (viewType === 'jar') {
      switch (category) {
        case 'greenOlives': return '/assets/images/products/green olive.jpg';
        case 'blackOlives': return '/assets/images/products/black olive.jpg';
        case 'peppers': return '/assets/images/products/chili.jpg';
        default: return '/assets/images/products/green olive.jpg';
      }
    } else { // can view
      switch (category) {
        case 'greenOlives': return '/assets/images/products/green olive can.jpg';
        case 'blackOlives': return '/assets/images/products/blak olive can.jpg';
        case 'peppers': return '/assets/images/products/chilli can.jpg';
        default: return '/assets/images/products/green olive can.jpg';
      }
    }
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
                {/* Whole Green Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".1s">
                    <div className="product-image">
                      <img src={getProductImage('greenOlives')} alt="Whole Green Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Whole Green Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Green Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('greenOlives')} alt="Pitted Green Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Pitted Green Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Green Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('greenOlives')} alt="Sliced Green Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Sliced Green Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Whole Green Olives - 65 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".25s">
                    <div className="product-image">
                      <img src={getProductImage('greenOlives')} alt="Whole Green Olives 65 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Whole Green Olives</h5>
                      <p className="product-package">65 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Green Olives - 65 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".3s">
                    <div className="product-image">
                      <img src={getProductImage('greenOlives')} alt="Pitted Green Olives 65 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                    </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Pitted Green Olives</h5>
                      <p className="product-package">65 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Green Olives - 65 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".35s">
                    <div className="product-image">
                      <img src={getProductImage('greenOlives')} alt="Sliced Green Olives 65 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                  </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Sliced Green Olives</h5>
                      <p className="product-package">65 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
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
                {/* Whole Black Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".1s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Whole Black Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Whole Black Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Pitted Black Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Pitted Black Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Black Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Sliced Black Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Sliced Black Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Black Natural Kalamata Olives - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".25s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Black Natural Kalamata Olives" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Black Natural Kalamata Olives</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Whole Black Olives - A10 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".3s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Whole Black Olives A10 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Whole Black Olives</h5>
                      <p className="product-package">A10 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Olives - A10 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".35s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Pitted Black Olives A10 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Pitted Black Olives</h5>
                      <p className="product-package">A10 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Whole Black Olives - 65 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".4s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Whole Black Olives 65 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                    </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Whole Black Olives</h5>
                      <p className="product-package">65 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitted Black Olives - 65 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".45s">
                    <div className="product-image">
                      <img src={getProductImage('blackOlives')} alt="Pitted Black Olives 65 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                  </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Pitted Black Olives</h5>
                      <p className="product-package">65 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
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
                      <img src={getProductImage('peppers')} alt="Pepperoncini Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Pepperoncini Pepper</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cherry Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".15s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Cherry Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Cherry Pepper</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kardonla Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".2s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Kardonla Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Kardonla Pepper</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sliced Green Jalapeno Pepper - A10 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".25s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Sliced Green Jalapeno Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Sliced Green Jalapeno Pepper</h5>
                      <p className="product-package">A10 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cherry Pepper - A10 Tins */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".3s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Cherry Pepper A10 Tins" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Cherry Pepper</h5>
                      <p className="product-package">A10 tins</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Habiba Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".35s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Habiba Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Habiba Pepper</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mexican Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".4s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Mexican Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                    </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Mexican Pepper</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macedonian Pepper - Glass Jar */}
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="product-card mb-40 wow fadeInUp" data-wow-delay=".45s">
                    <div className="product-image">
                      <img src={getProductImage('peppers')} alt="Macedonian Pepper" />
                      <div className="product-overlay">
                        <Link legacyBehavior href="/contact">
                          <a className="inquiry-btn">Get Quote</a>
                  </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-name">Macedonian Pepper</h5>
                      <p className="product-package">Glass jar 370ml</p>
                      <div className="product-details">
                        <div className="view-toggle-buttons">
                          <button 
                            className={`view-toggle-btn ${viewType === 'jar' ? 'active' : ''}`}
                            onClick={() => setViewType('jar')}
                          >
                            Jar View
                          </button>
                          <button 
                            className={`view-toggle-btn ${viewType === 'can' ? 'active' : ''}`}
                            onClick={() => setViewType('can')}
                          >
                            Can View
                          </button>
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
