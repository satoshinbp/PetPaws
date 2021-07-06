import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Calculator(props) {
  const { setResult } = props;

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

  const calcAgeFromBirthday = (dateBirthStr) => {
    const dateNow = new Date();
    const dateBirth = new Date(dateBirthStr);

    const timeTillNow = dateNow.getTime() - dateBirth.getTime();
    const daysTillNow = timeTillNow / (1000 * 3600 * 24);

    const daysPerMonth = 365 / 12;
    const ageY = Math.floor(daysTillNow / 365);
    const ageM = Math.floor((daysTillNow - 365 * ageY) / daysPerMonth);

    return { ageY, ageM };
  };

  useEffect(() => {
    if (props.profile) {
      setIsDog(props.profile.is_dog);
      setBreedName(props.profile.breed);
      setWeight(props.profile.weight);
      setIsSpayed(props.profile.is_spayed);
      setActivityLevel(props.profile.activity_level);
      setBodyCondition(props.profile.body_condition);

      const { ageY, ageM } = calcAgeFromBirthday(props.profile.birthday);

      setAgeYears(ageY);
      setAgeMonths(ageM);
    }
  }, [props]);

  useEffect(() => {
    Axios.get('https://api.thedogapi.com/v1/breeds').then((res) => {
      const breeds = res.data.map((breed) => {
        const weightRange = breed.weight.metric.split('-').map((weightEdge) => parseInt(weightEdge.trim()));
        const weightAvg = (weightRange[0] + weightRange[1]) / 2;
        const adultAge = weightAvg <= 4 ? 8 : weightAvg < 10 ? 10 : weightAvg < 25 ? 12 : weightAvg < 44 ? 15 : 18;

        return { name: breed.name, adultAge };
      });
      setDogBreeds(breeds);
    });

    Axios.get('https://api.thecatapi.com/v1/breeds').then((res) => {
      const breeds = res.data.map((breed) => ({ name: breed.name, adultAge: 12 }));
      setCatBreeds(breeds);
    });
  }, []);

  useEffect(() => {
    if (props.profile) {
      const birthday = new Date(props.profile.birthday);
      const ageInYears = (Date.now() - birthday.getTime()) / 1000 / 60 / 60 / 24 / 365;
      const ageYears = Math.floor(ageInYears);
      const ageMonths = Math.floor((ageInYears - ageYears) * 12);
      setAgeYears(ageYears);
      setAgeMonths(ageMonths);
    }
  }, []);

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

  const signalmentFactors = [
    [1.4, 1.2],
    [1.8, 1.6],
  ];
  const activityLevelFactors = [1, 1.2, 1.4, 1.6];
  const bodyConditionFactors = [1.2, 1, 0.8];

  const handleSubmit = (e) => {
    e.preventDefault();

    const breedAdultAge = isDog
      ? dogBreeds.find((dogBreed) => dogBreed.name === breedName).adultAge
      : catBreeds.find((catBreed) => catBreed.name === breedName).adultAge;

    const RER = 70 * Math.pow(weight, 0.75);
    const signalmentFactor = signalmentFactors[isDog][isSpayed];
    const activityLevelFactor = activityLevelFactors[activityLevel];
    const bodyConditionFactor = bodyConditionFactors[bodyCondition];
    const ageFactor = ageYears * 12 + ageMonths < 4 ? 3 : ageYears * 12 + ageMonths < breedAdultAge ? 2 : 1;

    const MER = RER * signalmentFactor * activityLevelFactor * bodyConditionFactor * ageFactor;

    setResult(`${MER.toFixed(0)} kcal/day`);
  };

  return (
    <>
      <h2>Calorie Calculator</h2>
      {/* This styling is temporary, to be removed */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <h3>Pet type:</h3>
          <input type="radio" name="cat" value={0} checked={!isDog} onChange={changePetType} />
          <label htmlFor="cat">Cat</label>
          <input type="radio" name="dog" value={1} checked={isDog} onChange={changePetType} />
          <label htmlFor="dog">Dog</label>
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <select name="breed" value={breedName} onChange={changeBreed} required>
            <option value="">Select breed</option>
            {isDog ? (
              <>
                {dogBreeds.map((breed) => (
                  <option value={breed.name} key={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </>
            ) : (
              <>
                {catBreeds.map((breed) => (
                  <option value={breed.name} key={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div>
          <label>
            Age:
            <input type="number" name="ageYears" value={ageYears} min={0} step={1} onChange={changeYears} />
            Years
            <input type="number" name="ageMonths" value={ageMonths} min={0} max={11} step={1} onChange={changeMonths} />
            Months
          </label>
        </div>

        <div>
          <label htmlFor="weight">Weight:</label>
          <input type="number" name="weight" value={weight} min={0} step={0.1} onChange={changeWeight} />
          kg
        </div>

        <div>
          <label htmlFor="isSpayed">Signalment:</label>
          <select name="isSpayed" value={isSpayed} onChange={changeIsSpayed}>
            <option value={0}>Intact</option>
            <option value={1}>Spayed/Neutered</option>
          </select>
        </div>

        <div>
          <label htmlFor="activityLevel">Activity Level:</label>
          <select name="activityLevel" value={activityLevel} onChange={changeActivityLevel}>
            <option value={0}>Inactive</option>
            <option value={1}>Somewhat Active</option>
            <option value={2}>Active</option>
            <option value={3}>Very Active</option>
          </select>
        </div>

        <div>
          <label htmlFor="bodyCondition">Body Condition:</label>
          <select name="bodyCondition" value={bodyCondition} onChange={changeBodyCondition}>
            <option value={0}>Underweight</option>
            <option value={1}>Ideal</option>
            <option value={2}>Overweight</option>
          </select>
        </div>

        <button type="submit">calculate</button>
      </form>
    </>
  );
}
