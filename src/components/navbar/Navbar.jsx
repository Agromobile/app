import './navbar.scss';
import { IoCartOutline } from 'react-icons/io5';
import { FaBars } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoMobile from '../../assets/small-logo.png';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  //const navigate = useNavigate();

  //handle login
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'https://api-3858.onrender.com/login/personal',
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      setMessage('Login successful!');
      // navigate('/Dashboard');
    } else {
      setMessage('Incorrect password or username');
    }
  } catch (error) {
    console.error('Bad request', error);
  }
};

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
            <div
              data-bs-toggle={'modal'}
              data-bs-target={'#myModal'}
              className="me-2"
            >
              Log In
            </div>

            <div
              className="modal fade"
              id="myModal"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header mt-3 mb-3 ms-2 me-2">
                    <img
                      src={logoMobile}
                      alt="logo"
                      className="modal-title"
                    />{' '}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss={'modal'}
                    ></button>
                  </div>
                  <div className="modal-body text-center">
                    <strong>Welcome Back!</strong> <br />
                    <b className="text-success">Sign in</b>
                    <form
                      className="ms-3 me-3"
                      onSubmit={handleLogin}
                    >
                      <div className="form-floating mb-3 mt-3">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="form-control rounded-pill"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ backgroundColor: '#dedede' }}
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                      <div className="form-floating mb-3 mt-3 border-1">
                        <input
                          type="password"
                          className="form-control rounded-pill"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ backgroundColor: '#dedede' }}
                          name="pwd"
                        />
                        <label htmlFor="pwd">Password</label>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <input type="checkbox" />
                          <span className="ms-2 mt-1">stay signed in</span>
                        </div>
                        <p className="text-success">Reset Password</p>
                      </div>
                      <button
                        className="btn rounded-pill w-100 mt-3"
                        type="submit"
                        style={{ backgroundColor: '#ccc' }}
                      >
                        Sign in
                      </button>
                      <p className="mt-2">
                        Dont have an account?
                        <Link to={'/signup'}>
                          {' '}
                          <span className="text-success">Sign Up</span>{' '}
                        </Link>
                      </p>
                      <p>{message}</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

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
