import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const history = useHistory();
  const { signup } = useAuth();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);
  const handlePassConfirmChange = (e) => setPassConfirm(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== passConfirm) {
      return setError('passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, pass, name);
      history.push('/pet_profile');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  const showDescription = () => {
    return (
      <div className="discription-area">
        <h1>By creating your account</h1>
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
      <div className="signup bg-primary-meat">
        <div className="wrapper">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit} className="basic-form">
            <div className="input-area">
              <label id="name">Name</label>
              <input id="name" type="text" required onChange={handleNameChange} />
            </div>
            <div className="input-area">
              <label id="email">Email</label>
              <input type="email" required onChange={handleEmailChange} />
            </div>
            <div className="input-area">
              <label id="password">Password</label>
              <input type="password" required onChange={handlePassChange} />
            </div>
            <div className="input-area">
              <label id="password-Confirmation">Password Confirmation</label>
              <input type="password" required onChange={handlePassConfirmChange} />
            </div>
            <div className="btn-area">
              <button className="btn-contained" disabled={loading} type="submit">
                Get Started
              </button>
            </div>
          </form>

          {error && <div>{error}</div>}

          <div className="divider" />

          <div className="link-area">
            <p>
              Already have an account?
              <br />
              <Link to="/signin" className="link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="signup-page">
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
