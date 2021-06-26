import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Calculator(props) {
  const { setMessage } = props;
  const [petType, setPetType] = useState(0); // 0: dog, 1: cat
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState(0);
  const [signalment, setSignalment] = useState(0); // 0: intact, 1: neutered
  const [activityLevel, setActivityLevel] = useState(0); // 0: inactive, 1: somewhat active, 2: active, 3: very active
  const [bodyCondition, setBodyCondition] = useState(1); // 0: underweight, 1: ideal, 2: overweight

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

  useEffect(() => setBreed(''), [petType]);

  const changePetType = (e) => setPetType(parseInt(e.target.value));
  const changeBreed = (e) => setBreed(e.target.value);
  const changeWeight = (e) => setWeight(parseInt(e.target.value));
  const changeSignalment = (e) => setSignalment(parseInt(e.target.value));
  const changeActivityLevel = (e) => setActivityLevel(parseInt(e.target.value));
  const changeBodyCondition = (e) => setBodyCondition(parseInt(e.target.value));

  const signalmentFactors = [
    [1.8, 1.6],
    [1.4, 1.2],
  ];
  const activityLevelFactors = [1, 1.2, 1.4, 1.6];
  const bodyConditionFactors = [1.2, 1, 0.8];

  const handleSubmit = (e) => {
    e.preventDefault();

    const RER = 70 * Math.pow(weight, 0.75);
    const signalmentFactor = signalmentFactors[petType][signalment];
    const activityLevelFactor = activityLevelFactors[activityLevel];
    const bodyConditionFactor = bodyConditionFactors[bodyCondition];

    const MER = RER * signalmentFactor * activityLevelFactor * bodyConditionFactor;

    setMessage(`${MER.toFixed(0)} kcal/day`);
  };

  return (
    <>
      <h2>Calorie Calculator</h2>
      {/* This styling is temporary, to be removed */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <h3>Pet type:</h3>
          <input type="radio" name="petType" value={0} checked={!petType} onChange={changePetType} />
          <label htmlFor="dog">Dog</label>
          <input type="radio" name="petType" value={1} checked={petType} onChange={changePetType} />
          <label htmlFor="cat">Cat</label>
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <select name="breed" onChange={changeBreed}>
            {!petType ? (
              <>
                <option>Select breed</option>
                {dogBreeds.map((breed) => (
                  <option value={breed} key={breed}>
                    {breed}
                  </option>
                ))}
              </>
            ) : petType ? (
              <>
                <option>Select breed</option>
                {catBreeds.map((breed) => (
                  <option value={breed} key={breed}>
                    {breed}
                  </option>
                ))}
              </>
            ) : (
              <option>Please select pet type first</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="weight">Weight:</label>
          <input type="number" name="weight" value={weight} min={0} step={0.1} onChange={changeWeight} />
          kg
        </div>

        <div>
          <label htmlFor="signalment">Signalment:</label>
          <select name="signalment" onChange={changeSignalment}>
            <option value={0}>Intact</option>
            <option value={1}>Neutered</option>
          </select>
        </div>

        <div>
          <label htmlFor="activityLevel">Activity Level:</label>
          <select name="activityLevel" onChange={changeActivityLevel}>
            <option value={0}>Inactive</option>
            <option value={1}>Somewhat Active</option>
            <option value={2}>Active</option>
            <option value={3}>Very Active</option>
          </select>
        </div>

        <div>
          <label htmlFor="bodyCondition">Body Condition:</label>
          <select name="bodyCondition" onChange={changeBodyCondition}>
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
