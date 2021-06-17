import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


ReactDOM.render(
  <Router>
    <Auth0Provider
      domain = {process.env.REACT_APP_AUTH_DOMAIN}
      clientId= {process.env.REACT_APP_AUTH_CLIENTID}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
