import mealTrackerIcon from '../../images/meal-tracker.svg';
export default function MealSummary() {
  return (
    <div className="intro">
      <div className="wrapper">
        <div>
          <h1 className="intro__title">Meal Tracker</h1>
          <p>
            A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows you
            to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight control.
          </p>

          <div className="intro__img-area pc-hidden">
            <img src={mealTrackerIcon} alt="cat stiting besides cat food" />
          </div>

          <div className="btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          <img src={mealTrackerIcon} alt="cat stiting besides cat food" />
        </div>
      </div>
    </div>
  );
}
