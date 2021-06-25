import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function hanleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch {
      setError('Failed to Sign in');
    }
    setLoading(false);
  }

  return (
    <>
      <h2>Log In</h2>
      {error && <div>{error}</div>}
      <form onSubmit={hanleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>

      <div>
        New to use? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
