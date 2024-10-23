// produceselect.jsx
import { useEffect, useState } from 'react';
import { FaCircleArrowUp } from 'react-icons/fa6';
import axios from 'axios';
import './produceselect.scss';

const API_URL = 'https://api-3858.onrender.com/products';

const ProducePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="produce-page">
      <div className="similar-products">
        <h3>Like That? You&apos;ll Love This</h3>
        <div className="products-scroll">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <img
                src={product.product_image}
                alt={product.product_name}
              />
              <p className="product-name">{product.product_name}</p>
              <p className="product-price">₦{product.product_discount_price}</p>
              <button className="add-to-cart">Add To Cart</button>
            </div>
          ))}
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
};

export default ProducePage;
