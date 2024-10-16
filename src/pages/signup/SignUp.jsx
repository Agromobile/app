import './signup.scss';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';
import Proptypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
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
function TextInput({ labelText = 'Label', value, setter }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type="text"
        id="text"
        className="stretch"
        value={value}
        onChange={(evt) => {
          setter(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
      />
      <label htmlFor="text">{labelText}</label>
    </div>
  );
}

TextInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};

// PasswordInput: Utility component for handling password input
function PasswordInput({ labelText = 'Label', value, setter }) {
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
        value={value}
        onChange={(evt) => {
          setter(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
      />
      <label htmlFor="password">{labelText}</label>

      {isVisible ? (
        <AiOutlineEyeInvisible
          className="toggle-visibility"
          onClick={handleToggleVisibility}
        />
      ) : (
        <AiOutlineEye
          className="toggle-visibility"
          onClick={handleToggleVisibility}
        />
      )}
    </div>
  );
}

PasswordInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};

// EmailInput: Utility component for handling email input along with suggestions
function EmailInput({ labelText = 'Label', value, setter }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type="email"
        id="email"
        className="stretch"
        value={value}
        onChange={(evt) => {
          setter(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
      />
      <label htmlFor="email">{labelText}</label>
    </div>
  );
}

EmailInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};

// PhoneInput: Utility component for handling phone input along with autoformatting
function PhoneInput({ labelText = 'Label', value, setter }) {
  const { active, handleToggleActiveLabel } = useActiveInput();

  // TODO: We may need to reformat how the phone number is actually stored in state
  // Depending on the needs of the backend API.
  const handlePhoneNumberUpdate = (value) => {
    setter(value);
  };

  return (
    <div className={`input ${active ? 'active' : ''}`}>
      {/**I used PatternFormat in the code below because it gave me a
      simpler way to implement automatic formatting for the phone number
      as the user types.*/}
      <PatternFormat
        type="tel"
        id="phone"
        className="stretch"
        value={value}
        onChange={(evt) => {
          console.log(value);
          handlePhoneNumberUpdate(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
        format="+234 - #### - ### - ###"
        mask="#"
      />
      <label
        htmlFor="phone"
        className="toggle-phone-number"
        data-alt-name="Phone Number"
      >
        {labelText}
      </label>
    </div>
  );
}

PhoneInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};

// TODO: SignUpPersonal: Utility component - will contain the personal signup form when I'm done.
function SignUpPersonal() {
  const location = useLocation();

  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  return (
    <form>
      <div className="name-fields">
        <TextInput
          labelText="first name"
          value={firstName}
          setter={setFName}
        />
        <TextInput
          labelText="last name"
          value={lastName}
          setter={setLName}
        />
      </div>
      <PasswordInput
        labelText="password"
        value={password}
        setter={setPassword}
      />
      <EmailInput
        labelText="email"
        value={email}
        setter={setEmail}
      />
      <PhoneInput
        labelText="phone Number (+234-8038-678-894)"
        value={phoneNo}
        setter={setPhoneNo}
      />
      <div className="privacy-message">
        By registering a personal account, you agree to Agromobile’s{' '}
        <Link to="#">privacy policy</Link> and{' '}
        <Link to="#">customer agreement</Link>
      </div>
      <button
        type="submit"
        className="sign-up-button"
      >
        Sign Up
      </button>

      <p className="alt-demarcator">
        <span>or continue with</span>
      </p>

      <div className="social-buttons">
        <button>
          <FcGoogle />
          Google
        </button>

        <button>
          <FaApple />
          Apple
        </button>

        <button>
          <FaFacebook />
          Facebook
        </button>
      </div>

      <p className="signin-cta">
        Already have an account ?{' '}
        <Link
          to="/login"
          state={{ previousLocation: location.state?.previousLocation }}
        >
          Sign In
        </Link>
      </p>
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
  const location = useLocation();
  const navigate = useNavigate();

  const handleModalClose = () => {
    // Tries to get the previously stored location or simply returns us to home page
    const previousLocation = location.state.previousLocation || '/';
    navigate(previousLocation);
  };

  const handleTabSwitch = (evt) => {
    setActiveForm(evt.target.id);
  };

  return (
    <section
      className="signup-page"
      onClick={handleModalClose}
    >
      <article
        onClick={
          // stop click event from bubbling down to form
          (evt) => evt.stopPropagation()
        }
      >
        {/* Branding elements */}
        <div className="heading">
          <img
            src={logo}
            alt="agromobile small logo"
          />
          <span
            className="close-form"
            onClick={handleModalClose}
          >
            &times;
          </span>
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
