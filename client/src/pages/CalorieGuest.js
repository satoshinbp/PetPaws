import React, { useState } from 'react';
import Calculator from '../components/Calculator';

export default function Calorie() {
  const [message, setMessage] = useState('');

  return (
    <>
      <h3>Welcome to Pet Paws</h3>
      <p>
        We recommend the best nutrition plan for your furry friend, monitor their daily routeine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Create free account</button>

      <Calculator setMessage={setMessage} />

      {message && (
        <>
          <h3>The calculation is done!</h3>
          <h4>Your pet is overweight</h4>
          <p>Emter your email so we could send you the results!</p>

          <button>Send</button>
        </>
      )}
    </>
  );
}
