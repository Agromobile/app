import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './productdetail.scss';
import '../../components/product/product.scss'; // Product styles
import '../../components/product/product.jsx'; // Reuse Product component
import { FaCircleArrowUp } from 'react-icons/fa6';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Current product state
  const [relatedProducts, setRelatedProducts] = useState([]); // Related products state
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation

  // Define API endpoints for the three categories
  const CATEGORY_ENDPOINTS = {
    fresh: 'https://api-3858.onrender.com/fresh/deal',
    popular: 'https://api-3858.onrender.com/popular',
    provision: 'https://api-3858.onrender.com/provision',
  };

  // Fetch product details and related products based on category
  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        // Fetch product details by ID
        const productResponse = await axios.get(
          `https://api-3858.onrender.com/product/details/${id}`,
        );
        const productData = productResponse.data;
        setProduct(productData);

        // Determine the category of the current product
        const category = productData.category.toLowerCase();

        // Fetch all products from the matching category endpoint
        const relatedResponse = await axios.get(CATEGORY_ENDPOINTS[category]);
        const categoryProducts = relatedResponse.data;

        // Filter out the current product from the related products
        const filteredProducts = categoryProducts.filter(
          (p) => p.id !== productData.id,
        );
        setRelatedProducts(filteredProducts);
      } catch (error) {
        setError('Failed to load product or related products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleProductClick = (productid) => {
    navigate(`/product/${productid}`); // Navigate to the selected product's page
  };

  return (
    <div className="product-select-page">
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {!product && !loading && !error && <div>No product found</div>}

      {product && (
        <div className="product-details">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="quantity-section">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <div className="related-products">
        <h3>Like That? You&apos;ll Love This</h3>
        <div className="related-products-list">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <div
                key={product.id}
                className="product-card" // Use same styling as product
                onClick={() => handleProductClick(product.id)} // Navigate on click
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>

      <button
        className="top-btn"
        onClick={() => window.scrollTo(0, 0)}
      >
        Back to top
        <FaCircleArrowUp
          size={35}
          fill="#4BD67A"
        />
      </button>
    </div>
  );
};

export default ProductDetail;
