import React from 'react';
import Team from '../components/Team';
import signinImg from '../images/dog-sample.jpg'; // dammy img, to be replaced

function Home() {
  return (
    <div className="home">
      <div className="intro">
        <h3>Welcom to Pet Paws</h3>
        <p>
          We recommend the best nutrition plan for you furry friends, monitor their daily routine, and locate the best
          vets and pet stores for your convenience.
        </p>
        <button className="btn-contained-green">Create free account</button>
      </div>

      <div className="features">
        <h2>Our Services</h2>

        <div className="features__feature">
          <h3>Meal and Walk Tracker</h3>
          <div className="features__feature-img">
            <img src={signinImg} alt="member portrait" />
          </div>
          <p className="features__feature-description">
            With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be healthy
            and happy
          </p>
        </div>

        <div className="features__feature">
          <h3>Calorie Calculator</h3>
          <div className="features__feature-img">
            <img src={signinImg} alt="member portrait" />
          </div>
          <p className="features__feature-description">
            With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be healthy
            and happy
          </p>
        </div>

        <div className="features__feature">
          <h3>Pet Stores Finder</h3>
          <div className="features__feature-img">
            <img src={signinImg} alt="member portrait" />
          </div>
          <p className="features__feature-description">
            With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be healthy
            and happy
          </p>
        </div>

        <div className="features__btn">
          <button className="btn-contained-yellow">Unlock All Features</button>
        </div>
      </div>

      <Team />
    </div>
  );
}

export default Home;
