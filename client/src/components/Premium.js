import React from 'react';
import checkIcon from '../images/check-icon.svg';
import closeModalIcon from '../images/close-modal.svg';

const Premium = ({ closeForm }) => {
  return (
    <div className="modal premium-modal">
      <img src={closeModalIcon} alt="close form" onClick={closeForm} className="close-modal-icon" />

      <div className="premium-modal-wrapper">
        <div className="modal-content premium-content">
          <h2>
            <span>Subscribe to </span>Pet Paws premium!
          </h2>

          <div className="features">
            <div className="feature-area">
              <img src={checkIcon} alt="check" />
              <p>Unlock add unlimited pets</p>
            </div>
            <div className="feature-area">
              <img src={checkIcon} alt="check" />
              <p>Unlock health tracker for unlimited pets</p>
            </div>
          </div>

          <div className="plans">
            <div className="plan-area">
              <p>Monthly plan</p>
              <p>CA $6.49</p>
              <p>per month</p>
            </div>

            <div className="plan-area">
              <p>Annual plan</p>
              <p>CA $41.88</p>
              <p>per year</p>
            </div>
          </div>

          <div className="btn-area">
            <button className="btn-contained">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
