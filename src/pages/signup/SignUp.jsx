import './signup.scss';
import { useState } from 'react';
import logo from '../../assets/small-logo.png';

function SignUpPersonal() {
  return (
    <form>
      <div>
        <input
          type="text"
          id="email"
          placeholder="Enter personal email address"
        />
      </div>
    </form>
  );
}

function SignUpBusiness() {
  return (
    <form>
      <div>
        <input
          type="text"
          id="email"
          placeholder="Enter business email address"
        />
      </div>
    </form>
  );
}

export default function SignUp() {
  const [activeForm, setActiveForm] = useState('personal');

  const handleTabSwitch = (evt) => {
    console.log(evt.target.id);
    setActiveForm(evt.target.id);
  };

  return (
    <section className="signup-page">
      <article>
        {/* Branding elements */}
        <div className="heading">
          <img
            src={logo}
            alt="agromobile small logo"
          />
          <span className="close-form">&times;</span>
        </div>

        {/* Call to action */}
        <h3>Create an account</h3>

        {/* Tab buttons: click on them to switch tabs */}
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeForm === 'personal' ? 'active' : ''}`}
            id="personal"
            onClick={handleTabSwitch}
          >
            Personal
          </button>
          <button
            className={`tab-button ${activeForm === 'business' ? 'active' : ''}`}
            id="business"
            onClick={handleTabSwitch}
          >
            Business
          </button>
        </div>

        {/* Tab body: where the switch is to occur */}
        <div className="tab-forms">
          {activeForm === 'personal' && <SignUpPersonal />}
          {activeForm === 'business' && <SignUpBusiness />}
        </div>
      </article>
    </section>
  );
}
