import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function hanleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }
  return (
    <>
      <h2 className="text-center mb-4">Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={hanleSubmit}>
        <label id="name">Name</label>
        <input id="name" type="text" ref={nameRef} required />
        <label id="email">Email</label>
        <input type="email" ref={emailRef} required />
        <label id="password">Password</label>
        <input type="password" ref={passwordRef} required />
        <label id="password-Confirmation">passwordConfirmation</label>
        <input type="password" ref={passwordConfirmRef} required />
        <button disabled={loading} className="w-100" type="submit">
          Sign Up
        </button>
      </form>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
