import activityTrackerIcon from '../../images/activity-tracker-purple.svg';
import React, { useState } from 'react';
import Premium from '../Premium';

export default function WalkSummary() {
  const [showPremium, setShowPremium] = useState(false);
  return (
    <div className="intro">
      <div className="wrapper">
        <div className="intro-container">
          <div>
            <h1 className="intro__title">Activity Tracker</h1>
            <p>
              A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows you
              to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight
              control.
            </p>

            <div className="intro__img-area pc-hidden">
              <img src={activityTrackerIcon} alt="running dog with smile" />
            </div>

            <div className="btn-area">
              <button className="btn-contained--intro" onClick={() => setShowPremium(true)}>
                Upgrade to Premium
              </button>
            </div>
          </div>

          <div className="intro__img-area mb-hidden">
            <img src={activityTrackerIcon} alt="running dog with smile" />
          </div>
        </div>
      </div>

      <div className={`overlay ${showPremium ? 'isActive' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </div>
  );
}
