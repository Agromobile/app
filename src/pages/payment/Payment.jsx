import './payment.scss';
import logo from '../../assets/iconText.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import { BsPhone } from 'react-icons/bs';
import { PiBankLight } from 'react-icons/pi';
import { RiVisaLine, RiMastercardFill } from 'react-icons/ri';

export default function Payment() {
  const [orderDetailsActive, setDetailsActive] = useState(false);

  // For controlling the display of the payment option fields
  const [payOption, setPayOption] = useState(null);

  const handleChangePayOption = (value) => {
    setPayOption(value);
  };

  return (
    <main>
      {/* Navbar visible on payment page */}
      <nav className="payment-nav">
        <img
          src={logo}
          alt="agromobile icon text logo"
        />
      </nav>
      <article className="payment-main">
        {/* Order Details Summary & Details Section*/}
        <section>
          <div className="header">
            <span>order summary</span>
            <button onClick={() => setDetailsActive(!orderDetailsActive)}>
              {orderDetailsActive ? (
                <span>hide details</span>
              ) : (
                <span>see details</span>
              )}
              <IoChevronForward />
            </button>
          </div>
          <div className="body">
            <div className="summary">
              <span>Total payment</span>
              <span>₦8000</span>
            </div>
            {orderDetailsActive && (
              <div className="details">
                {' '}
                <span>
                  This is supposed to contain the details of the order
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Payment Options */}
        <section>
          <div className="header">
            <span>choose a new payment method</span>
            {/* <button onClick={() => setDetailsActive(!orderDetailsActive)}>
              {orderDetailsActive ? (
                <span>hide details</span>
              ) : (
                <span>see details</span>
              )}
              <IoChevronForward />
            </button> */}
          </div>
          {/* Pay with USSD or bank transfer */}
          <div className="body">
            <div className="summary">
              <div>
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={payOption === 'option1'}
                  onChange={() => {
                    handleChangePayOption('option1');
                  }}
                />
                <label htmlFor="option1">Pay with USSD or Bank Transfer</label>
              </div>
              <div>
                <BsPhone />
                <PiBankLight />
              </div>
            </div>
            {payOption === 'option1' && (
              <div className="details">
                {' '}
                <span>
                  This is supposed to contain payment selection information
                </span>
              </div>
            )}
          </div>
          {/* Pay with Debit Card */}
          <div className="body">
            <div className="summary">
              <div>
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={payOption === 'option2'}
                  onChange={() => {
                    handleChangePayOption('option2');
                  }}
                />
                <label htmlFor="option1">Pay with Mastercard or Visa</label>
              </div>
              <div>
                <RiVisaLine />
                <RiMastercardFill />
              </div>
            </div>
            {payOption === 'option2' && (
              <div className="details">
                {' '}
                <span>
                  This is supposed to contain payment selection information
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Pay Button */}
        <section>
          <button className="pay-button">Pay Now: ₦8000</button>

          <p>
            <strong>Please note:</strong> we will never ask you for your
            password, PIN, CVV or full card details over the phone or via email.{' '}
          </p>

          <p>
            Need Help ? <Link to="#">contact us</Link>
          </p>
        </section>

        {/* Go Back To Home Page */}
        <Link
          to="/"
          className="go-back"
          replace={true}
        >
          Back to home
        </Link>
      </article>
    </main>
  );
}
