import React from 'react';
import Team from '../components/Team';
import signinImg from '../images/dog-sample.jpg'; // dammy img, to be replaced

function Home() {
  return (
    <div className="page">
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Welcom to Pet Paws</h2>
              <p>
                Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets
                and pet shops for your convenience.
              </p>
            </div>

            <div className="intro__btn">
              <button className="btn-contained-white btn-not-fullwidth">Create free account</button>
            </div>
          </div>

          <div className="intro__img">
            <img src={signinImg} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="features">
          <h2>Our Services</h2>

          <div className="features__feature">
            <h3>Meal and Walk Tracker</h3>
            <div className="features__feature-img">
              <img src={signinImg} alt="member portrait" />
            </div>
            <p className="features__feature-description">
              With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be
              healthy and happy
            </p>
          </div>

          <div className="features__feature">
            <h3>Calorie Calculator</h3>
            <div className="features__feature-img">
              <img src={signinImg} alt="member portrait" />
            </div>
            <p className="features__feature-description">
              With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be
              healthy and happy
            </p>
          </div>

          <div className="features__feature">
            <h3>Pet Stores Finder</h3>
            <div className="features__feature-img">
              <img src={signinImg} alt="member portrait" />
            </div>
            <p className="features__feature-description">
              With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be
              healthy and happy
            </p>
          </div>

          <div className="features__btn">
            <button className="btn-contained-white btn-not-fullwidth">Unlock All Features</button>
          </div>
        </div>

        <Team />
      </div>
    </div>
  );
}

export default Home;
