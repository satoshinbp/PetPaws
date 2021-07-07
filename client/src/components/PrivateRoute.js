import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import calculateAgeFromBirthday from '../functions/calculateAgeFromBirthday';
import calculateRecommendedCalorie from '../functions/calculateRecommendedCalorie';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  const [petProfile, setPetProfile] = useState(null);
  const [MER, setMER] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/user/${currentUser.uid}`)
      .then((res) => {
        const user_id = res.data[0].id;

        Axios.get(`http://localhost:3001/api/pet/get?user_id=${user_id}`)
          .then((res) => {
            const fetchedPetProfile = res.data;
            setPetProfile(fetchedPetProfile);
            console.log(fetchedPetProfile);
            const { ageY, ageM } = calculateAgeFromBirthday(fetchedPetProfile.birthday);
            calculateRecommendedCalorie({
              isDog: fetchedPetProfile.is_dog,
              breedName: fetchedPetProfile.breed,
              weight: fetchedPetProfile.weight,
              isSpayed: fetchedPetProfile.is_spayed,
              activityLevel: fetchedPetProfile.activity_level,
              bodyCondition: fetchedPetProfile.body_condition,
              ageYears: ageY,
              ageMonths: ageM,
            })
              .then((calculatedMER) => {
                setMER(calculatedMER);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} petProfile={petProfile} MER={MER} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
