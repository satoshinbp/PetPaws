import catIcon from '../../images/cat.svg'; // to be replaced

export default function MealSummary() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h2 className="intro__title">Meal Tracker</h2>
          <p>
            A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows you
            to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight control.
          </p>

          <div className="intro__img-area pc-hidden">
            {/* icon to be replaced */}
            <img src={catIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="intro__btn-area">
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
