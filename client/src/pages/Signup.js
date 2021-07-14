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
      <div className="signup_description"></div>
      <div className="signup_form">
        <h2>Create your Free Account</h2>
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label id="name">Name</label>
          <input id="name" type="text" ref={nameRef} required />
          <label id="email">Email</label>
          <input type="email" ref={emailRef} required />
          <label id="password">Password</label>
          <input type="password" ref={passwordRef} required />
          <label id="password-Confirmation">passwordConfirmation</label>
          <input type="password" ref={passwordConfirmRef} required />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>

        <div>
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
