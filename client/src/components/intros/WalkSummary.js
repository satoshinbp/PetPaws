import runningDogIcon from '../../images/running-dog.svg'; // to be replaced

export default function WalkSummary() {
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
            <img src={runningDogIcon} alt="running dog with smile" />
          </div>

          <div className="intro__btn-area">
            <button className="btn-contained--intro">Upgrade to Premium</button>
          </div>
        </div>

        <div className="intro__img-area mb-hidden">
          {/* icon to be replaced */}
          <img src={runningDogIcon} alt="running dog with smile" />
        </div>
      </div>
    </div>
  );
}
