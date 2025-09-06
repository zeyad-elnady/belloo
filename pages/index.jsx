import Counter from "@/src/components/Counter";
import Layout from "@/src/layouts/Layout";
import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import Slider from "react-slick";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
const Index = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const isRTL = router.locale === 'ar';
  
  // Disable RTL for debugging
  const heroSliderProps = {
    ...sliderProps.heroSliderTwo,
    // rtl: isRTL, // Temporarily disabled
  };
  
  return (
    <Layout header={3} footer={3}>
      {/*====== Start Banner Section ======*/}
      <section className="banner-section">
        {/*====== Hero Wrapper ======*/}
        <div className="hero-wrapper-three">
          <div className="hero-waves">
            <img src="/assets/images/hero/bg-2.png" className="waves one" alt="Background waves" />
            <img src="/assets/images/hero/bg.png" className="waves two" alt="Background waves" />
          </div>
          {/*====== Hero Slider ======*/}
          <Slider {...heroSliderProps} className="hero-slider-two">
            {/*====== Single Slider ======*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage:
                    "url(/assets/images/hero/hero_two-slider-1.jpg)",
                }}
              />
          <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    {/*====== Hero Content ======*/}
                    <div className="hero-content text-center">
                      <span
                        className="sub-title"
                        data-animation="fadeInUp"
                        data-delay=".4s"
                      >
                        {t('hero.subtitle') || 'زيتون ومخللات فاخرة'}
                      </span>
                      <h1 data-animation="fadeInDown" data-delay=".5s">
                        {t('hero.title') || 'الطعم الأصيل للطبيعة، من مصر إلى العالم'}
                  </h1>
                      <p data-animation="fadeInUp" data-delay=".6s">
                    {t('hero.description') || 'موثوق به عالمياً مع أكثر من 30 نوعاً، جودة معتمدة، وحلول تعبئة مرنة.'}
                  </p>
                  <div
                        className="hero-button mb-30"
                        data-animation="fadeInDown"
                        data-delay=".7s"
                  >
                    <Link legacyBehavior href="/contact">
                          <a className="main-btn golden-btn mb-10">
                            {t('hero.getQuote') || 'Get A Quote'}
                          </a>
                    </Link>
                    <Link legacyBehavior href="/products">
                          <a className="main-btn filled-btn filled-white mb-10">
                            {t('hero.exploreProducts') || 'Explore Products'}
                          </a>
                    </Link>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
            {/*====== Single Slider ======*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage:
                    "url(/assets/images/hero/hero_two-slider-2.jpg)",
                }}
              />
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    {/*====== Hero Content ======*/}
                    <div className="hero-content text-left">
                      <span
                        className="sub-title"
                        data-animation="fadeInUp"
                        data-delay=".4s"
                      >
                        {t('hero.subtitle') || 'زيتون ومخللات فاخرة'}
                      </span>
                      <h1 data-animation="fadeInDown" data-delay=".5s">
                        {t('hero.title') || 'الطعم الأصيل للطبيعة، من مصر إلى العالم'}
                      </h1>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        {t('hero.description') || 'موثوق به عالمياً مع أكثر من 30 نوعاً، جودة معتمدة، وحلول تعبئة مرنة.'}
                      </p>
                      <div
                        className="hero-button mb-30"
                        data-animation="fadeInDown"
                        data-delay=".7s"
                      >
                        <Link legacyBehavior href="/contact">
                          <a className="main-btn golden-btn mb-10">
                            {t('hero.getQuote') || 'احصل على عرض سعر'}
                          </a>
                        </Link>
                        <Link legacyBehavior href="/products">
                          <a className="main-btn filled-btn filled-white mb-10">
                            {t('hero.exploreProducts') || 'استكشف المنتجات'}
                          </a>
                        </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            {/*====== Single Slider ======*/}
            <div className="single-slider">
              <div
                className="image-layer bg_cover"
                style={{
                  backgroundImage:
                    "url(/assets/images/hero/hero_two-slider-3.jpg)",
                }}
              />
              <div className="container">
            <div className="row justify-content-center">
                  <div className="col-xl-10">
                    {/*====== Hero Content ======*/}
                    <div className="hero-content text-right">
                      <span
                        className="sub-title"
                        data-animation="fadeInUp"
                        data-delay=".4s"
                      >
                        {t('hero.subtitle') || 'زيتون ومخللات فاخرة'}
                      </span>
                      <h1 data-animation="fadeInDown" data-delay=".5s">
                        {t('hero.title') || 'الطعم الأصيل للطبيعة، من مصر إلى العالم'}
                      </h1>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        {t('hero.description') || 'موثوق به عالمياً مع أكثر من 30 نوعاً، جودة معتمدة، وحلول تعبئة مرنة.'}
                      </p>
                      <div
                        className="hero-button mb-30"
                        data-animation="fadeInDown"
                        data-delay=".7s"
                      >
                        <Link legacyBehavior href="/contact">
                          <a className="main-btn golden-btn mb-10">
                            {t('hero.getQuote') || 'احصل على عرض سعر'}
                          </a>
                        </Link>
                        <Link legacyBehavior href="/products">
                          <a className="main-btn filled-btn filled-white mb-10">
                            {t('hero.exploreProducts') || 'استكشف المنتجات'}
                          </a>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
                    </div>
                  </div>
          </Slider>
                </div>
      </section>
      {/*====== End Banner Section ======*/}
      {/*====== Start Features Section ======*/}
      <section className="features-section pt-95">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-lg-6">
              <div className="section-title mb-55 wow fadeInLeft">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('features.subtitle')}
                </span>
                <h2>{t('features.title')}</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="features-content-box mb-55 wow fadeInRight">
                <p>
                  {t('features.description')}
                </p>
                <Link legacyBehavior href="/about">
                  <a className="btn-link">
                    {t('features.learnMore')}
                    <i className="far fa-angle-double-right" />
                  </a>
                </Link>
          </div>
                    </div>
                  </div>
          <div className="row">
            <div className="col-xl-3 col-md-6 col-sm-12">
              <div
                className="features-thumb-item-two mb-40 wow fadeInDown"
                data-wow-delay=".2s"
              >
                <div className="text">
                    <div className="icon">
                      <img src="/assets/images/icon/001-02.png" alt="Global Reach Icon" />
                    </div>
                  <h5 className="title">{t('features.globalReach.title')}</h5>
                  <p>{t('features.globalReach.description')}</p>
                  </div>
                </div>
              </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              <div
                className="features-thumb-item-two mb-40 wow fadeInUp"
                data-wow-delay=".25s"
              >
                <div className="text">
                    <div className="icon">
                      <img src="/assets/images/icon/001-03.png" alt="Flexible Packaging Icon" />
                    </div>
                  <h5 className="title">{t('features.flexiblePackaging.title')}</h5>
                  <p>{t('features.flexiblePackaging.description')}</p>
                  </div>
                </div>
              </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              <div
                className="features-thumb-item-two mb-40 wow fadeInDown"
                data-wow-delay=".3s"
              >
                  <div className="text">
                  <div className="icon">
                    <img src="/assets/images/icon/002-02.png" alt="Certified Quality Icon" />
                  </div>
                  <h5 className="title">{t('features.certifiedQuality.title')}</h5>
                  <p>{t('features.certifiedQuality.description')}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12">
              <div
                className="features-thumb-item-two mb-40 wow fadeInUp"
                data-wow-delay=".35s"
              >
                  <div className="text">
                  <div className="icon">
                    <img src="/assets/images/icon/001-05.png" alt="Logistics Strength Icon" />
                  </div>
                  <h5 className="title">{t('features.logisticsStrength.title')}</h5>
                  <p>{t('features.logisticsStrength.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start About Section ======*/}
      <section className="about-bg-section">
        {/*====== About BG ======*/}
        <div
          className="about-bg bg_cover wow fadeInLeft"
          style={{ backgroundImage: "url(/assets/images/bg/about-bg-1.jpg)" }}
        />
            <div className="container">
          <div className="row align-items-center justify-content-end">
            <div className="col-lg-6">
              {/*====== About Content Box ======*/}
              <div className="about-two_content-box pb-80 wow fadeInRight">
                <div className="section-title">
                  <div className="section-title mb-50">
                      <span className="sub-title">
                        <i className="flaticon-plant" />
                        {t('about.subtitle')}
                      </span>
                    <h2>{t('about.title')}</h2>
                    </div>
                  <p className="mb-45">
                      {t('about.description')}
                  </p>
                  <div className="about-inner-content d-flex justify-content-between">
                    <div className="inner-content">
                      <ul className="check-style-one mb-45">
                        <li>
                          <i className="far fa-check" />
                          {t('about.checkItems.0')}
                        </li>
                        <li>
                          <i className="far fa-check" />
                          {t('about.checkItems.1')}
                        </li>
                      </ul>
                      <Link legacyBehavior href="/about">
                        <a className="main-btn primary-btn">{t('about.learnMore')}</a>
                      </Link>
                          </div>
                    <div className="experience-box-two">
                      <h2 className="number">
                        <Counter end={30} />+
                      </h2>
                      <h6>{t('about.productVarieties')}</h6>
                      <Link legacyBehavior href="/about">
                        <a className="icon-btn">
                          <i className="far fa-arrow-right" />
                        </a>
                      </Link>
                        </div>
                      </div>
                          </div>
                        </div>
                      </div>
                          </div>
                        </div>
      </section>
      {/*====== End About Section ======*/}
      {/*====== Start Service Section ======*/}
      <section className="service-bgc-section p-r z-1 main-bg pt-150 pb-70">
        <div className="shape shape-one">
          <span>
            <img src="/assets/images/shape/leaf-1.png" alt="Leaf Png" />
          </span>
                      </div>
        <div className="shape shape-two">
          <span>
            <img src="/assets/images/shape/leaf-2.png" alt="Leaf Png" />
          </span>
                          </div>
        <div className="shape shape-three">
          <span>
            <img src="/assets/images/shape/leaf-3.png" alt="Leaf Png" />
          </span>
                        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-12">
              {/*====== Section Title ======*/}
              <div className="section-title text-white text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('products.subtitle')}
                </span>
                <h2>{t('products.title')}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-sm-12">
              {/*====== Service Item ======*/}
              <div
                className="single-service-item mb-30 wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div className="service-info">
                  <h4 className="title">
                    <Link legacyBehavior href="/products">
                      <a>{t('products.manzanillaOlives')}</a>
                    </Link>
                  </h4>
                </div>
                <div className="service-img">
                  <Link legacyBehavior href="/products">
                    <a className="icon-btn">
                      <i className="far fa-plus" />
                    </a>
                  </Link>
                  <img
                    src="/assets/images/products/green olive.jpg"
                    alt="Manzanilla Olives"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              {/*====== Service Item ======*/}
              <div
                className="single-service-item mb-30 wow fadeInDown"
                data-wow-delay=".25s"
              >
                <div className="service-info">
                  <h4 className="title">
                    <Link legacyBehavior href="/products">
                      <a>{t('products.kalamataOlives')}</a>
                    </Link>
                  </h4>
                </div>
                <div className="service-img">
                  <Link legacyBehavior href="/products">
                    <a className="icon-btn">
                      <i className="far fa-plus" />
                    </a>
                  </Link>
                  <img
                    src="/assets/images/products/black olive.jpg"
                    alt="Kalamata Olives"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              {/*====== Service Item ======*/}
              <div
                className="single-service-item mb-30 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="service-info">
                  <h4 className="title">
                    <Link legacyBehavior href="/products">
                      <a>{t('products.greenOlives')}</a>
                    </Link>
                  </h4>
                </div>
                <div className="service-img">
                  <Link legacyBehavior href="/products">
                    <a className="icon-btn">
                      <i className="far fa-plus" />
                    </a>
                  </Link>
                  <img
                    src="/assets/images/products/green olive.jpg"
                    alt="Green Olives"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              {/*====== Service Item ======*/}
              <div
                className="single-service-item mb-30 wow fadeInDown"
                data-wow-delay=".35s"
              >
                <div className="service-info">
                  <h4 className="title">
                    <Link legacyBehavior href="/products">
                      <a>{t('products.stuffedOlives')}</a>
                    </Link>
                  </h4>
                </div>
                <div className="service-img">
                  <Link legacyBehavior href="/products">
                    <a className="icon-btn">
                      <i className="far fa-plus" />
                    </a>
                  </Link>
                  <img
                    src="/assets/images/products/green olive.jpg"
                    alt="Stuffed Olives"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              {/*====== Service Item ======*/}
              <div
                className="single-service-item mb-30 wow fadeInUp"
                data-wow-delay=".4s"
              >
                <div className="service-info">
                  <h4 className="title">
                    <Link legacyBehavior href="/products">
                      <a>{t('products.blackOlives')}</a>
                    </Link>
                  </h4>
                </div>
                <div className="service-img">
                  <Link legacyBehavior href="/products">
                    <a className="icon-btn">
                      <i className="far fa-plus" />
                    </a>
                  </Link>
                  <img
                    src="/assets/images/products/black olive.jpg"
                    alt="Black Olives"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              {/*====== Service Item ======*/}
              <div
                className="single-service-item mb-30 wow fadeInDown"
                data-wow-delay=".45s"
              >
                <div className="service-info">
                  <h4 className="title">
                    <Link legacyBehavior href="/products">
                      <a>{t('products.pickledVegetables')}</a>
                      </Link>
                  </h4>
                </div>
                <div className="service-img">
                  <Link legacyBehavior href="/products">
                      <a className="icon-btn">
                      <i className="far fa-plus" />
                      </a>
                    </Link>
                  <img
                    src="/assets/images/products/chili.jpg"
                    alt="Pickled Vegetables"
                  />
                  </div>
                </div>
                  </div>
                </div>
              </div>
      </section>
      {/*====== End Service Section ======*/}
      {/*====== Start Skills Section  ======*/}
      <section className="skills-section pt-100 pb-50">
        <div className="container">
          <div className="row align-items-lg-center">
            <div className="col-xl-6 col-lg-12">
              {/*====== Skill Content Box ======*/}
              <div className="skill-content-box mb-35 mr-lg-50 wow fadeInLeft">
                {/*====== Section-title ======*/}
                <div className="section-title mb-25">
                  <span className="sub-title">
                    <i className="flaticon-plant" />
                    {t('skills.subtitle')}
                  </span>
                  <h2>{t('skills.title')}</h2>
            </div>
                <p className="mb-30">
                  {t('skills.description')}
                </p>
                {/*====== Skills List ======*/}
                <ul className="skills-list">
                  <li>
                    <div className="single-skill-bar mb-15">
                      <h5 className="title">{t('skills.qualityControl')}</h5>
                      <div className="progress-bar">
                        <div
                          className="progress wow slideInLeft"
                          style={{ width: "96%" }}
                        />
                      </div>
                      <span className="number">96%</span>
                    </div>
                  </li>
                  <li>
                    <div className="single-skill-bar mb-15">
                      <h5 className="title">{t('skills.processing')}</h5>
                      <div className="progress-bar">
                        <div
                          className="progress wow slideInLeft"
                          style={{ width: "92%" }}
                        />
                      </div>
                      <span className="number">92%</span>
                    </div>
                  </li>
                  <li>
                    <div className="single-skill-bar mb-15">
                      <h5 className="title">{t('skills.packaging')}</h5>
                      <div className="progress-bar">
                        <div
                          className="progress wow slideInLeft"
                          style={{ width: "98%" }}
                        />
                      </div>
                      <span className="number">98%</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              {/*====== Skills Image Box ======*/}
              <div className="skill-two_image-box mb-20 p-r z-1 wow fadeInRight">
                <img
                  src="/assets/images/skill/skill-4.jpg"
                  className="skill-img-one"
                  alt="Skill Image"
                />
                <img
                  src="/assets/images/skill/skill-5.jpg"
                  className="skill-img-two"
                  alt="Skill Image"
                />
                <div className="circle-logo">
                  <div className="inner-circle">
                    <img 
                      src="/assets/images/logo/01-04.svg" 
                      alt="Bello Logo" 
                      className="bello-logo-circle"
                      style={{ 
                        maxHeight: '70px', 
                        width: 'auto',
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Skills Section  ======*/}



      {/*====== Start Testimonial Section  ======*/}
      <section className="testimonial-section">
        <div className="container-fluid">
          {/*====== Testimonial Wrapper ======*/}
          <div className="testimonial-wrapper main-bg wow fadeInDown">
            <div className="shape shape-one">
              <span>
                <img src="/assets/images/testimonial/img-1.jpg" alt="image" />
              </span>
            </div>
            <div className="shape shape-two">
              <span>
                <img src="/assets/images/testimonial/img-2.jpg" alt="image" />
              </span>
                      </div>
            <div className="shape shape-three">
              <span>
                <img src="/assets/images/testimonial/img-3.jpg" alt="image" />
              </span>
                      </div>
            <div className="shape shape-four">
              <span>
                <img
                  src="/assets/images/testimonial/003-01.png"
                  alt="Tree image"
                />
              </span>
                    </div>
            <div className="shape shape-five">
              <span>
                <img
                  src="/assets/images/testimonial/003-03.png"
                  alt="Tree image"
                />
              </span>
                  </div>
              <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  {/*====== Testimonial Slider  ======*/}
                    <Slider
                    {...sliderProps.testimonialSliderTwo}
                    className="testimonial-slider-two"
                  >
                    {/*====== Single Testimonial Item  ======*/}
                    <div className="single-testimonial-item-two">
                      <div className="quote-rating-box">
                            <div className="icon">
                              <img
                            src="/assets/images/testimonial/quote2.png"
                            alt="quote icon"
                              />
                            </div>
                        <div className="ratings-box">
                          <h3>{t('testimonials.qualityServices')}</h3>
                          <ul className="ratings">
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p>
                        {t('testimonials.testimonialText')}
                      </p>
                      <div className="author-thumb-title">
                        <div className="author-thumb">
                          <img
                            src="/assets/images/author-thumb-1.png"
                            alt="Author Image"
                              />
                            </div>
                        <div className="author-title">
                          <h6 className="title">{t('testimonials.authorName')}</h6>
                          <p className="position">{t('testimonials.authorPosition')}</p>
                            </div>
                          </div>
                        </div>
                    {/*====== Single Testimonial Item  ======*/}
                    <div className="single-testimonial-item-two mb-60">
                      <div className="quote-rating-box">
                        <div className="icon">
                          <img
                            src="/assets/images/testimonial/quote2.png"
                            alt="quote icon"
                          />
                        </div>
                        <div className="ratings-box">
                          <h3>{t('testimonials.qualityServices')}</h3>
                          <ul className="ratings">
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p>
                        {t('testimonials.testimonialText')}
                      </p>
                      <div className="author-thumb-title">
                        <div className="author-thumb">
                          <img
                            src="/assets/images/author-thumb-1.png"
                            alt="Author Image"
                              />
                            </div>
                        <div className="author-title">
                          <h6 className="title">Douglas D. Hall</h6>
                              <p className="position">CEO &amp; Founder</p>
                            </div>
                          </div>
                        </div>
                    {/*====== Single Testimonial Item  ======*/}
                    <div className="single-testimonial-item-two mb-60">
                      <div className="quote-rating-box">
                        <div className="icon">
                          <img
                            src="/assets/images/testimonial/quote2.png"
                            alt="quote icon"
                          />
                        </div>
                        <div className="ratings-box">
                          <h3>{t('testimonials.qualityServices')}</h3>
                          <ul className="ratings">
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                            <li>
                              <i className="fas fa-star" />
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p>
                        {t('testimonials.testimonialText')}
                      </p>
                      <div className="author-thumb-title">
                        <div className="author-thumb">
                          <img
                            src="/assets/images/author-thumb-1.png"
                            alt="Author Image"
                              />
                            </div>
                        <div className="author-title">
                          <h6 className="title">{t('testimonials.authorName')}</h6>
                          <p className="position">{t('testimonials.authorPosition')}</p>
                            </div>
                        </div>
                      </div>
                    </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section  ======*/}
      {/*====== Start Blog Section  ======*/}
      <section className="blog-section pt-100 pb-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-12">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="flaticon-plant" />
                  {t('blog.subtitle')}
                </span>
                <h2>{t('blog.title')}</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Blog Post  ======*/}
              <div
                className="single-blog-post-two mb-40 wow wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div className="entry-content">
                  <div className="post-meta">
                    <span className="date">
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.date')}</a>
                      </Link>
                    </span>
                    <span className="comment">
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.comments')}</a>
                      </Link>
                    </span>
                  </div>
                                    <h4 className="entry-title">
                    <Link legacyBehavior href="/blog-details">
                      <a>{t('blog.posts.0')}</a>
                    </Link>
                  </h4>
                  <div className="author">
                    <h6>
                      <span>{t('blog.by')}</span>
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.author')}</a>
                      </Link>
                    </h6>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Blog Post  ======*/}
              <div
                className="single-blog-post-two mb-40 wow fadeInDown"
                data-wow-delay=".25s"
              >
                <div className="entry-content">
                  <div className="post-meta">
                    <span className="date">
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.date')}</a>
                      </Link>
                    </span>
                    <span className="comment">
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.comments')}</a>
                      </Link>
                    </span>
                  </div>
                                    <h4 className="entry-title">
                    <Link legacyBehavior href="/blog-details">
                      <a>{t('blog.posts.1')}</a>
                    </Link>
                  </h4>
                  <div className="author">
                    <h6>
                      <span>{t('blog.by')}</span>
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.author')}</a>
                      </Link>
                    </h6>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              {/*====== Single Blog Post  ======*/}
              <div
                className="single-blog-post-two mb-40 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="entry-content">
                  <div className="post-meta">
                    <span className="date">
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.date')}</a>
                      </Link>
                    </span>
                    <span className="comment">
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.comments')}</a>
                      </Link>
                    </span>
                  </div>
                  <h4 className="entry-title">
                    <Link legacyBehavior href="/blog-details">
                      <a>{t('blog.posts.2')}</a>
                    </Link>
                  </h4>
                  <div className="author">
                    <h6>
                      <span>{t('blog.by')}</span>
                      <Link legacyBehavior href="/blog-details">
                        <a>{t('blog.author')}</a>
                      </Link>
                    </h6>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Blog Section  ======*/}
      {/*====== Start Newsletter Section ======*/}
      <section className="newsletter-section white-bg py-40">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              {/*====== Newsletter Form ======*/}
              <div className="newsletter-form-wrapper wow fadeInUp" data-wow-delay=".2s">
                <form 
                  onSubmit={async (e) => {
                    console.log('Newsletter form submission started');
                    e.preventDefault();

                    try {
                      const formData = new FormData(e.target);
                      const email = formData.get('email');

                      if (!email || !email.trim()) {
                        alert(t('newsletter.errorValidation') || 'Please enter a valid email address.');
                        return;
                      }

                      // Show loading state
                      const submitButton = e.target.querySelector('button[type="submit"]');
                      if (submitButton) {
                        const originalText = submitButton.innerHTML;
                        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + t('newsletter.subscribing');
                        submitButton.disabled = true;

                        try {
                          console.log('Submitting newsletter subscription...');

                          // Use form data for better compatibility with Google Apps Script
                          const formData = new FormData();
                          formData.append('email', email.trim());
                          formData.append('source', 'Homepage');
                          formData.append('language', router.locale || 'en');
                          
                          const response = await fetch('https://script.google.com/macros/s/AKfycbw8CS8rMqQ2E4WzNkpRKJ0tNXn8Lg6Y17BMXAv-Iw3rjTzxfb7UlCKWmndPCmHbDarDkQ/exec', {
                            method: 'POST',
                            mode: 'no-cors',
                            body: formData
                          });

                          // With no-cors mode, we can't read the response, so we assume success
                          console.log('Newsletter subscription sent successfully');
                          alert(t('newsletter.successWithWelcome') || '🎉 Successfully subscribed! If you don\'t receive a welcome email, you may already be subscribed.');
                          e.target.reset();

                        } catch (error) {
                          console.error('Newsletter submission error:', error);
                          alert(t('newsletter.errorMessage'));
                        } finally {
                          // Restore button state
                          submitButton.innerHTML = originalText;
                          submitButton.disabled = false;
                        }
                      }
                    } catch (error) {
                      console.error('Newsletter form error:', error);
                      alert('There was an error processing your subscription. Please try again.');
                    }
                  }}
                  className="newsletter-form d-flex align-items-center"
                  style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    padding: '8px',
                    borderRadius: '50px',
                    border: '2px solid #e9ecef',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="form-group flex-fill mb-0" style={{ marginRight: '8px' }}>
                    <input 
                      type="email" 
                      name="email"
                      className="form-control newsletter-input" 
                      placeholder={t('newsletter.emailPlaceholder')}
                      required
                      style={{
                        height: '48px',
                        padding: '0 20px',
                        borderRadius: '40px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#2F2F2F',
                        fontSize: '15px',
                        fontWeight: '400',
                        transition: 'all 0.3s ease',
                        boxShadow: 'none'
                      }}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="newsletter-btn"
                    style={{ 
                      height: '48px',
                      borderRadius: '40px',
                      padding: '0 30px',
                      fontSize: '14px',
                      fontWeight: '600',
                      minWidth: '140px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      backgroundColor: '#4D602C',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="far fa-envelope mr-2"></i>
                    {t('newsletter.subscribe')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Newsletter Section ======*/}
    </Layout>
  );
};
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Index;
