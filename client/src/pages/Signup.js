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
      <div className="signup_wrapper">
        <div className="signup_description-area">
          <div className="signup_description-area_text">
            <h3>By creating your account,</h3>
            <p>　You will be able to :</p>
            <ul>
              <li>
                ・<div className="left-align">You can calculate the optimal daily calorie intake for your pet</div>
              </li>
              <li>
                ・<div className="left-align"> You can keep track of your pet's exercise with Activity Tracker</div>
              </li>
              <li>
                ・
                <div className="left-align">You can also track your pet's diet and calorie intake by Meal Tracker</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="signup_form">
          <h2>Sign UP</h2>
          {error && <div>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label id="name">Name</label>
            <input id="name" className="input-md" type="text" ref={nameRef} required />
            <label id="email">Email</label>
            <input type="email" className="input-md" ref={emailRef} required />
            <label id="password">Password</label>
            <input type="password" className="input-md" ref={passwordRef} required />
            <label id="password-Confirmation">Password Confirmation</label>
            <input type="password" className="input-md" ref={passwordConfirmRef} required />
            <button className="btn-contained" disabled={loading} type="submit">
              Get Started
            </button>
          </form>
          <div className="signin-link-area">
            <p>
              Already have an account?　
              <Link to="/signin" className="signin-link-area_link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
