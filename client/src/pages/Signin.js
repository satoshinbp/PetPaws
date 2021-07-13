import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import signinImg from '../images/dog-sample.jpg'; // dammy img, to be replaced

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { login } = useAuth();

  async function hanleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <div>
      <img src={signinImg} alt="" />

      <div>
        <h2>Sign In</h2>
        <form onSubmit={hanleSubmit}>
          <label>Email</label>
          <input type="email" ref={emailRef} required />
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
          <button className="btn--sm btn-contained-light-purple" disabled={loading} type="submit">
            Sign in
          </button>
        </form>

        <div>
          Don't have an accout? <Link to="/signup">Sign-Up here</Link>
        </div>

        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
