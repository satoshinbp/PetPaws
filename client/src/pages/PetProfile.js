import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PetProfileForm from '../components/forms/PetProfile';
import { useAuth } from '../contexts//AuthContext';
import { useHistory } from 'react-router-dom';

export default function PetProfile({ petProfile }) {
  const { currentUser } = useAuth();
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [isDog, setIsDog] = useState(petProfile.is_dog); // 0: cat, 1: dog
  const [name, setName] = useState(petProfile.name);
  const [breedName, setBreedName] = useState(petProfile.breed);
  const [birthday, setBirthday] = useState(petProfile.birthday);
  const [gender, setGender] = useState(petProfile.gender);
  const [weight, setWeight] = useState(petProfile.weight);
  const [height, setHeight] = useState(petProfile.height);
  const [isSpayed, setIsSpayed] = useState(petProfile.is_spayed); // 0: intact, 1: spayed/neutered
  const [activityLevel, setActivityLevel] = useState(petProfile.activity_level); // 0: inactive, 1: somewhat active, 2: active, 3: very active
  const [bodyCondition, setBodyCondition] = useState(petProfile.body_condition); // 0: underweight, 1: ideal, 2: overweight
  const history = useHistory();

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

  useEffect(() => {
    console.log(petProfile);
    setIsDog(petProfile.is_dog);
    setName(petProfile.name);
    setBreedName(petProfile.breed);
    setBirthday(petProfile.birthday);
    setGender(petProfile.gender);
    setWeight(petProfile.weight);
    setHeight(petProfile.height);
    setIsSpayed(petProfile.is_spayed);
    setActivityLevel(petProfile.activity_level);
    setBodyCondition(petProfile.body_condition);
  }, [petProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.get(`https://pet-paws-langara.herokuapp.com/api/user/${currentUser.uid}`)
      .then((res) => {
        const petData = {
          isDog,
          name,
          breedName,
          birthday,
          gender,
          weight,
          height,
          isSpayed,
          activityLevel,
          bodyCondition,
          user_id: res.data[0].id,
        };

        if (petProfile.id) {
          Axios.put(`https://pet-paws-langara.herokuapp.com/api/pet/${petProfile.id}`, petData)
            .then(() => {
              history.push('/');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Axios.post('https://pet-paws-langara.herokuapp.com/api/pet', petData)
            .then(() => {
              history.push('/');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePetType = (value) => {
    setIsDog(parseInt(value));
  };

  const changeName = (value) => {
    setName(value);
  };

  const changeBreed = (value) => {
    setBreedName(value);
  };

  const changeGender = (value) => {
    setGender(value);
  };

  const changeBirthday = (value) => {
    setBirthday(value.slice(0, 10));
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
        name={name}
        breedName={breedName}
        birthday={birthday}
        gender={gender}
        weight={weight}
        height={height}
        isSpayed={isSpayed}
        activityLevel={activityLevel}
        bodyCondition={bodyCondition}
        changePetType={changePetType}
        changeName={changeName}
        changeBreed={changeBreed}
        changeGender={changeGender}
        changeBirthday={changeBirthday}
        changeWeight={changeWeight}
        changeHeight={changeHeight}
        changeIsSpayed={changeIsSpayed}
        changeActivityLevel={changeActivityLevel}
        changeBodyCondition={changeBodyCondition}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
