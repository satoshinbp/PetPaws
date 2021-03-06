import { Link } from 'react-router-dom';
import calculatorIcon from '../../images/calculator.svg';

export default function CalculatorRegisteredUser() {
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
              <Link className="btn btn--link btn-contained--intro" to="/signup">
                Create Free Account
              </Link>
            </div>
          </div>
          <div className="intro__img-area mb-hidden">
            <img src={calculatorIcon} alt="cat stiting besides cat food" />
          </div>
        </div>
      </div>
    </div>
  );
}
