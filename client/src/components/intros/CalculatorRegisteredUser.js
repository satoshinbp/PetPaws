import catIcon from '../../images/cat.svg';

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
            <img src={catIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="intro__btn-area">
            <button className="btn-contained--intro">Create free account</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={catIcon} alt="cat stiting besides cat food" />
        </div>
      </div>
    </div>
  );
}
