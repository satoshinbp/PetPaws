import dashboardHeaderIcon from '../../images/dashboard-header.svg';
import React, { useState } from 'react';
import Premium from '../Premium';

export default function Dashboard() {
  const [showPremium, setShowPremium] = useState(false);

  return (
    <>
      <div className="intro">
        <div className="wrapper">
          <div className="intro-container">
            <div>
              <h1 className="intro__title">Dashboard</h1>
              <p>
                Let's check the last week's summary here. You can review your pet's meal and activity habits, and notice
                small changes in your furry friend.
              </p>

              <div className="intro__img-area pc-hidden">
                <img src={dashboardHeaderIcon} alt="cat stiting besides cat food" />
              </div>

              <div className="btn-area">
                <button className="btn-contained--intro" onClick={() => setShowPremium(true)}>
                  Upgrade to Premium
                </button>
              </div>
            </div>

            <div className="intro__img-area mb-hidden">
              <img src={dashboardHeaderIcon} alt="a blue cat and a purple cat both sitting" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overlay ${showPremium ? 'isActive' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </>
  );
}
