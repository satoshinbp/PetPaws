import React from 'react';
import Members from '../components/Members';
import Dashboard from './Dashboard'

function Home() {
  return (
    <>

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
      <Dashboard />
    </>
  );
}

export default Home;
