import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
const MobileMenu = ({ handleShow, logo, extraClass, barIcon }) => {
  const [toggle, setToggle] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeSubMenu = (value) =>
      value == activeMenu ? { display: "block" } : { display: "none" };

  // Close menu when clicking on menu items
  const handleMenuItemClick = () => {
    setToggle(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Handle escape key to close menu
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && toggle) {
        setToggle(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [toggle]);

  return (
    <Fragment>
      <div
        className={`header-navigation d-xl-none d-block breakpoint-on ${extraClass}`}
      >
        <div
          className={`nav-overlay ${toggle ? "active" : ""}`}
          onClick={() => setToggle(false)}
        />
        <div className="container-fluid">
          <div className="primary-menu">
            {/*====== Site Branding ======*/}
            <div className="site-branding">
              <Link legacyBehavior href="/">
                <a className="brand-logo">
                  <img
                    src={logo ? logo : "/assets/images/logo/logo-black.png"}
                    alt="Site Logo"
                  />
                </a>
              </Link>
            </div>
            {/*====== Nav Menu ======*/}
            <div className={`nav-menu ${toggle ? "menu-on" : ""}`}>
              {/*====== Site Branding ======*/}
              <div className="mobile-logo mb-30 d-block d-xl-none">
                <Link legacyBehavior href="/">
                  <a className="brand-logo">
                    <img
                      src={"/assets/images/logo/logo-black.png"}
                      alt="Site Logo"
                    />
                  </a>
                </Link>
              </div>

              {/*====== main Menu ======*/}
              <nav className="main-menu">
                <ul>
                  <li className="menu-item">
                    <Link legacyBehavior href="/">
                      <a onClick={handleMenuItemClick}>Home</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/about">
                      <a onClick={handleMenuItemClick}>About</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/sustainability">
                      <a onClick={handleMenuItemClick}>Sustainability</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/products">
                      <a onClick={handleMenuItemClick}>Products</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/highlights">
                      <a onClick={handleMenuItemClick}>Highlights</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/join-us">
                      <a onClick={handleMenuItemClick}>Join Us</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/contact">
                      <a onClick={handleMenuItemClick}>Contact</a>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/*====== Menu Button ======*/}
              <div className="menu-button mt-40 d-xl-none">
                <Link legacyBehavior href="/contact">
                  <a className="main-btn secondary-btn">Get a Quote</a>
                </Link>
              </div>
            </div>
            {/*====== Nav Right Item ======*/}
            <div className="nav-right-item d-flex align-items-center">
              <div className="menu-button d-xl-block d-none">
                <Link legacyBehavior href="/contact">
                  <a className="main-btn primary-btn">Get a Quote</a>
                </Link>
              </div>

              <div
                className={`navbar-toggler ${toggle ? 'active' : ''}`}
                onClick={() => setToggle(!toggle)}
                style={{ cursor: 'pointer' }}
                aria-label="Toggle mobile menu"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setToggle(!toggle);
                  }
                }}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default MobileMenu;
