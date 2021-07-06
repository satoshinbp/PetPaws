import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Calculator from '../components/Calculator';

export default function Calorie() {
  const { currentUser } = useAuth();
  const [result, setResult] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/user/${currentUser.uid}`)
      .then((res) => {
        const user_id = res.data[0].id;

        Axios.get(`http://localhost:3001/api/pet/get/${user_id}`)
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
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
