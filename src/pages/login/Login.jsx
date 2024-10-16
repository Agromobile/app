import './login.scss';
import logo from '../../assets/small-logo.png';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EmailInput, PasswordInput } from '../../components';

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

  const handleLogin = async (evt) => {
    evt.preventDefault();

    // TODO: Find a better way to streamline this experience and improve
    // the feedback mechanisms through the use of toasts.
    try {
      const response = await axios.post(
        'https://api-3858.onrender.com/login/personal',
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(response);

      if (response.status === 200) {
        alert('Login successful');
      } else {
        console.error('Incorrect password or email');
      }
    } catch (err) {
      console.error(`Bad Request ${err}`);
    }
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

        <form onSubmit={handleLogin}>
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
