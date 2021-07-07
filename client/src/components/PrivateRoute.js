import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  const [petProfile, setPetProfile] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/user/${currentUser.uid}`)
      .then((res) => {
        const user_id = res.data[0].id;

        Axios.get(`http://localhost:3001/api/pet/get?user_id=${user_id}`)
          .then((res) => {
            setPetProfile(res.data);
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
        return currentUser ? <Component {...props} petProfile={petProfile} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
}
