import './navbar.scss';
import { IoCartOutline } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import logoMobile from '../../assets/small-logo.png';

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false); // State to control sliding menu

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {screenWidth >= 768 ? (
        <DesktopTableNav />
      ) : (
        <MobileNav
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}
    </>
  );
}

const DesktopTableNav = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="nav-center">
          <input
            type="text"
            placeholder="Search Products"
            className="search-bar"
          />
          <div className="line"></div>
        </div>
        <div className="nav-right">
          <div className="delivery">
            <span>Home Delivery</span>
            <a
              href="/"
              className="delivery-link"
            >
              Enter Your Delivery Address
            </a>
          </div>
          <div className="user-links">
            <a href="/login">Log In</a>
            <a href="/signup">Sign Up</a>
            <a href="/sell">Sell</a>
            <a
              href="/cart"
              className="cart-icon"
            >
              <IoCartOutline />
            </a>
          </div>
        </div>
      </nav>
      <div className="greySection"></div>
    </div>
  );
};

// Updated MobileNav to accept the props `menuOpen` and `setMenuOpen`
const MobileNav = ({ menuOpen, setMenuOpen }) => {
  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle the state

  return (
    <nav className="navbar-mobile">
      <div className="nav-top">
        <div className="mobile-logo">
          <img
            src={logoMobile}
            alt="small logo"
          />
        </div>
        <div className="mobile-details">
          <div className="delivery-mobile">
            <span>Home Delivery</span>
            <a
              href="/"
              className="delivery-link"
            >
              Enter Your Delivery Address
            </a>
          </div>
          <FaBars
            className="fa-bars"
            onClick={toggleMenu}
          />{' '}
          {/* Open Menu */}
        </div>
      </div>
      <div className="nav-bottom">
        <input
          type="text"
          placeholder="Search Products"
          className="search-mobile"
        />
      </div>

      {/* Slide-in Menu */}
      <div className={`slide-menu ${menuOpen ? 'open' : ''}`}>
        <span
          className="close-menu"
          onClick={toggleMenu}
        >
          &times;
        </span>
        <ul className="menu-links">
          <li>
            <a href="/login">Log In</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
          <li>
            <a href="/sell">Sell</a>
          </li>
          <li>
            <a
              href="/cart"
              className="cart-icon"
            >
              <IoCartOutline />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Define PropTypes for MobileNav component
MobileNav.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
