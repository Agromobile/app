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
          setter(evt.target.value);
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
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  return (
    <form>
      <TextInput
        labelText="Text"
        value={text}
        setter={setText}
      />
      <PasswordInput
        labelText="Password"
        value={password}
        setter={setPassword}
      />
      <EmailInput
        labelText="Email"
        value={email}
        setter={setEmail}
      />
      <PhoneInput
        labelText="Phone Number (e.g +234-8038-678-894)"
        value={phoneNo}
        setter={setPhoneNo}
      />
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
