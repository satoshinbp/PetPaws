import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './pages/Home'

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Oops... {error.message}</div>

  if (isAuthenticated) {
    return (
      <>
        <div>
          Hello {user.name}{' '}
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        </div>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </>
    )
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>
  }
}

export default App
