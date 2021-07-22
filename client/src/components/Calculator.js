import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import calculateAgeFromBirthday from '../functions/calculateAgeFromBirthday';
import calculateRecommendedCalorie from '../functions/calculateRecommendedCalorie';

export default function Calculator(props) {
  const { currentUser } = useAuth();

  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [isDog, setIsDog] = useState(0); // 0: cat, 1: dog
  const [breedName, setBreedName] = useState('');
  const [ageYears, setAgeYears] = useState(0);
  const [ageMonths, setAgeMonths] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isSpayed, setIsSpayed] = useState(0); // 0: intact, 1: spayed/neutered
  const [activityLevel, setActivityLevel] = useState(0); // 0: inactive, 1: somewhat active, 2: active, 3: very active
  const [bodyCondition, setBodyCondition] = useState(0); // 0: underweight, 1: ideal, 2: overweight
  const [initialCalculationDone, setInitialCalculationDone] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    Axios.get('https://api.thedogapi.com/v1/breeds').then((res) => {
      const breeds = res.data.map((breed) => breed.name);
      setDogBreeds(breeds);
    });

    Axios.get('https://api.thecatapi.com/v1/breeds').then((res) => {
      const breeds = res.data.map((breed) => breed.name);
      setCatBreeds(breeds);
    });
  }, []);

  useEffect(() => {
    if (props.profile && !initialCalculationDone) {
      setIsDog(props.profile.is_dog);
      setBreedName(props.profile.breed);
      setWeight(props.profile.weight);
      setIsSpayed(props.profile.is_spayed);
      setActivityLevel(props.profile.activity_level);
      setBodyCondition(props.profile.body_condition);

      const { ageY, ageM } = calculateAgeFromBirthday(props.profile.birthday);

      setAgeYears(ageY);
      setAgeMonths(ageM);
    }
  }, [props]);

  const changePetType = (e) => {
    setIsDog(parseInt(e.target.value));
    setResult('');
  };
  const changeBreed = (e) => {
    setBreedName(e.target.value);
    setResult('');
  };
  const changeYears = (e) => {
    setAgeYears(e.target.value);
    setResult('');
  };
  const changeMonths = (e) => {
    setAgeMonths(e.target.value);
    setResult('');
  };
  const changeWeight = (e) => {
    setWeight(e.target.value);
    setResult('');
  };
  const changeIsSpayed = (e) => {
    setIsSpayed(parseInt(e.target.value));
    setResult('');
  };
  const changeActivityLevel = (e) => {
    setActivityLevel(parseInt(e.target.value));
    setResult('');
  };
  const changeBodyCondition = (e) => {
    setBodyCondition(parseInt(e.target.value));
    setResult('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const MER = await calculateRecommendedCalorie({
      isDog,
      breedName,
      weight,
      isSpayed,
      activityLevel,
      bodyCondition,
      ageYears,
      ageMonths,
    });

    setInitialCalculationDone(true);
    setResult(`${MER.toFixed(0)} kcal/day`);
  };

  return (
    <div className="calculator bg-primary-meat">
      <div className="wrapper">
        <h2>let’s see how many calories your pet needs!</h2>

        <form onSubmit={handleSubmit} className="basic-form bg-primary-light">
          <div className="radios-area">
            <label>Pet Type</label>

            <div className="radio-area">
              <input type="radio" name="dog" value={1} checked={isDog} onChange={changePetType} />
              <label htmlFor="dog">Dog</label>
            </div>

            <div className="radio-area">
              <input type="radio" name="cat" value={0} checked={!isDog} onChange={changePetType} />
              <label htmlFor="cat">Cat</label>
            </div>
          </div>

          <div className="input-area input-area--two-column">
            <div className="input-area-half">
              <label htmlFor="weight">Age</label>
              <input type="number" name="ageYears" value={ageYears} min={0} step={1} onChange={changeYears} />
              <span className="end-adornment">years</span>
            </div>

            <div className="input-area-half">
              <input
                type="number"
                name="ageMonths"
                value={ageMonths}
                min={0}
                max={11}
                step={1}
                onChange={changeMonths}
              />
              <span className="end-adornment">months</span>
            </div>
          </div>

          <div className="input-area">
            <label htmlFor="breed">Breed</label>
            <select name="breed" value={breedName} onChange={changeBreed} required>
              <option value="">Select breed</option>
              {isDog ? (
                <>
                  {dogBreeds.map((breed) => (
                    <option value={breed} key={breed}>
                      {breed}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {catBreeds.map((breed) => (
                    <option value={breed} key={breed}>
                      {breed}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="input-area">
            <label htmlFor="weight">Weight</label>
            <input type="number" name="weight" value={weight} min={0} step={0.1} onChange={changeWeight} />
            <span className="end-adornment">kg</span>
          </div>

          <div className="input-area">
            <label htmlFor="activityLevel">Activity Level</label>
            <select name="activityLevel" value={activityLevel} onChange={changeActivityLevel}>
              <option value={0}>Inactive</option>
              <option value={1}>Somewhat Active</option>
              <option value={2}>Active</option>
              <option value={3}>Very Active</option>
            </select>
          </div>

          <div className="input-area">
            <label htmlFor="bodyCondition">Body Condition</label>
            <select name="bodyCondition" value={bodyCondition} onChange={changeBodyCondition}>
              <option value={0}>Underweight</option>
              <option value={1}>Ideal</option>
              <option value={2}>Overweight</option>
            </select>
          </div>

          <div className="radios-area">
            <label>Spayed/Neutered</label>

            <div className="radio-area">
              <input
                id="intact"
                type="radio"
                name="isSpay"
                value={0}
                checked={isSpayed === 0}
                onChange={changeIsSpayed}
              />
              <label htmlFor="intact">No</label>
            </div>

            <div className="radio-area">
              <input
                id="spayed"
                type="radio"
                name="spayed"
                value={1}
                checked={isSpayed === 1}
                onChange={changeIsSpayed}
              />
              <label htmlFor="spayed">Yes</label>
            </div>
          </div>

          <div className="btn-area">
            <button type="submit" className="btn-contained">
              calculate
            </button>
          </div>
        </form>

        {result && (
          <div className="calculator__result bg-primary-light">
            <h3>Calculation Done!</h3>
            {currentUser ? (
              <>
                <p>The ideal calorie number for your pet is</p>
                <p className="calculator__result-calorie">{result}</p>
              </>
            ) : (
              <>
                <p>Enter your email so we could send you the results!</p>
                <input type="text" placeholder="Enter your email" />

                <div className="btn-area">
                  <button className="btn-contained">Send</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
