import profileIcon from '../../images/profile.svg';
import React, { useState } from 'react';
import Premium from '../../pages/Premium';

export default function Profile() {
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Pet Profile</h1>
          <p>
            Let's complete your furry friend detail here. Depending on the age and breed, we will advise the best
            individual plan for nutrition and walking activities.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={profileIcon} alt="a cat and a dog both sitting" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro" onClick={() => setShowPremium(true)}>
              Upgrade to Premium
            </button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={profileIcon} alt="a cat and a dog both sitting" />
        </div>
      </div>
      <div className={`overlay ${showPremium ? 'isActive' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </div>
  );
}
