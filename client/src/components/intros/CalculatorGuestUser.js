import catIcon from '../../images/cat.svg'; // to be replaced

export default function CalculatorRegisteredUser() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h2 className="intro__title">Calorie Calculator</h2>
          <p>
            This calculator will help you determine the ideal calorie intake for a pet based on its weight, height, age,
            breed, activity level and body type!
          </p>

          <div className="intro__img-area pc-hidden">
            {/* icon to be replaced */}
            <img src={catIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          {/* icon to be replaced */}
          <img src={catIcon} alt="cat stiting besides cat food" />
        </div>
      </div>
    </div>
  );
}
