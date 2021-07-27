import calculatorIcon from '../../images/calculator.svg';
import React, { useState } from 'react';
import Premium from '../Premium';

export default function CalculatorRegisteredUser() {
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div className="intro">
      <div className="wrapper">
        <div className="intro-container">
          <div>
            <h1 className="intro__title">Calorie Calculator</h1>
            <p>
              This calculator will help you determine the ideal calorie intake for a pet based on its weight, height,
              age, breed, activity level and body type!
            </p>

            <div className="intro__img-area pc-hidden">
              <img src={calculatorIcon} alt="cat stiting besides cat food" />
            </div>

            <div className="btn-area">
              <button className="btn-contained--intro" onClick={() => setShowPremium(true)}>
                Upgrade to Premium
              </button>
            </div>
          </div>

          <div className="intro__img-area mb-hidden">
            <img src={calculatorIcon} alt="cat stiting besides cat food" />
          </div>
        </div>
      </div>

      <div className={`overlay ${showPremium ? 'isActive' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </div>
  );
}
