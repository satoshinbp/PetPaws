import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Calculator from '../components/Calculator';

export default function Calorie() {
  const { currentUser } = useAuth();

  const [message, setMessage] = useState('');
  const [petProfile, setPetProfile] = useState('');

  useEffect(() => {
    console.log(currentUser.uid);
    Axios.get(`http://localhost:3001/api/pet/get/${currentUser.uid}`)
      .then((res) => {
        console.log(res);
        setPetProfile(res.data);
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

      <Calculator setMessage={setMessage} petProfile={petProfile} />

      {message && <h3>{message}</h3>}
    </>
  );
}
