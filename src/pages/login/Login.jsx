import './login.scss';
import logo from '../../assets/small-logo.png';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Proptypes from 'prop-types';

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

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleModalClose = () => {
    // Tries to get the previously stored location or simply returns us to home page
    const previousLocation = location.state.previousLocation || '/';
    navigate(previousLocation);
  };

  return (
    <section
      className="login-page"
      onClick={handleModalClose}
    >
      <article onClick={(evt) => evt.stopPropagation()}>
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
        <h3>Welcome Back</h3>

        <form>
          <EmailInput
            labelText="Email"
            value={email}
            setter={setEmail}
          />
          <PasswordInput
            labelText="Password"
            value={password}
            setter={setPassword}
          />
          <div className="auth-options">
            <span>
              <input
                type="checkbox"
                id="stay-signed-in"
              />
              <label htmlFor="stay-signed-in">Stay Signed In</label>
            </span>

            <Link to="#">Reset Password</Link>
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Sign Up
          </button>

          <p className="signup-cta">
            Don&#39;t have an account ?{' '}
            <Link
              to="/signup"
              state={{ previousLocation: location.state?.previousLocation }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
}
