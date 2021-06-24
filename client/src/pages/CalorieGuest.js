import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Calorie() {
  const [petType, setPetType] = useState('');
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);

  useEffect(() => {
    Axios.get('https://dog.ceo/api/breeds/list/all').then((res) => {
      const breeds = Object.keys(res.data.message);
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
      <h3>Welcome to Pet Paws</h3>
      <p>
        We recommend the best nutrition plan for your furry friend, monitor their daily routeine, and locate the best
        vets and pet stores for your convenience.
      </p>
      <button>Create free account</button>

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

      <h3>The calculation is done!</h3>
      <h4>Your pet is overweight</h4>
      <p>Emter your email so we could send you the results!</p>

      <button>Send</button>
    </>
  );
}
