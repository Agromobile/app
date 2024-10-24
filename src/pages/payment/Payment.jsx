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

  // Creates an array of valid years and months starting from the current year and month respectively
  const years = (() => {
    const year = new Date().getFullYear();
    const years = [];

    for (let i = 0; i < 11; i++) {
      years.push(year + i);
    }

    return years;
  })();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
                <div>
                  <input
                    type="radio"
                    id="bt"
                    checked={payOption === 'option1'}
                  />
                  <label htmlFor="bt">Bank Transfer</label>
                </div>
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
                <div className="card-details">
                  {/* Card Number */}
                  <input
                    type="number"
                    placeholder="Card Number"
                  />

                  {/* Month of expiry */}
                  <input
                    type="text"
                    placeholder="Month"
                    list="months"
                  />
                  <datalist id="months">
                    {months.map((month, idx) => (
                      <option
                        key={idx}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}
                  </datalist>

                  {/* Year of expiry */}
                  <input
                    type="text"
                    list="years"
                    placeholder="Year"
                  />
                  <datalist id="years">
                    {years.map((year, idx) => (
                      <option
                        key={idx}
                        value={year}
                      >
                        {year}
                      </option>
                    ))}
                  </datalist>

                  {/* CVV - Number at the back of card */}
                  <input
                    type="number"
                    placeholder="CVV"
                  />
                </div>
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
