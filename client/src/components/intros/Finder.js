import { useAuth } from '../../contexts/AuthContext';
import finderIcon from '../../images/finder.svg';
import React, { useState } from 'react';
import Premium from '../../pages/Premium';

export default function Finder() {
  const { currentUser } = useAuth();
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Finding Pet Stores / Vets</h1>
          <p>
            Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets and
            pet shops for your convenience.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={finderIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="btn-area">
            {currentUser ? (
              <button className="btn-contained--intro" onClick={() => setShowPremium(true)}>
                Upgrade to Premium
              </button>
            ) : (
              <button className="btn-contained--intro">Create Free Account</button>
            )}
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={finderIcon} alt="cat stiting besides cat food" />
        </div>
      </div>
      <div className={`overlay ${showPremium ? 'isActive' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </div>
  );
}
