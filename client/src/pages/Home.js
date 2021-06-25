import React from 'react';
import CreateAccount from '../components/CTA/CreateAccount';
import Features from '../components/Features';
import Members from '../components/Members';

function Home() {
  return (
    <>
      <CreateAccount />
      <Features />
      <Members />
    </>
  );
}

export default Home;
