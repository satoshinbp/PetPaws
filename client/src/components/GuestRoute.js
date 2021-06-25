import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <div className="wrapper--narrow">
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? <Redirect to="/dashboard" /> : <Component {...props} />;
        }}
      ></Route>
    </div>
  );
}
