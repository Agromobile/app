import './Home.scss';
import { useState, useEffect, useCallback } from 'react';
import {
  FaCircleArrowLeft,
  FaCircleArrowRight,
  FaCircleArrowUp,
} from 'react-icons/fa6';
import arcImg from '../../assets/Image-two.png';
import img3 from '../../assets/Image-three.png';
import img4 from '../../assets/Image-four.png';
import img5 from '../../assets/Image-five.png';
import promoImg from '../../assets/Image-six.png';
import deliveryImg from '../../assets/Image-seven .png';
import img8 from '../../assets/Image-eight.png';
import img9 from '../../assets/Image-nine.png';
import img10 from '../../assets/Image-ten.png';
import img11 from '../../assets/Image-eleven.png';
import img12 from '../../assets/Image-twelve.png';

import carousel1 from '../../assets/carousel1.png';
import carousel2 from '../../assets/carousel1.png';
import carousel3 from '../../assets/carousel1.png';

export default function Home() {
  const carouselData = [
    {
      image: carousel1,
      text: '"Agromobile has transformed the way I shop for agricultural products. The platform is user-friendly, and the quality of the produce is exceptional. Its a game-changer for my business!"',
      author: 'Tadeola',
      location: 'Lagos, Nigeria',
    },
    {
      image: carousel2,
      text: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s"',
      author: 'Sophia',
      location: 'Lagos, Nigeria',
    },
    {
      image: carousel3,
      text: '"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."',
      author: 'Moses',
      location: 'Lagos, Nigeria',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    // Query all sections with the class 'animate-on-scroll'
    const sections = document.querySelectorAll('.animate-on-scroll');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add the animation class when section is in view
              entry.target.classList.add('fade-up');
            } else {
              // Optionally, remove the class when it's out of view
              entry.target.classList.remove('fade-up');
            }
          });
        },
        {
          root: null, // Viewport
          threshold: 0.1, // Trigger when 10% is visible
        },
      );

      // Observe each section
      sections.forEach((section) => {
        observer.observe(section);
      });

      // Cleanup observer on component unmount
      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(
      currentSlide === carouselData.length - 1 ? 0 : currentSlide + 1,
    );
  }, [currentSlide, carouselData.length]);

  const handlePrevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? carouselData.length - 1 : currentSlide - 1,
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(slideInterval); // Clean up the interval
  }, [handleNextSlide]);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Freshness at Your Fingertips...</h1>
          <p>
            Enjoy the convenience of online shopping and the assurance of fresh,
            top-quality products every time. Experience AgroMobile today!
          </p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>
      <div className="arc-image">
        <img
          src={arcImg}
          alt="Below Image"
        />
        <p>
          Leveraging Artificial Intelligence (AI) to enhance user experience and
          streamline operations
        </p>
      </div>

      {/* service Section */}
      <div className="service-section animate-on-scroll">
        <h2>Reliable Farm Produce Delivery, Right to Your Doorstep</h2>
        <div className="service-cards">
          <div className="service-card">
            <img
              src={img3}
              alt="Place your order"
            />
            <h3>Place your order</h3>
            <p>
              Browse AgroMobile&apos;s extensive selection of fresh foodstuffs
              and easily place your order online.
            </p>
          </div>
          <div className="service-card">
            <img
              src={img4}
              alt="Order processing"
            />
            <h3>Order processing</h3>
            <p>
              Our team swiftly processes your order, ensuring quality and
              freshness for every item.
            </p>
          </div>
          <div className="service-card">
            <img
              src={img5}
              alt="Doorstep delivery"
            />
            <h3>Doorstep delivery</h3>
            <p>
              Enjoy prompt delivery of your selected foodstuffs right to your
              doorstep, hassle-free.
            </p>
          </div>
        </div>
      </div>

      {/* promo Section */}
      <div className="promo-section">
        <div className="promo-image">
          <img
            src={promoImg}
            alt="Fresh produce"
          />
        </div>
        <div className="promo-content">
          <h3>What We Promise?</h3>
          <p>Fresh, Convenience and Quality in every order</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      <div className="promo-delivery">
        <div className="promo-delivery-content">
          <h3>Skip The Delivery Fees</h3>
          <p>
            Our new customers will be getting free delivery on us for a month,
            including some good discounts on every fresh produce they buy.
          </p>
          <button className="signup-now-btn">Sign Up Now</button>
        </div>
        <div className="promo-delivery-image">
          <img
            src={deliveryImg}
            alt="AgroMobile delivery"
          />
        </div>
      </div>

      {/* locals Section */}
      <div className="locals-section animate-on-scroll">
        <h2>Where The Locals Dine Best</h2>
        <div className="locals-cards">
          <div className="locals-card">
            <img
              src={img8}
              alt="food stuffs"
            />
          </div>
          <div className="locals-card">
            <img
              src={img9}
              alt="fruits"
            />
          </div>
          <div className="locals-card">
            <img
              src={img10}
              alt="woman cutting fish"
            />
          </div>
        </div>
        <p>
          We take pride in partnering with numerous local farms and artisans who
          supply us with an amazing variety of food throughout the year
        </p>
        <button className="partner-btn">Partner With Us</button>
      </div>

      {/* Nutrition Section */}
      <div className="nutrition-section">
        <div className="nutrition-image">
          <img
            src={img11}
            alt="Fresh produce"
          />
        </div>
        <div className="nutrition-content">
          <h3>Nutrition Tips</h3>
          <p>
            Our Nutrition Tips offer expert advice to help you make informed
            food choices, enjoy balanced meals, and boost your well-being.
            Discover delicious recipes and wellness tips for a healthier
            lifestyle with every bite.
          </p>
          <button className="explore-btn">Explore</button>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="carousel-section">
        <h2>Testimonials</h2>
        <img
          className="blob"
          src={img12}
          alt="blob"
        />
        <button
          className="carousel-control prev"
          onClick={handlePrevSlide}
        >
          <FaCircleArrowLeft
            size={35}
            fill="#4BD67A"
          />
        </button>

        <div>
          <div className="carousel">
            <img
              src={carouselData[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
            />
            <div className="carousel-info">
              <p className="carousel-text">{carouselData[currentSlide].text}</p>
              <p className="carousel-author">
                {carouselData[currentSlide].author}
              </p>
              <p className="carousel-location">
                {carouselData[currentSlide].location}
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control next"
          onClick={handleNextSlide}
        >
          <FaCircleArrowRight
            fill="#4BD67A"
            size={35}
          />
        </button>
      </div>

      {/* Newsletter section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <h2>Subscribe To Our Newsletter</h2>
          <p>
            Subscribe to our newsletter to get updates on our latest offers!
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button className="subscribe-btn">Subscribe</button>
          </div>
          <div className="newsletter-privacy">
            <input
              type="checkbox"
              id="agree"
              name="agree"
            />
            <label htmlFor="agree">
              I agree to Agromobile&apos;s Privacy and Cookie Policy. You can
              unsubscribe from the newsletter at any time.
            </label>
          </div>
          <a
            href="#"
            className="unsubscribe-link"
          >
            Unsubscribe
          </a>
        </div>
      </div>

      <button className="top-btn">
        Back to top
        <FaCircleArrowUp
          size={35}
          fill="#4BD67A"
        />
      </button>
    </div>
  );
}
