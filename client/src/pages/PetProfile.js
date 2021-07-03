import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PetProfileForm from '../components/forms/PetProfileForm';

export default function PetProfile(props) {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [isDog, setIsDog] = useState(1); // 0: cat, 1: dog
  const [breedName, setBreedName] = useState('');
  const [birthday, setBirthday] = useState('');

  const [gender, setGender] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [isSpayed, setIsSpayed] = useState(0); // 0: intact, 1: spayed/neutered
  const [activityLevel, setActivityLevel] = useState(0); // 0: inactive, 1: somewhat active, 2: active, 3: very active
  const [bodyCondition, setBodyCondition] = useState(0); // 0: underweight, 1: ideal, 2: overweight

  useEffect(() => {
    Axios.get('https://api.thedogapi.com/v1/breeds').then((res) => {
      const breeds = res.data.map((breed) => ({ name: breed.name }));
      setDogBreeds(breeds);
    });

    Axios.get('https://api.thecatapi.com/v1/breeds').then((res) => {
      const breeds = res.data.map((breed) => ({ name: breed.name }));
      setCatBreeds(breeds);
    });
  }, []);

  const handleSubmit = () => {};

  const changePetType = (value) => {
    setIsDog(parseInt(value));
  };

  const changeBreed = (value) => {
    setBreedName(value);
  };

  const changeGender = (value) => {
    setGender(value);
  };

  const changeBirthday = (value) => {
    setBirthday(value);
  };

  const changeWeight = (value) => {
    setWeight(value);
  };

  const changeHeight = (value) => {
    setHeight(value);
  };

  const changeIsSpayed = (value) => {
    setIsSpayed(value);
  };

  const changeActivityLevel = (value) => {
    setActivityLevel(value);
  };

  const changeBodyCondition = (value) => {
    setBodyCondition(value);
  };

  return (
    <>
      <h2>Pet Profile</h2>
      <PetProfileForm
        dogBreeds={dogBreeds}
        catBreeds={catBreeds}
        isDog={isDog}
        breedName={breedName}
        birthday={birthday}
        gender={gender}
        weight={weight}
        height={height}
        isSpayed={isSpayed}
        activityLevel={activityLevel}
        bodyCondition={bodyCondition}
        changePetType={changePetType}
        changeBreed={changeBreed}
        changeGender={changeGender}
        changeBirthday={changeBirthday}
        changeWeight={changeWeight}
        changeHeight={changeHeight}
        changeIsSpayed={changeIsSpayed}
        changeActivityLevel={changeActivityLevel}
        changeBodyCondition={changeBodyCondition}
      />
    </>
  );
}
