import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import singupImg from '../images/dog-sample.jpg'; // dammy img, to be replaced

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
      history.push('/pet_profile');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  return (
    <div className="signup">
      <div className="signup_description">
        <p>By creating your free account,</p>
        <p>You will be able to :</p>
        <ul>
          <li>
            keep track of your pet's healthy routines, including their nutritional intake and physical activity levels
          </li>
          <li>Get the optimal amount of calories and activity level for your pet</li>
        </ul>
      </div>
      <div className="signup_form">
        <h2>Create your Account</h2>
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label id="name">Name</label>
          <input id="name" className="input-md" type="text" ref={nameRef} required />
          <label id="email">Email</label>
          <input type="email" className="input-md" ref={emailRef} required />
          <label id="password">Password</label>
          <input type="password" className="input-md" ref={passwordRef} required />
          <label id="password-Confirmation">passwordConfirmation</label>
          <input type="password" className="input-md" ref={passwordConfirmRef} required />
          <button disabled={loading} type="submit">
            Get Started
          </button>
        </form>
        <div className="signin-link-area">
          <p>Already have an account?</p>
          <Link to="/signin" className="signin-link-area_link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
