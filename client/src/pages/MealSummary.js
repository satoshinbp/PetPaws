import MealMonthChart from '../components/charts/MealMonthChart';
import MealWeekChart from '../components/charts/MealWeekChart';
import MealDayChart from '../components/charts/MealDayChart';
import MealForm from '../components/forms/Meal';
import storesVetsFinderIcon from '../images/stores-vets-finder.svg'; // dammy img, to be replaced

export default function MealSummary({ petProfile, allMeals, setAllMeals, MER }) {
  return (
    <>
      <div className="intro">
        <div className="intro__wrapper">
          <div className="intro__body">
            <div className="intro__text">
              <h2>Meal Tracker</h2>
              <p>
                A nutritious, balanced diet is essential to keeping your dog healthy. We provide a feature that allows
                you to keep track of your pet's meals. Additionally, we offer the ideal nutrition for your pet's weight
                control.
              </p>
            </div>
          </div>

          <div className="intro__img">
            <img src={storesVetsFinderIcon} alt="member portrait" />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="body__wrapper">
          {!petProfile.name ? (
            <p>Please create your pet profile</p>
          ) : (
            <MealForm petProfile={petProfile} setAllMeals={setAllMeals} />
          )}
          <MealDayChart allMeals={allMeals} />
          <MealWeekChart allMeals={allMeals} />
          <MealMonthChart allMeals={allMeals} />
        </div>
      </div>
    </>
  );
}
