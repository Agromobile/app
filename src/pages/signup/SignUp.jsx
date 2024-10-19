import './signup.scss';
import logo from '../../assets/small-logo.png';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import Proptypes from 'prop-types';
import {
  TextInput,
  EmailInput,
  PhoneInput,
  PasswordInput,
  Loading,
} from '../../components';

// SignUpPersonal: Utility component - will contain the personal signup form when I'm done.
function SignUpPersonal({ setLoading }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  // Can user click on submit button
  const canSubmit = () =>
    firstName !== '' &&
    lastName !== '' &&
    password !== '' &&
    email !== '' &&
    phoneNo !== '';

  const handleSignUp = async (evt) => {
    evt.preventDefault();

    // TODO: Find a better way to streamline this experience and improve
    // the feedback mechanisms through the use of toasts.

    setLoading(true); // Enable loading bar
    try {
      const response = await axios.post(
        'https://api-3858.onrender.com/register',
        {
          first_name: firstName,
          last_name: lastName,
          password,
          email,
          phone_number: phoneNo,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response); // For testing purposes

      if (response.status === 200) {
        toast(response.data.message, { type: 'success' });
      } else {
        toast(response.data.message, { type: 'error' });
      }

      // // Clear input field contents
      // setFName('');
      // setLName('');
      // setEmail('');
      // setPassword('');
      // setPhoneNo('');

      // disable loading bar
      setLoading(false);

      // Redirect to the home page
      navigate('/');
    } catch (err) {
      toast(`Bad Request: ${err}`, { type: 'error' });
    }
  };

  return (
    <form
      onSubmit={
        // If can submit: signup. Else: do nothing
        canSubmit()
          ? handleSignUp
          : (evt) => {
              evt.preventDefault();
            }
      }
    >
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
        className={`sign-up-button ${canSubmit() ? 'active' : 'disabled'}`}
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

SignUpPersonal.propTypes = {
  setLoading: Proptypes.func.isRequired,
};

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

  // Trigger for the loading state
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    // Tries to get the previously stored location or simply returns us to home page
    const previousLocation = location.state.previousLocation || '/';
    navigate(previousLocation, { replace: true });
  };

  const handleTabSwitch = (evt) => {
    setActiveForm(evt.target.id);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
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
            {activeForm === 'personal' && (
              <SignUpPersonal setLoading={setLoading} />
            )}
            {activeForm === 'business' && <SignUpBusiness />}
          </div>
        </article>
      </section>
      <ToastContainer />
    </>
  );
}
