import PropTypes from 'prop-types'; // Import PropTypes
import './product.scss';

function Product({ products }) {
  return (
    <div className="product-container">
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
          >
            <div className="product_pics">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="product-image"
              />
            </div>

            <div className="product_details">
              <h2>{product.product_name}</h2>
              <p className="product-price">
                ₦{product.product_discount_price}
                {product.product_price && (
                  <span className="product-old-price">
                    ₦{product.product_price}
                  </span>
                )}
              </p>
            </div>
            <button className="add-to-cart-btn">Add To Cart +</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Define PropTypes
Product.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Product;
