import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      await login(email, pass);
      history.push('/dashboard');
    } catch (e) {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  const showDescription = () => {
    return (
      <div className="discription-area">
        <h1>By signing in your account</h1>
        <ul>
          <li>You can calculate the optimal daily calorie intake for your pet</li>
          <li>You can keep track of your pet's exercise with Activity Tracker</li>
          <li>You can also track your pet's diet and calorie intake by Meal Tracker</li>
        </ul>
      </div>
    );
  };

  const showForm = () => {
    return (
      <div className="signin bg-primary-meat">
        <div className="wrapper">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit} className="basic-form">
            <div className="input-area">
              <label>Email</label>
              <input type="email" placeholder="Enter Your Email" required onChange={handleEmailChange} />
            </div>
            <div className="input-area">
              <label>Password</label>
              <input type="password" laceholder="Enter Your Password" required onChange={handlePassChange} />
            </div>
            <div className="btn-area">
              <button className="btn-contained" disabled={loading} type="submit">
                Sign in
              </button>
            </div>
          </form>

          {error && <div>{error}</div>}

          <div className="divider" />

          <div className="link-area">
            <p>
              Don't have an accout?
              <br />
              <Link to="/signup" className="link">
                Sign-Up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="signin-page">
      <div className="pc-hidden">
        <div className="intro">
          <div className="wrapper">{showDescription()}</div>
        </div>
        <div className="body">{showForm()}</div>
      </div>

      <div className="mb-hidden">
        <div className="bg-color-intro">
          <div className="wrapper">
            <div className="auth-container">
              {showDescription()}
              {showForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
