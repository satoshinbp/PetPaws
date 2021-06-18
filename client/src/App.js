import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import PetProfile from './pages/PetProfile'
import Dashboard from './pages/Dashboard'
import MealSummary from './pages/MealSummary'
import WalkSummary from './pages/WalkSummary'
import CreateMeal from './pages/CreateMeal'
import CreateWalk from './pages/CreateWalk'
import MealForm from './components/tracker/MealForm'
import WalkForm from './components/tracker/WalkForm'

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Oops... {error.message}</div>

  const Routes = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/nutrition" component={Nutrition} />
        <Route path="/pet_profile" component={PetProfile} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/mealsummary" component={MealSummary} />
        <Route path="/walksummary" component={WalkSummary} />
        <Route path="/createmeal" component={CreateMeal} />
        <Route path="/createwalk" component={CreateWalk} />
        <Route path="/MealForm" component={MealForm} />
        <Route path="/WalkForm" component={WalkForm} />
      </Switch>
    </Router>
  )

  if (isAuthenticated) {
    return (
      <>
        <div>
          Hello {user.name}{' '}
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        </div>
        <Routes />
      </>
    )
  } else {
    return (
      <>
        <button onClick={loginWithRedirect}>Log in</button>
        <Routes />
      </>
    )
  }
}

export default App
