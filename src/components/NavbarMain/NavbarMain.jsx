import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import icon from '../../assets/icon.png';
import basketFruit from '../../assets/fruiticon.png';
import logo from '../../assets/iconText.png';
import {
  FaUser,
  FaShoppingCart,
  FaQuestionCircle,
  FaBars,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      {/* First Section */}
      <nav
        style={{
          backgroundColor: '#00800033',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {/* Left: Logo and Text */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={icon}
            alt="Agromobile Logo"
            style={{ marginRight: '10px', padding: '10px' }}
          />
          <span
            style={{
              color: '#1D1D1D',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'underline',
              marginLeft: '10px',
            }}
          >
            Sell on Agromobile
          </span>
        </div>

        {/* Middle: Row of Fruits */}
        <div>
          <img
            src={basketFruit}
            alt="Fruits"
            style={{ width: '200px' }}
          />
        </div>

        {/* Right: Call to Action */}
        <div
          style={{
            backgroundColor: '#FC3E09CC',
            padding: '10px 20px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '20px',
            textAlign: 'center',
          }}
        >
          <span>Call For Good Deals</span>
          <br />
          <span>08088112234</span>
        </div>
      </nav>

      {/* Second Section (Underneath the First) */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 10%)',
        }}
      >
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="AgroMobile Logo"
            style={{ width: '150px' }}
          />
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
          <input
            type="text"
            placeholder="Search Products"
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '25px',
              border: '1px solid #ccc',
              marginRight: '10px',
            }}
          />
          <button
            style={{
              backgroundColor: '#1E8D2C',
              color: '#fff',
              padding: '10px 30px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
            }}
          >
            Search
          </button>
        </div>

        {/* Profile Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* User Section */}
          <div
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#80808033',
              display: 'flex',
              alignItems: 'center',
              marginRight: '20px',
              cursor: 'pointer',
            }}
          >
            <FaUser style={{ marginRight: '5px' }} />
            <select style={{ border: 'none', background: 'transparent' }}>
              <option>Hi, User</option>
              <option>Profile</option>
              <option>Logout</option>
            </select>
          </div>

          {/* Help Section */}
          <div
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#80808033',
              display: 'flex',
              alignItems: 'center',
              marginRight: '20px',
              cursor: 'pointer',
            }}
          >
            <FaQuestionCircle style={{ marginRight: '5px' }} />
            <select style={{ border: 'none', background: 'transparent' }}>
              <option>Help</option>
            </select>
          </div>

          {/* Cart Section */}
          <div
            style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#80808033',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <FaShoppingCart style={{ marginRight: '5px' }} />
            <span>Cart</span>
          </div>
        </div>
      </nav>
    </>
  );
};

const MobileNav = ({ menuOpen, setMenuOpen }) => {
  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle the state

  return (
    <>
      {' '}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#fff',
        }}
      >
        {/* Hamburger Menu Icon */}
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <FaBars
            size={24}
            onClick={toggleMenu}
          />{' '}
          {/* Logo */}
          <div>
            <img
              src={icon}
              alt="AgroMobile Logo"
              // style={{ width: '120px' }}
            />
            <img
              src={logo}
              alt="AgroMobile Logo"
              style={{ width: '120px' }}
            />
          </div>
        </div>

        {/* Cart Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#80808033',
          }}
        >
          <FaShoppingCart size={24} />
          <span style={{ marginLeft: '5px' }}>Cart</span>
        </div>
      </nav>
      {/* second section */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '80%' }}>
          <input
            type="text"
            placeholder="Search Products"
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '25px',
              border: '1px solid #ccc',
              marginRight: '10px',
            }}
          />
          <button
            style={{
              backgroundColor: '#1E8D2C',
              color: '#fff',
              padding: '10px 30px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
            }}
          >
            Search
          </button>
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
              <Link to="/">Delivery - Enter Your Address</Link>
            </li>
            <li>
              <Link
                to="/"
                // state={{ previousLocation: location }}
              >
                Available Farm Produce
              </Link>
            </li>
            <li>
              <Link to="/">My Account</Link>
            </li>
            <li>
              <Link to="/">Sell</Link>
            </li>
            <li>
              <Link to="/">Help</Link>
            </li>
            <li>
              <Link to="/">Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

// Define PropTypes for MobileNav component
MobileNav.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
