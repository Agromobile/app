import './signup.scss';
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import Proptypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logo from '../../assets/small-logo.png';

// Utility Hook: used to handle active state for inputs
function useActiveInput() {
  const [active, setActive] = useState(false);

  const handleToggleActiveLabel = (evt) => {
    if (evt.target.value === '') {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return { active, handleToggleActiveLabel };
}

// TextInput: Utility component for handling text input
function TextInput({ labelText = 'Label' }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type="text"
        id="text"
        className="stretch"
        onChange={handleToggleActiveLabel}
      />
      <label htmlFor="text">{labelText}</label>
    </div>
  );
}

TextInput.propTypes = {
  labelText: Proptypes.string.isRequired,
};

// PasswordInput: Utility component for handling password input
function PasswordInput({ labelText = 'Label' }) {
  const [isVisible, setIsVisible] = useState(false);
  const { active, handleToggleActiveLabel } = useActiveInput();

  const handleToggleVisibility = (evt) => {
    evt.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type={`${isVisible ? 'text' : 'password'}`}
        id="password"
        onChange={handleToggleActiveLabel}
      />
      <label htmlFor="password">{labelText}</label>
      <button
        className="toggle-visibility"
        onClick={handleToggleVisibility}
      >
        {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  labelText: Proptypes.string.isRequired,
};

// EmailInput: Utility component for handling email input along with suggestions
function EmailInput({ labelText = 'Label' }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type="email"
        id="email"
        className="stretch"
        onChange={handleToggleActiveLabel}
      />
      <label htmlFor="email">{labelText}</label>
    </div>
  );
}

EmailInput.propTypes = {
  labelText: Proptypes.string.isRequired,
};

// PhoneInput: Utility component for handling phone input along with autoformatting
function PhoneInput({ labelText = 'Label' }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      {/**I used PatternFormat in the code below because it gave me a
      simpler way to implement automatic formatting for the phone number
      as the user types.*/}
      <PatternFormat
        type="tel"
        id="phone"
        className="stretch"
        onChange={handleToggleActiveLabel}
        format="+234 - #### - ### - ###"
        mask="#"
      />
      <label htmlFor="phone">{labelText}</label>
    </div>
  );
}

PhoneInput.propTypes = {
  labelText: Proptypes.string.isRequired,
};

// TODO: SignUpPersonal: Utility component - will contain the personal signup form when I'm done.
function SignUpPersonal() {
  return (
    <form>
      <TextInput />
      <PasswordInput />
      <EmailInput />
      <PhoneInput />
    </form>
  );
}

// TODO: SignUpBusiness: Utility component - will contain the business signup form when I'm done
function SignUpBusiness() {
  return (
    <form>
      <TextInput />
    </form>
  );
}

// SignUp: Base SignUp form - contains the things shared by personal & business signup forms
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
