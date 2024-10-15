import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import logo from '../../assets/small-logo.png';
import './Footer.scss';
export default function Footer() {
  return (
    <div className="container">
      <div className="footer-container">
        <div className="wrapper1">
          <div className="logo-box">
            <img
              src={logo}
              alt="Agromobile logo"
              className="logo"
            />
          </div>
          <div className="writing">
            <p>
              Agromobile is a digital platform designed to revolutionize the
              agricultural supply chain by connecting farmers directly to
              buyers, ensuring fair prices and reducing wastage.
            </p>
          </div>

          {/* Social media icons section */}
          <div className="socials">
            <p>Follow us:</p>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on Facebook"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on Instagram"
              >
                <FaInstagram size={32} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on LinkedIn"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on X formerly (Twitter)"
              >
                <FaTwitter size={32} />
              </a>
            </div>
          </div>
        </div>

        <div className="wrapper2">
          <p>Quick Links</p>
          <Link to="/about-us">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/career">Career</Link>
          <Link to="/suppliers">Suppliers</Link>
          <Link to="/food-safety">Food Safety</Link>
          <Link to="/buy">Buy</Link>
          <Link to="/sell">Sell</Link>
        </div>

        <div className="wrapper2">
          <p>Help</p>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/delivery-information">Delivery Information</Link>
          <Link to="/support">Support</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/partners">Partners</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>

        <div className="wrapper2">
          <p>Make Money With Agromobile</p>
          <Link to="/sell-on-agromobile">Sell on Agromobile</Link>
          <Link to="/earn-on-commission-based">Earn on Commission based</Link>
          <Link to="/become-a-sales-consultant">Become a Sales Consultant</Link>
          <Link to="/become-a-logistics-service-partner">
            Become a Logistics Service Partner
          </Link>
        </div>

        <div className="wrapper2">
          <p>Tools and Apps</p>
          <Link to="/developers">Developers</Link>
          <Link to="/security-center">Security Center</Link>
          <Link to="/site-map">Site Map</Link>
        </div>
      </div>
      <div className="copyright">
        <p>Agromobile 2024, All rights reserved</p>
      </div>
    </div>
  );
}
