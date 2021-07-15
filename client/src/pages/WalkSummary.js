import WalkMonthChart from '../components/charts/WalkMonthChart';
import WalkWeekChart from '../components/charts/WalkWeekChart';
import WalkDayChart from '../components/charts/WalkDayChart';
import WalkForm from '../components/forms/Walk';
import trackerIcon from '../images/tracker.svg'; // dammy img, to be replaced

export default function WalkSummary({ petProfile, allActivities, setAllActivities }) {
  return (
    <>
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Activity Tracker</h2>
              <p>
                A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows
                you to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight
                control.
              </p>
            </div>

            <div className="intro__btn">
              <button className="btn-contained-white btn-not-fullwidth">Create free account</button>
            </div>
          </div>

          <div className="intro__img">
            <img src={trackerIcon} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="body__wrapper">
          {!petProfile.name ? (
            <p>Please create your pet profile</p>
          ) : (
            <WalkForm petProfile={petProfile} setAllActivities={setAllActivities} />
          )}
          <WalkDayChart allActivities={allActivities} />
          <WalkWeekChart allActivities={allActivities} />
          <WalkMonthChart allActivities={allActivities} />
        </div>
      </div>
    </>
  );
}
