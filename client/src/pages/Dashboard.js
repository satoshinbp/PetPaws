import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [petDetail, setPetDetail] = useState({ name: '', breed: '', weight: 0, height: 0 });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`http://localhost:3001/api/user/${currentUser.uid}`);
      return res.data[0];
    };
    const fetchPets = async () => {
      const user = await fetchUser();
      const res = await Axios(`http://localhost:3001/api/pet/get?user_id=${user.id}`);
      return res.data;
    };
    const getPets = async () => {
      const fetchedPets = await fetchPets();
      if (fetchedPets.length > 0) return setPetDetail(fetchedPets[0]);
    };
    getPets();
  }, []);

  return (
    <div>
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Dashboard</h2>
      <h3>Pet Details</h3>
      <div>
        <div>
          <p>Pet Name: {petDetail.name} </p>
          <p>Breed: {petDetail.breed}</p>
          <p>Weight: {petDetail.weight}kg</p>
          <p>Height: {petDetail.height}cm</p>
        </div>
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
