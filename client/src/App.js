import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './styles/style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Calorie from './pages/Calorie';
import PetProfile from './pages/PetProfile';
import Contact from './pages/Contact';
import FindingPetStores from './pages/FindingPetStores';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import CalorieGuest from './pages/CalorieGuest';
import Dashboard from './pages/Dashboard';
import MealSummary from './pages/MealSummary';
import WalkSummary from './pages/WalkSummary.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <PrivateRoute exact path="/calorie" component={Calorie} />
          <GuestRoute exact path="/" component={Home} />
          <GuestRoute path="/calorieguest" component={CalorieGuest} />
          <PrivateRoute path="/pet_profile" component={PetProfile} />
          <Route path="/contact" component={Contact} />
          <Route path="/finding_stores" component={FindingPetStores} />
          <GuestRoute path="/signup" component={Signup} />
          <GuestRoute path="/signin" component={Signin} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/mealsummary" component={MealSummary} />
          <PrivateRoute path="/walksummary" component={WalkSummary} />
        </Switch>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
