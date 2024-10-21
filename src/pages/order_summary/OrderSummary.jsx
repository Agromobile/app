import './order_summary.scss';
import { Link } from 'react-router-dom';
import { PiTrashThin } from 'react-icons/pi';
import { TfiPlus, TfiMinus } from 'react-icons/tfi';

export default function OrderSummary() {
  //FIXME: For Development Purposes. Will be removed when we begin fetching data from the API
  const cartItems = [
    {
      id: 1,
      name: 'Cosmic Crisp Apple',
      price: 4000,
      quantity: 1,
      imageURL: 'https://pngfre.com/wp-content/uploads/apple-53.png',
    },
    {
      id: 2,
      name: 'Crispier Apple',
      price: 4000,
      quantity: 1,
      imageURL: 'https://pngfre.com/wp-content/uploads/apple-53.png',
    },
  ];
  return (
    <main className="summary-page">
      <header className="discount-header">
        <span>
          <strong>Get 10% OFF</strong> your first order!
        </span>
      </header>
      <section className="summary">
        <article>
          <div className="continue-shopping">
            <Link to="#">Continue Shopping</Link>
          </div>
          <div className="cart-contents">
            <h3>Your Cart Summary (2)</h3>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="content card"
              >
                <img
                  src={item.imageURL}
                  alt="Image of food item"
                  className="image"
                />
                <div className="details">
                  <span className="item-name">{item.name}</span>
                  <div>
                    <span className="item-price">₦{item.price}</span>
                    <button className="delete-item">
                      <PiTrashThin />
                    </button>
                    <div className="quantity-field">
                      <TfiMinus className="controls" />
                      <span>{item.quantity}</span>
                      <TfiPlus className="controls active" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="content card">
              <div className="image" />
              <div className="details">
                <span className="item-name">Delivery Fees</span>
                <div>
                  <span className="item-price">₦1000</span>
                </div>
              </div>
            </div>
            {/* Total Amount */}
            <div className="total-field">
              <div className="details">
                <span>Total</span>
                <span>₦8000</span>
              </div>
            </div>
          </div>
        </article>
        <aside>
          <p>Contains the item positioned to the right</p>
        </aside>
        <div className="related-products">
          <p>Carousel of related products to also add to your cart.</p>
        </div>
      </section>
    </main>
  );
}
