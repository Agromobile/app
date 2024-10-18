import './navbar.scss';
import { IoCartOutline } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoMobile from '../../assets/small-logo.png';
// For trial purposes only
// import axios from 'axios';

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false); // State to control sliding menu

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // const retrieveLoggedInUser = async () => {
    //   try {
    //     const response = await axios.get(
    //       'https://api-3858.onrender.com/user/personal/details',
    //     );

    //     console.log(response.status);
    //     console.log(response);
    //   } catch (err) {
    //     console.error(`Oops: ${err}`);
    //   }
    // };

    window.addEventListener('resize', handleResize);
    // retrieveLoggedInUser();
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
  const location = useLocation();

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
            <Link
              to="/"
              className="delivery-link"
            >
              Enter Your Delivery Address
            </Link>
          </div>
          <div className="user-links">
            <Link
              to="/login"
              state={{ previousLocation: location }}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              state={{ previousLocation: location }}
            >
              Sign Up
            </Link>
            <Link to="/sell">Sell</Link>
            <Link
              to="/cart"
              className="cart-icon"
            >
              <IoCartOutline />
            </Link>
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
  const location = useLocation(); // Duplicate use case of useLocation()

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
            <Link
              to="/"
              className="delivery-link"
            >
              Enter Your Delivery Address
            </Link>
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
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link
              to="/signup"
              state={{ previousLocation: location }}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/sell">Sell</Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="cart-icon"
            >
              <IoCartOutline />
            </Link>
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
