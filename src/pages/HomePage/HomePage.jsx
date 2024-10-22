import { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.scss';
import Product from '../../components/product/product';
import banana from '../../assets/trust-banana.png';
import veggie from '../../assets/trust-veggie.png';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPageFresh, setCurrentPageFresh] = useState(1);
  const [currentPageHerbs, setCurrentPageHerbs] = useState(1);
  const [currentPageProvision, setCurrentPageProvision] = useState(1);
  const [currentPagePopular, setCurrentPagePopular] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(7);
  const [isMobile, setIsMobile] = useState(false);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://api-3858.onrender.com/products',
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        setError('Failed to fetch products. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Check if the screen is mobile or not
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setProductsPerPage(2); // Display 2 products per page on mobile
      } else {
        setIsMobile(false);
        setProductsPerPage(7); // Display 7 products per page on larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    // Call the resize function on component mount to set the initial screen size
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current products for the page
  const paginateProducts = (categoryProducts, currentPage) => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const handleNextFresh = () => {
    setCurrentPageFresh(currentPageFresh + 1);
  };

  const handleBackFresh = () => {
    setCurrentPageFresh(currentPageFresh - 1);
  };

  const handleNextHerbs = () => {
    setCurrentPageHerbs(currentPageHerbs + 1);
  };

  const handleBackHerbs = () => {
    setCurrentPageHerbs(currentPageHerbs - 1);
  };

  const handleNextProvision = () => {
    setCurrentPageProvision(currentPageProvision + 1);
  };

  const handleBackProvision = () => {
    setCurrentPageProvision(currentPageProvision - 1);
  };

  const handleNextPopular = () => {
    setCurrentPagePopular(currentPagePopular + 1);
  };

  const handleBackPopular = () => {
    setCurrentPagePopular(currentPagePopular - 1);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter products by category before paginating
  const freshProducts = paginateProducts(
    products.filter((p) => p.category === 'fresh'),
    currentPageFresh,
  );
  const popularProducts = paginateProducts(
    products.filter((p) => p.category === 'popular'),
    currentPagePopular,
  );
  const provisionProducts = paginateProducts(
    products.filter((p) => p.category === 'provision'),
    currentPageProvision,
  );
  const herbsProducts = paginateProducts(
    products.filter((p) => p.category === 'herbs'),
    currentPageHerbs,
  );

  return (
    <>
      <div className="homepage-hero">
        <div className="hero-content-hp">
          <h1 className="hero-title-hp">
            Home of Quality and Affordable Food stuffs
          </h1>
          <button className="hero-btn-hp">SHOP NOW</button>
        </div>
      </div>
      <>
        <div className="sections-heading">
          <div className="heading-details">
            <h2 className="header-text">
              Fresh Deals: The week’s best for less
            </h2>
            <p className="view-all">View All</p>
          </div>

          {isMobile && (
            <div className="pagination-buttons">
              {currentPageFresh > 1 && (
                <button onClick={handleBackFresh}>&lt;</button>
              )}
              {currentPageFresh <
                Math.ceil(
                  products.filter((p) => p.category === 'popular').length /
                    productsPerPage,
                ) && <button onClick={handleNextFresh}>&gt;</button>}
            </div>
          )}
        </div>
        <div className="freshDeal">
          <Product products={freshProducts} />
        </div>
      </>
      <>
        <div className="sections-heading">
          <div className="heading-details">
            <h2 className="header-text">Most Popular in Dairy</h2>
            <p className="view-all">View All</p>
          </div>

          {isMobile && (
            <div className="pagination-buttons">
              {currentPagePopular > 1 && (
                <button onClick={handleBackPopular}>&lt;</button>
              )}
              {currentPagePopular <
                Math.ceil(
                  products.filter((p) => p.category === 'popular').length /
                    productsPerPage,
                ) && <button onClick={handleNextPopular}>&gt;</button>}
            </div>
          )}
        </div>
        <div className="freshDeal">
          <Product products={popularProducts} />
        </div>
      </>

      <>
        <div className="sections-heading">
          <div className="heading-details">
            <h2 className="header-text">Provisions Store</h2>
            <p className="view-all">View All</p>
          </div>

          {isMobile && (
            <div className="pagination-buttons">
              {currentPageProvision > 1 && (
                <button onClick={handleBackProvision}>&lt;</button>
              )}
              {currentPageProvision <
                Math.ceil(
                  products.filter((p) => p.category === 'popular').length /
                    productsPerPage,
                ) && <button onClick={handleNextProvision}>&gt;</button>}
            </div>
          )}
        </div>
        <div className="freshDeal">
          <Product products={provisionProducts} />
        </div>
      </>

      <>
        <div className="sections-heading">
          <h2 className="trust-text">
            <span className="trust-style">Fruits</span> and{' '}
            <span className="trust-style">Veggies</span> from <br /> Farms we
            trust
          </h2>
        </div>
        <div className="freshDeal">
          <div className="trustDisplay">
            <div className="trustSection">
              <div>
                <h3>Fruits</h3>
                <p>Apples, Avocados, Bananas, Berries, Citrus. </p>
                <p className="view-all">View All</p>
              </div>

              <img
                src={banana}
                alt="banana"
              />
            </div>
            <div className="trustSection">
              <div>
                <h3>Vegetables</h3>
                <p>Spinach, Bitter leaf, Water Leaf, Spring Onions.</p>
                <p className="view-all">View All</p>
              </div>

              <img
                src={veggie}
                alt="banana"
              />
            </div>
          </div>
        </div>
      </>
      <>
        <div className="sections-heading">
          <div className="heading-details">
            <h2 className="header-text">Fresh Herbs</h2>
            <p className="view-all">View All</p>
          </div>

          {isMobile && (
            <div className="pagination-buttons">
              {currentPageHerbs > 1 && (
                <button onClick={handleBackHerbs}>&lt;</button>
              )}
              {currentPageHerbs <
                Math.ceil(
                  products.filter((p) => p.category === 'popular').length /
                    productsPerPage,
                ) && <button onClick={handleNextHerbs}>&gt;</button>}
            </div>
          )}
        </div>
        <div className="freshDeal">
          <Product products={herbsProducts} />
        </div>
      </>

      <div className="discount">
        <h3>Get 10% OFF your first order!</h3>
      </div>
    </>
  );
}

export default HomePage;
