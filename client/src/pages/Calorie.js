import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Calculator from '../components/Calculator';

export default function Calorie() {
  const [result, setResult] = useState('');
  // const [profile, setProfile] = useState(null);
  const [profile, setProfile] = useState({
    is_dog: 1,
    breed: 'Shiba Inu',
    weight: 10,
    is_spayed: 1,
    birthday: '2020-01-01',
    activityLevel: 1,
    bodyCondition: 1,
  }); // This is dammy date, to be removed once API is valid

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/pet/get`) // This is API not valid yet
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h3>Upgrade to Premium</h3>
      <p>
        We recommend the best nutrition plan for your furry friend, monitor their daily routeine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Get Premium</button>

      <Calculator setResult={setResult} profile={profile} />

      {result && <h3>{result}</h3>}
    </>
  );
}
