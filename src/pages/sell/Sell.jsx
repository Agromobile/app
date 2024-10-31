import './sell.scss';
import pic1 from '../../assets/pic-1.png';
import pic2 from '../../assets/pic-2.png';
import pic3 from '../../assets/pic-3.png';

const SellPage = () => {
  return (
    <div className="sell-page">
      <header className="hero-section">
        <div className="hero-text">Start Selling</div>
        <img
          className="hero-image"
          src={pic1}
          alt="Market Scene"
        />
      </header>

      <section className="why-sell">
        <h2>Why Sell On Agromobile</h2>
        <div className="why-sell-cards">
          <div className="card">
            <img
              src={pic1}
              alt="Reach"
            />
            <h3>Reach</h3>
            <p>
              Expand your customer base by connecting with buyers across diverse
              locations.
            </p>
          </div>
          <div className="card">
            <img
              src={pic2}
              alt="Growth"
            />
            <h3>Growth</h3>
            <p>
              Boost your business potential with increased sales and new market
              opportunities.
            </p>
          </div>
          <div className="card">
            <img
              src={pic3}
              alt="Convenience"
            />
            <h3>Convenience</h3>
            <p>
              Enjoy seamless transactions and easy access to buyers with a
              user-friendly platform.
            </p>
          </div>
        </div>
      </section>

      <section className="steps">
        <h2>Steps To Start Selling On Agromobile</h2>
        <div className="steps-cards">
          <div className="step-card">
            <img
              src={pic1}
              alt="Step 1"
            />
            <h4>Step 1</h4>
            <p>Fill the registration form and submit the required documents.</p>
            <ul>
              <li>Business registration details</li>
              <li>Bank account details</li>
            </ul>
          </div>
          <div className="step-card">
            <img
              src={pic2}
              alt="Step 2"
            />
            <h4>Step 2</h4>
            <p>Complete the free training and earn your seller badge.</p>
          </div>
          <div className="step-card">
            <img
              src={pic3}
              alt="Step 3"
            />
            <h4>Step 3</h4>
            <p>
              List your products and upload your sales profile to start selling!
            </p>
          </div>
        </div>
      </section>

      <button className="start-selling-button">Start Selling</button>
    </div>
  );
};

export default SellPage;
