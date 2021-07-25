import { useState, useEffect } from 'react';
import Axios from 'axios';
import PetProfileForm from '../components/forms/PetProfile';
import { useAuth } from '../contexts//AuthContext';
import { useHistory } from 'react-router-dom';
import ProfileIntro from '../components/intros/Profile';
import dogIcon from '../images/add-pet-dog.svg';
import catIcon from '../images/add-pet-cat.svg';

export default function PetProfile({ petProfile }) {
  const { currentUser } = useAuth();
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [isDog, setIsDog] = useState(petProfile.is_dog); // 0: cat, 1: dog
  const [name, setName] = useState(petProfile.name);
  const [inputImage, setInputImage] = useState('');
  const [imageURL, setImageURL] = useState(petProfile.image);
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
    try {
      if (inputImage !== '') {
        let formData = new FormData();
        formData.append('file', inputImage);
        // url will be replaced with .env static variable
        Axios.post('http://localhost:3001/api/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    } catch (error) {
      console.log(error);
    }
    // if(inputImage) {

    //   // Axios.post(`http://localhost:3001/api/image`);
    // } else {
    //   savePetData(imageURL);
    // }
  };

  const savePetData = (url) => {
    Axios.get(`http://localhost:3001/api/user/${currentUser.uid}`)
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
          url: url,
          user_id: res.data[0].id,
        };

        if (petProfile.id) {
          Axios.put(`http://localhost:3001/api/pet/${petProfile.id}`, petData)
            .then(() => {
              history.push('/');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Axios.post('http://localhost:3001/api/pet', petData)
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

  const changeImage = (value) => {
    let createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    let image_url = createObjectURL(value);
    setImageURL(image_url);
    setInputImage(value);
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
      <ProfileIntro />

      <div className="body">
        <div className="profile bg-primary-meat">
          <div className="wrapper">
            <h2>Lets create profile for your pet!</h2>

            <PetProfileForm
              dogBreeds={dogBreeds}
              catBreeds={catBreeds}
              isDog={isDog}
              name={name}
              image={inputImage}
              imageURL={imageURL}
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
              changeImage={changeImage}
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
          </div>
        </div>

        <div className="add-pet bg-secondary-fish">
          <div className="wrapper">
            <div className="container bg-secondary-light">
              <div className="btn-and-label">
                <button className="icon-btn-circle">＋</button>
                <p>Add new pet</p>
              </div>

              <div className="icon-area icon-area--dog">
                <img src={dogIcon} alt="a sitting dog" />
              </div>

              <div className="icon-area icon-area--cat">
                <img src={catIcon} alt="a sitting cat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
