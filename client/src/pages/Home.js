import React from 'react';
import CreateAccount from '../components/CTA/CreateAccount';
import Members from '../components/Members';

function Home() {
  return (
    <>
      <CreateAccount />
      <div>Our services</div>
      <ul>
        <li>Tracker</li>
        <li>Nutrition Calculator</li>
        <li>Finding Pet Store and Vets</li>
      </ul>
      <Members />
    </>
  );
}

export default Home;
