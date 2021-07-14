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
    <div className="signin">
      <div className="image-area">
        <img src={signinImg} alt="" />
      </div>
      <div className="signin_form">
        <h2>SIGN IN TO YOUR ACCOUNT</h2>
        <form onSubmit={hanleSubmit}>
          <label>Email</label>
          <input className="input-md" type="email" ref={emailRef} placeholder="Enter your Email" required />
          <label>Password</label>
          <input className="input-md" type="password" ref={passwordRef} placeholder="Enter your Password" required />
          <button className="btn--sm btn-contained-light-purple" disabled={loading} type="submit">
            Sign in
          </button>
        </form>
        <hr />
        <div className="signup-link-area">
          <p> Don't have an accout ?</p>
          <Link to="/signup" className="signup-link-area_link">
            Sign-Up here
          </Link>
        </div>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
