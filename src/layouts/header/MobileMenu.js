import Link from "next/link";
import { Fragment, useState } from "react";
const MobileMenu = ({ handleShow, logo, extraClass, barIcon }) => {
  const [toggle, setToggle] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const active = (value) => setActiveMenu(value === activeMenu ? null : value),
    activeSubMenu = (value) =>
      value == activeMenu ? { display: "block" } : { display: "none" };

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
                      Home
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/about">
                      About
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/sustainability">
                      Sustainability
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/products">
                      Products
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/highlights">
                      Highlights
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/join-us">
                      Join Us
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link legacyBehavior href="/contact">
                      Contact
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
                className="navbar-toggler"
                onClick={() => setToggle(!toggle)}
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
