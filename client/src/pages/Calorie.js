import React, { useState } from 'react';
import Calculator from '../components/Calculator';

export default function Calorie(props) {
  const [result, setResult] = useState('');

  return (
    <>
      <h3>Upgrade to Premium</h3>
      <p>
        We recommend the best nutrition plan for your furry friend, monitor their daily routeine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Get Premium</button>

      <Calculator setResult={setResult} profile={props.petProfile} />

      {result && <h3>{result}</h3>}
    </>
  );
}
