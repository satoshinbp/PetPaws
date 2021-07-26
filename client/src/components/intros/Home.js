import homeIcon from '../../images/home.svg';
import React, { useState } from 'react';
import Premium from '../../pages/Premium';

export default function Home() {
  const [showPremium, setShowPremium] = useState(false);
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Welcom to Pet Paws</h1>
          <p>
            Try the best nutrition plan for your furry friend, monitor their daily routine, and locate the best vets and
            pet shops for your convenience.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={homeIcon} alt="two cat and a dog all sitting" />
          </div>

          <div className="btn-area">
            <button onClick={() => setShowPremium(true)} className="btn-contained--intro">
              Upgrade to Premium
            </button>
          </div>
          <div className={`modal ${showPremium ? 'isActive overlay' : ''}`}>
            {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={homeIcon} alt="two cat and a dog all sitting" />
        </div>
      </div>
    </div>
  );
}
