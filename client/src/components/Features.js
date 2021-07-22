import finderIcon from '../images/finder.svg';
import activityTrackerIcon from '../images/activity-tracker-yellow.svg';
import calculatorIcon from '../images/calculator.svg';

export default function Features() {
  return (
    <div className="features bg-primary-meat">
      <div className="wrapper">
        <h2>Our Services</h2>

        <div className="feature bg-primary-light-mb-visible">
          <div className="feature__text mb-hidden">
            <h3 className="feature__title">Meal and Walk Tracker</h3>
            <p className="feature__description">
              With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be
              healthy and happy
            </p>
          </div>

          <h3 className="feature__title pc-hidden">Meal and Walk Tracker</h3>
          <div className="feature__img">
            <img src={activityTrackerIcon} alt="member portrait" />
          </div>
          <p className="feature__description pc-hidden">
            With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be healthy
            and happy
          </p>
        </div>

        <div className="feature bg-primary-light-mb-visible">
          <div className="feature__text mb-hidden">
            <h3 className="feature__title">Calorie Calculator</h3>
            <p className="feature__description">
              With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be
              healthy and happy
            </p>
          </div>

          <h3 className="feature__title pc-hidden">Calorie Calculator</h3>
          <div className="feature__img">
            <img src={calculatorIcon} alt="member portrait" />
          </div>
          <p className="feature__description pc-hidden">
            With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be healthy
            and happy
          </p>
        </div>

        <div className="feature bg-primary-light-mb-visible">
          <div className="feature__text mb-hidden">
            <h3 className="feature__title">Pet Stores Finder</h3>
            <p className="feature__description">
              With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be
              healthy and happy
            </p>
          </div>

          <h3 className="feature__title pc-hidden">Pet Stores Finder</h3>
          <div className="feature__img">
            <img src={finderIcon} alt="member portrait" />
          </div>
          <p className="feature__description pc-hidden">
            With these 2 trackers you can monitor your pet’s health and know for sure that it gets enough to be healthy
            and happy
          </p>
        </div>

        <div className="btn-area">
          <button className="btn-contained ">Unlock All Features</button>
        </div>
      </div>
    </div>
  );
}
