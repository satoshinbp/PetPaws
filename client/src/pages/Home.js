import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Members from '../components/Members';

function Home() {
  const nameRef = useRef();
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
      <h2 className="text-center mb-4">Log In</h2>
      {error && <div>{error}</div>}
      <form onSubmit={hanleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <button disabled={loading} className="w-100" type="submit">
          Log In
        </button>
      </form>

      <div className="w-100 text-center mt-2">
        New to use? <Link to="/signup">Sign Up</Link>
      </div>
      <h2
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          backgroundColor: '#F0F0F0',
        }}
      >
        Welcome to Pet Paws
      </h2>
      <div>Our services</div>
      <ul>
        <li>Tracker</li>
        <li>Nutrition Calculator</li>
        <li>Finding Pet Store and Vets</li>
      </ul>
      <Members />
    </>
  );
}

export default Home;
