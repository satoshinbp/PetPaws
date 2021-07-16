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
    <div className="calculator">
      <h3>Let's Calculate!</h3>

      <form onSubmit={handleSubmit} className="calculator__form">
        <div className="calculator__pet-type">
          <div className="calculator__label--radio">Pet type</div>

          <div className="calculator__radio-options">
            <label htmlFor="dog">
              <input type="radio" name="dog" value={1} checked={isDog} onChange={changePetType} />
              Dog
            </label>
            <label htmlFor="cat">
              <input type="radio" name="cat" value={0} checked={!isDog} onChange={changePetType} />
              Cat
            </label>
          </div>
        </div>

        <div className="calculator__params">
          <label htmlFor="breed" className="calculator__label">
            Breed
          </label>
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

        <div className="calculator__params">
          <div className="calculator__label">Age</div>
          <div className="calculator__params--age">
            <label className="calculator__label--age">
              <input type="number" name="ageYears" value={ageYears} min={0} step={1} onChange={changeYears} />
              years
            </label>
            <label className="calculator__label--age">
              <input
                type="number"
                name="ageMonths"
                value={ageMonths}
                min={0}
                max={11}
                step={1}
                onChange={changeMonths}
              />
              months
            </label>
          </div>
        </div>

        <div className="calculator__params">
          <div className="calculator__label">
            <label htmlFor="weight">Weight</label>
          </div>
          <div className="calculator__input-with-endadornment">
            <input type="number" name="weight" value={weight} min={0} step={0.1} onChange={changeWeight} />
            kg
          </div>
        </div>

        <div className="calculator__params">
          <div className="calculator__label">
            <label htmlFor="activityLevel">Activity Level</label>
          </div>
          <select name="activityLevel" value={activityLevel} onChange={changeActivityLevel}>
            <option value={0}>Inactive</option>
            <option value={1}>Somewhat Active</option>
            <option value={2}>Active</option>
            <option value={3}>Very Active</option>
          </select>
        </div>

        <div className="calculator__params">
          <div className="calculator__label">
            <label htmlFor="bodyCondition">Body Condition</label>
          </div>
          <select name="bodyCondition" value={bodyCondition} onChange={changeBodyCondition}>
            <option value={0}>Underweight</option>
            <option value={1}>Ideal</option>
            <option value={2}>Overweight</option>
          </select>
        </div>

        <div className="calculator__pet-type">
          <div className="calculator__label--radio">Spayed/Neutered</div>

          <div className="calculator__radio-options">
            <label htmlFor="intact">
              <input
                id="intact"
                type="radio"
                name="isSpay"
                value={0}
                checked={isSpayed === 0}
                onChange={changeIsSpayed}
              />
              No
            </label>
            <label htmlFor="spayed">
              <input
                id="spayed"
                type="radio"
                name="spayed"
                value={1}
                checked={isSpayed === 1}
                onChange={changeIsSpayed}
              />
              Yes
            </label>
          </div>
        </div>

        <button type="submit" className="btn-contained-yellow btn-not-fullwidth">
          calculate
        </button>
      </form>

      {result && (
        <div className="calculator__result">
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

              <div className="calculator__btn-area">
                <button className="btn-contained-yellow">Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
