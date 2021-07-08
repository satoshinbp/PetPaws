// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
import LatestCalorieSummary from '../components/charts/LatestCalorieSummary';
import LatestWalkSummary from '../components/charts/LatestWalkSummary';

const Dashboard = (props) => {
  const petProfile = props.petProfile;
  const MER = props.MER;
  const age = props.age;

  return (
    <div>
      <h2 style={{ border: '1px solid black', borderRadius: '5px', backgroundColor: '#F0F0F0' }}>Dashboard</h2>
      <h3>Pet Details</h3>
      <div>
        <div>
          <p>Pet Name: {petProfile.name} </p>
          <p>Age: {age} </p>
          <p>Breed: {petProfile.breed}</p>
          <p>Weight: {petProfile.weight}kg</p>
          <p>Height: {petProfile.height}cm</p>
        </div>
      </div>
      <h3>In Last 7 Days</h3>
      <LatestCalorieSummary MER={MER} />
      <LatestWalkSummary />
      <h3>Nutrition Summary</h3>
      <Link to="/mealsummary">Discover More</Link>
      <br></br>
      <h3>Activity Summary</h3>
      <Link to="/walksummary">Discover More</Link>
    </div>
  );
};
export default Dashboard;
