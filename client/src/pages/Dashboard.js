import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetDetails from '../components/PetDetails';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [petDetail, setPetDetail] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/user', { params: { uid: currentUser.uid } }).then((response) => {
      const fetchPets = async () => {
        const params = { params: { user_id: response.id } };
        const res = await fetch(`http://localhost:3001/api/pet/get/${response.data[0].id}`, params);
        const data = await res.json();
        return data;
      };

      const getPets = async () => {
        const fetchedPets = await fetchPets();
        console.log('fetchedPets', fetchedPets);
        setPetDetail(fetchedPets);
      };
      getPets();
    });
  }, []);

  return (
    <div>
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Dashboard</h2>
      <h3>Pet Details</h3>
      <div>
        {petDetail ? (
          <div key={petDetail.id}>
            <p>Pet Name: {petDetail.name} </p>
            <p>Breed: {petDetail.breed}</p>
            <p>Weight: {petDetail.weight}kg</p>
            <p>Height: {petDetail.height}cm</p>
          </div>
        ) : (
          'Loading...'
        )}
      </div>
      <h3>In Last 7 Days</h3>
      {/* <LatestSummary /> */}
      <h3>Nutrition Summary</h3>
      <Link to="/mealsummary">Discover More</Link>
      <br></br>
      <h3>Activity Summary</h3>
      <Link to="/walksummary">Discover More</Link>
    </div>
  );
};
export default Dashboard;
