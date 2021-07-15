import React, { useState } from 'react';
import Calculator from '../components/Calculator';
import storesVetsFinderIcon from '../images/stores-vets-finder.svg'; // dammy img, to be replaced

export default function Calorie() {
  const [result, setResult] = useState('');

  return (
    <>
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Calorie Calculator</h2>
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
            <img src={storesVetsFinderIcon} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="body__wrapper">
          <Calculator setResult={setResult} />

          {result && (
            <>
              <h3>The calculation is done!</h3>
              <h4>Your pet is overweight</h4>
              <p>Emter your email so we could send you the results!</p>

              <button>Send</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
