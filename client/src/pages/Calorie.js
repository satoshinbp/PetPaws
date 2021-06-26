import React, { useState } from 'react';
import Calculator from '../components/Calculator';

export default function Calorie() {
  const [message, setMessage] = useState('');

  return (
    <>
      <h3>Upgrade to Premium</h3>
      <p>
        We recommend the best nutrition plan for your furry friend, monitor their daily routeine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Get Premium</button>

      <Calculator setMessage={setMessage} />

      {message && <h3>{message}</h3>}
    </>
  );
}
