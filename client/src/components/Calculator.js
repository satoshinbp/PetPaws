import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Calculator() {
  const [petType, setPetType] = useState('');
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);

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

  const changePetType = (e) => {
    setPetType(e.target.value);
  };

  return (
    <>
      <h2>Calorie Calculator</h2>
      <form>
        <h3>Pet type:</h3>
        <input type="radio" name="petType" value="dog" onChange={changePetType} />
        <label htmlFor="dog">Dog</label>
        <input type="radio" name="petType" value="cat" onChange={changePetType} />
        <label htmlFor="cat">Cat</label>

        <label htmlFor="breed">Breed:</label>
        <select name="breed">
          {petType === 'dog' ? (
            dogBreeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))
          ) : petType === 'cat' ? (
            catBreeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))
          ) : (
            <option>Please select pet type</option>
          )}
        </select>

        <label htmlFor="weight">Weight:</label>
        <input type="number" name="weight" />

        <label htmlFor="age">Age:</label>
        <input type="number" name="age" />

        <label htmlFor="height">Height:</label>
        <input type="number" name="height" />

        <button type="submit">calculate</button>
      </form>
    </>
  );
}
