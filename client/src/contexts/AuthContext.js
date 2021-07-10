import Axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/index';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, name) => {
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        user.updateProfile({
          displayName: name,
        });
        const uid = user.uid;
        const userInitialData = {
          uid,
          name,
          email,
        };
        user
          .getIdToken()
          .then((idToken) => {
            Axios.get('http://localhost:3001/api/auth', {
              headers: {
                Authorization: idToken,
              },
            })
              .then(() => {
                Axios.post('http://localhost:3001/api/user', userInitialData);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      user
        .getIdToken()
        .then((idToken) => {
          Axios.get('http://localhost:3001/api/auth', {
            headers: {
              Authorization: idToken,
            },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const logout = () => {
    return auth.signOut();
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
