import React from 'react';
import Team from '../components/Team';

function Home() {
  return (
    <>
      <h3>Welcom to Pet Paws</h3>
      <p>
        We recommend the best nutrition plan for you furry friends, monitor their daily routine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button className="btn-contained-green">Create free account</button>
      <div>
        <h2>Our services</h2>
        <p>Lorem ipsum dolor sit amet</p>
        <div>
          <h3>Feature 1</h3>
          <p>
            We recommend the best nutrition plan for you furry friends, monitor their daily routine, and locate the best
            vets and pet stores for your convenience.
          </p>
        </div>
        <div>
          <h3>Feature 2</h3>
          <p>
            We recommend the best nutrition plan for you furry friends, monitor their daily routine, and locate the best
            vets and pet stores for your convenience.
          </p>
        </div>
        <div>
          <h3>Feature 3</h3>
          <p>
            We recommend the best nutrition plan for you furry friends, monitor their daily routine, and locate the best
            vets and pet stores for your convenience.
          </p>
        </div>

        <button>UNLOCK ALL FEATURES</button>
      </div>
      <Team />
    </>
  );
}

export default Home;
