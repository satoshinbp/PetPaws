import { useAuth } from '../../contexts/AuthContext';
import contactIcon from '../../images/contact.svg';
import React, { useState } from 'react';
import Premium from '../../pages/Premium';

export default function ContactIntro() {
  const [showPremium, setShowPremium] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Ask us a question!</h1>
          <p>Pet Paws Team is always glad to hear your feeback and answer any questions about our services</p>

          <div className="intro__img-area pc-hidden">
            <img src={contactIcon} alt="sitting dog with question mark" />
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
          <img src={contactIcon} alt="sitting dog with question mark" />
        </div>
      </div>
      <div className={`modal ${showPremium ? 'isActive overlay' : ''}`}>
        {showPremium && <Premium closeForm={() => setShowPremium(false)} />}
      </div>
    </div>
  );
}
