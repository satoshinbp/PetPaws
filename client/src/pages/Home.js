import React from 'react';
import Features from '../components/Features';
import Team from '../components/Team';

function Home() {
  return (
    <>
      <h3>Welcom to Pet Paws</h3>
      <p>
        We recommend the best nutrition plan for you furry friends, monitor their daily routine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Create free account</button>
      <Features />
      <Team />
    </>
  );
}

export default Home;
