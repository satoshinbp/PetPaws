import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import PetProfile from './pages/PetProfile'

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
          <Route path="/nutrition" component={Nutrition} />
          <Route path="/pet_profile" component={PetProfile} />
        </Switch>
      </Auth0Provider>
    </Router>
  )
}

export default App
