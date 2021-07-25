import React from 'react';
import checkIcon from '../images/check-icon.svg';
import closeModalIcon from '../images/close-modal.svg';

const Premium = ({ closeForm }) => {
  return (
    <div className="premium wrapper">
      <img src={closeModalIcon} alt="close form" onClick={closeForm} className="close-modal-icon" />
      <div className="premium-content">
        <h2>
          <span>Subscribe to </span>Pet Paws premium!
        </h2>
        <div className="features-detail">
          <div className="feature-wrapper">
            <img src={checkIcon} />
            <p>Unlock add unlimited pets</p>
          </div>
          <div className="feature-wrapper">
            <img src={checkIcon} />
            <p>Unlock health tracker for unlimited pets</p>
          </div>
        </div>
        <div className="plans-options">
          <div className="plan-wrapper">
            <p>Monthly plan</p>
            <p>CA $6.49</p>
            <p>per month</p>
          </div>
          <div className="plan-wrapper">
            <p>Annual plan</p>
            <p>CA $41.88</p>
            <p>per year</p>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="btn-contained ">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
