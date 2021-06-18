import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import PetProfile from './pages/PetProfile'

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/nutrition" component={Nutrition} />
        <Route path="/pet_profile" component={PetProfile} />
      </Switch>
    </Router>
  )
}

export default App
