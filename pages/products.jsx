import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

const Products = () => {
  const { t } = useTranslation('common');
  
  // State to manage active product category
  const [activeCategory, setActiveCategory] = useState('all');
  
  // State to manage view type for each individual product
  const [productViews, setProductViews] = useState({});
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');

  // State for database products
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?published_only=true');
        const data = await response.json();
        if (data.success) {
          setDbProducts(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Category data - updated to match database categories
  const categories = [
    { id: 'all', name: 'All Products', icon: '' },
    { id: 'green-olives', name: t('productsPage.categories.greenOlives'), icon: '' },
    { id: 'black-olives', name: t('productsPage.categories.blackOlives'), icon: '' },
    { id: 'peppers', name: t('productsPage.categories.peppers'), icon: '' },
    { id: 'artichokes', name: t('productsPage.categories.picklesVegetables'), icon: '' },
    { id: 'pickles', name: 'Pickles & Vegetables', icon: '' }
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
      'Whole Black Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Black Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Whole Black Natural Kalamata Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Natural Kalamata Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Black Natural Kalamata Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Whole Black Natural Picual Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Natural Picual Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Black Natural Picual Olives': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Olive Black Natural Dolce': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Pitted Black Natural Dolce': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      
      // Peppers - based on actual image availability
      'Pepperoncini Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Cherry Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Kardoula Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Whole Lombardi Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Lombardi Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Green Jalapeno Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Sliced Red en Jalapeno Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Habiba Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Mexican Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Macedonian Pepper': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      
      // Artichokes
      'Artichoke Hearts': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Artichoke Quarter': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
      'Artichoke Bottom': ['glass-jars', 'cans', 'vacuum-bags', 'plastic-buckets', 'barrels', 'pet-packs'],
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
        'Whole Green Olives': 'Whole Green Olives .png',
        'Pitted Green Olives': 'Pitted Green Olives .png',
        'Sliced Green Olives': 'Sliced Green Olives .png',
        'Whole Black Olives': 'Whole Black Olives.png',
        'Pitted Black Olives': 'Pitted Black Olives .png',
        'Sliced Black Olives': 'Sliced Black Olives .png',
        'Whole Black Natural Picual Olives': 'Whole Black Natural Picual Olives .jpg',
        'Pitted Black Natural Picual Olives': 'Pitted Black Natural Picual Olives.png',
        'Sliced Black Natural Picual Olives': 'Sliced  Black Natural Picual Olives.png',
        'Sliced Lombardi Pepper': 'Sliced Lombardi Pepper.png',
        'Pepperoncini Pepper': 'pepperoncini Pepper.png',
        'Cherry Pepper': 'Cherry Pepper.png',
        'Kardoula Pepper': 'Kardoula Pepper.png',
        'Whole Lombardi Pepper': 'Whole Lombardi Pepper.jpg',
        'Sliced Green Jalapeno Pepper': 'Sliced Green Jalapeno Pepper.png',
        'Sliced Red en Jalapeno Pepper': 'Sliced Red en Jalapeno Pepper.png',
        'Habiba Pepper': 'Habiba Peppper.jpg',
        'Mexican Pepper': 'Mexican Pepper.png',
        'Macedonian Pepper': 'Macedonian pepper jar.png',
        'Olive Black Natural Dolce': 'Olive Black Natural Dolce.png',
        'Pitted Black Natural Dolce': 'Pitted Black Natural Dolce.png',
        'Pitted Black Natural Kalamata Olives': 'Pitted Black Natural Kalamata Olives.png',
        'Sliced Black Natural Kalamata Olives': 'Sliced Black Natural Kalamata Olives.png',
        'Whole Black Natural Kalamata Olives': 'Whole Black Natural Kalamata Olives.png',
        'Artichoke Hearts': 'Artichoke Hearts .png',
        'Artichoke Quarter': 'Artichoke Quarter .png',
        'Artichoke Bottom': 'Artichoke Bottom jar.png',
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
        'Sliced Red en Jalapeno Pepper': 'Sliced Red en Jalapeno Pepper.png',
        'Whole Lombardi Pepper': 'Whole Lombardi Pepper.jpg',
        'Mexican Pepper': 'Mexican Pepper.png',
        'Olive Black Natural Dolce': 'Olive Black Natural Dolce can.png',
        'Pitted Black Natural Dolce': 'Pitted Black Natural Dolce can.png',
        'Pitted Black Natural Kalamata Olives': 'Pitted Black Natural Kalamata Olives can.png',
        'Whole Black Natural Kalamata Olives': 'Whole Black Natural Kalamata Olives can.png',
        'Sliced Black Natural Kalamata Olives': 'Sliced Black Natural Kalamata Olives (2).png',
        'Whole Black Natural Picual Olives': 'Whole Black Natural Picual Olives.png',
        'Sliced Black Natural Picual Olives': 'Sliced  Black Natural Picual Olives.png',
        'Sliced Lombardi Pepper': 'Sliced Lombardi Pepper can.png',
        'Pepperoncini Pepper': 'pepperoncini Pepper.png',
        'Macedonian Pepper': 'Macedonian pepper can.png',
        'Artichoke Hearts': 'Artichoke Hearts .jpg',
        'Artichoke Quarter': 'Artichoke Quarter .jpg',
        'Artichoke Bottom': 'Artichoke Bottom can.png',
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
        'Artichoke Bottom': 'Artichoke Bottom.jpg',
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

  // All products data
  const allProducts = {
    greenOlives: [
      { key: 'Whole Green Olives', name: t('productsPage.products.wholeGreenOlives'), description: t('productsPage.descriptions.wholeGreenOlives') },
      { key: 'Pitted Green Olives', name: t('productsPage.products.pittedGreenOlives'), description: t('productsPage.descriptions.pittedGreenOlives') },
      { key: 'Sliced Green Olives', name: t('productsPage.products.slicedGreenOlives'), description: t('productsPage.descriptions.slicedGreenOlives') }
    ],
    blackOlives: [
      { key: 'Whole Black Olives', name: t('productsPage.products.wholeBlackOlives'), description: t('productsPage.descriptions.wholeBlackOlives') },
      { key: 'Pitted Black Olives', name: t('productsPage.products.pittedBlackOlives'), description: t('productsPage.descriptions.pittedBlackOlives') },
      { key: 'Sliced Black Olives', name: t('productsPage.products.slicedBlackOlives'), description: t('productsPage.descriptions.slicedBlackOlives') },
      { key: 'Whole Black Natural Kalamata Olives', name: t('productsPage.products.wholeBlackNaturalKalamataOlives'), description: t('productsPage.descriptions.wholeBlackNaturalKalamataOlives') },
      { key: 'Pitted Black Natural Kalamata Olives', name: t('productsPage.products.pittedBlackNaturalKalamataOlives'), description: t('productsPage.descriptions.pittedBlackNaturalKalamataOlives') },
      { key: 'Sliced Black Natural Kalamata Olives', name: t('productsPage.products.slicedBlackNaturalKalamataOlives'), description: t('productsPage.descriptions.slicedBlackNaturalKalamataOlives') },
      { key: 'Whole Black Natural Picual Olives', name: t('productsPage.products.wholeBlackNaturalPicualOlives'), description: t('productsPage.descriptions.wholeBlackNaturalPicualOlives') },
      { key: 'Pitted Black Natural Picual Olives', name: t('productsPage.products.pittedBlackNaturalPicualOlives'), description: t('productsPage.descriptions.pittedBlackNaturalPicualOlives') },
      { key: 'Sliced Black Natural Picual Olives', name: t('productsPage.products.slicedBlackNaturalPicualOlives'), description: t('productsPage.descriptions.slicedBlackNaturalPicualOlives') },
      { key: 'Olive Black Natural Dolce', name: t('productsPage.products.oliveBlackNaturalDolce'), description: t('productsPage.descriptions.oliveBlackNaturalDolce') },
      { key: 'Pitted Black Natural Dolce', name: t('productsPage.products.pittedBlackNaturalDolce'), description: t('productsPage.descriptions.pittedBlackNaturalDolce') }
    ],
    peppers: [
      { key: 'Pepperoncini Pepper', name: t('productsPage.products.pepperonciniPepper'), description: t('productsPage.descriptions.pepperonciniPepper') },
      { key: 'Cherry Pepper', name: t('productsPage.products.cherryPepper'), description: t('productsPage.descriptions.cherryPepper') },
      { key: 'Kardoula Pepper', name: t('productsPage.products.kardoulaPepper'), description: t('productsPage.descriptions.kardoulaPepper') },
      { key: 'Whole Lombardi Pepper', name: t('productsPage.products.wholeLombardiPepper'), description: t('productsPage.descriptions.wholeLombardiPepper') },
      { key: 'Sliced Lombardi Pepper', name: t('productsPage.products.slicedLombardiPepper'), description: t('productsPage.descriptions.slicedLombardiPepper') },
      { key: 'Sliced Green Jalapeno Pepper', name: t('productsPage.products.slicedGreenJalapenoPepper'), description: t('productsPage.descriptions.slicedGreenJalapenoPepper') },
      { key: 'Sliced Red en Jalapeno Pepper', name: t('productsPage.products.slicedRedJalapenoPepper'), description: t('productsPage.descriptions.slicedRedJalapenoPepper') },
      { key: 'Habiba Pepper', name: t('productsPage.products.habibaPepper'), description: t('productsPage.descriptions.habibaPepper') },
      { key: 'Mexican Pepper', name: t('productsPage.products.mexicanPepper'), description: t('productsPage.descriptions.mexicanPepper') },
      { key: 'Macedonian Pepper', name: t('productsPage.products.macedonianPepper'), description: t('productsPage.descriptions.macedonianPepper') }
    ],
    picklesVegetables: [
      { key: 'Artichoke Hearts', name: t('productsPage.products.artichokeHearts'), description: t('productsPage.descriptions.artichokeHearts') },
      { key: 'Artichoke Quarter', name: t('productsPage.products.artichokeQuarter'), description: t('productsPage.descriptions.artichokeQuarter') },
      { key: 'Artichoke Bottom', name: t('productsPage.products.artichokeBottom'), description: t('productsPage.descriptions.artichokeBottom') }
    ]
  };

  // Helper function to filter products based on search query
  const filterProducts = (products) => {
    if (!searchQuery.trim()) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get ONLY CMS products (database managed)
  const getAllProducts = () => {
    // Convert database products to display format
    const dbConverted = dbProducts.map(p => {
      const gallery = p.gallery_images 
        ? (typeof p.gallery_images === 'string' ? JSON.parse(p.gallery_images) : p.gallery_images)
        : [];
      
      return {
        key: p.slug,
        name: p.name_en,
        description: p.description_en || p.short_description_en,
        mainImage: p.main_image,  // Glass Jars (default)
        galleryImages: gallery,   // Other packaging types
        isFromDB: true,
        category: p.category
      };
    });

    // Filter by category if needed
    if (activeCategory === 'all') {
      return dbConverted;
    } else {
      return dbConverted.filter(p => p.category === activeCategory);
    }
  };

  // Get filtered products for current category
  const getFilteredProducts = () => {
    let products = getAllProducts();

    // Filter by search query
    if (searchQuery.trim()) {
      products = products.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_ru?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.key?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return products;
  };

  // Get current image for CMS product
  const getCurrentProductImage = (product) => {
    const productKey = product.key;
    const currentView = productViews[productKey] || 'glass-jars';
    
    // If viewing Glass Jars (default), show main image
    if (currentView === 'glass-jars') {
      return product.mainImage;
    }
    
    // Find the gallery image for the selected packaging type
    const galleryImg = product.galleryImages?.find(img => img.type === currentView);
    return galleryImg ? galleryImg.url : product.mainImage;
  };

  // Render packaging buttons for CMS products
  const renderProductPackagingButtons = (product) => {
    const productKey = product.key;
    
    // If no gallery images, don't show buttons
    if (!product.galleryImages || product.galleryImages.length === 0) {
      return null;
    }
    
    const currentView = productViews[productKey] || 'glass-jars';
    
    return (
      <>
        <button
          className={`view-toggle-btn ${currentView === 'glass-jars' ? 'active' : ''}`}
          onClick={() => setProductViews(prev => ({ ...prev, [productKey]: 'glass-jars' }))}
        >
          Glass Jars
        </button>
        {product.galleryImages.map((img, idx) => (
          <button
            key={idx}
            className={`view-toggle-btn ${currentView === img.type ? 'active' : ''}`}
            onClick={() => setProductViews(prev => ({ ...prev, [productKey]: img.type }))}
          >
            {img.label}
          </button>
        ))}
      </>
    );
  };

  // Render a single product card (SAME STYLE for all products)
  const renderProductCard = (product, index) => {
    const productKey = product.key;
    const productName = product.name;
    const productDesc = product.description;
    
    return (
      <div key={productKey} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div className="product-card mb-40 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.05}s`}>
        <div className="product-image">
            <img 
              src={getCurrentProductImage(product)} 
              alt={productName} 
            />
          <div className="product-overlay">
              <Link legacyBehavior href={`/specifications?package=${getProductView(productKey)}`}>
              <a className="inquiry-btn">{t('productsPage.buttons.viewSpecs')}</a>
            </Link>
          </div>
        </div>
        <div className="product-info">
            <h5 className="product-name">{productName}</h5>
            <p className="product-package">{productDesc}</p>
          <div className="product-details">
            <div className="view-toggle-buttons">
                {renderProductPackagingButtons(product)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
          {/* Search Bar */}
          <div className="row justify-content-center mb-40">
            <div className="col-lg-6">
              <div className="product-search-wrapper">
                <div className="search-form">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="search-btn">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="row justify-content-center mb-60">
            <div className="col-lg-10">
              <div className="category-tabs-wrapper">
                <div className="category-tabs">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setSearchQuery(''); // Clear search when changing category
                      }}
                      data-wow-delay={`${0.1 + index * 0.1}s`}
                    >
                      <span className="tab-name">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid - Dynamic */}
          <div className="products-content">
            <div className="category-content active">
              {loading ? (
                <div className="row">
                  <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-3">Loading products...</p>
                  </div>
                </div>
              ) : (
              <div className="row">
                {getFilteredProducts().map((product, index) => renderProductCard(product, index))}
                {getFilteredProducts().length === 0 && (
                  <div className="col-12">
                    <div className="no-products-found text-center py-5">
                      <i className="fas fa-search" style={{fontSize: '4rem', color: '#ccc', marginBottom: '20px'}}></i>
                      <h4>No products found</h4>
                      <p>Try adjusting your search or browse our categories</p>
                    </div>
                  </div>
                )}
              </div>
              )}
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
