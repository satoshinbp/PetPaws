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

  function signup(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        user.updateProfile({
          displayName: name,
        });
        const uid = user.uid;
        const userInitialData = {
          uid: uid,
          name: name,
          email: email,
        };
        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            Axios.get('http://localhost:3001/api/auth', {
              headers: {
                Authorization: idToken,
              },
            }).then(() => {
              Axios.post('http://localhost:3001/api/user', userInitialData);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
      auth.currentUser
        .getIdToken(true)
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
  }

  function logout() {
    return auth.signOut();
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

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
