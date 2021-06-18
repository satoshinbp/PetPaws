
import React from 'react';
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calorie from './pages/Calorie';
import PetProfile from './pages/PetProfile';
import Contact from './pages/Contact';
import FindingPetStores from './pages/FindingPetStores';
import { Auth0Provider } from '@auth0/auth0-react'
import Dashboard from './pages/Dashboard'
import MealSummary from './pages/MealSummary'
import WalkSummary from './pages/WalkSummary.js'
import CreateMeal from './pages/CreateMeal'
import CreateWalk from './pages/CreateWalk'
import MealForm from './components/tracker/MealForm'
import WalkForm from './components/tracker/WalkForm'


function App() {
  return (
    <Router>
      <Auth0Provider
        domain = {process.env.REACT_APP_AUTH_DOMAIN}
        clientId= {process.env.REACT_APP_AUTH_CLIENTID}
        redirectUri={window.location.origin}
      >
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/calorie" component={Calorie} />
          <Route path="/pet_profile" component={PetProfile} />
          <Route path="/contact" component={Contact} />
          <Route path="/finding_stores" component={FindingPetStores} />
          <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/mealsummary" component={MealSummary} />
        <Route path="/walksummary" component={WalkSummary} />
        <Route path="/createmeal" component={CreateMeal} />
        <Route path="/createwalk" component={CreateWalk} />
        <Route path="/MealForm" component={MealForm} />
        <Route path="/WalkForm" component={WalkForm} />
        </Switch>
      </Auth0Provider>
    </Router>  
  )
}

export default App;
