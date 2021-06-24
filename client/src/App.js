import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";

import Home from "./pages/Home";
import Calorie from "./pages/Calorie";
import PetProfile from "./pages/PetProfile";
import Contact from "./pages/Contact";
import FindingPetStores from "./pages/FindingPetStores";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <PrivateRoute exact path="/calorie" component={Calorie} />
          <GuestRoute exact path="/" component={Home} />
          {/* <Route path="/calorie" component={Calorie} /> */}
          <PrivateRoute path="/pet_profile" component={PetProfile} />
          <Route path="/contact" component={Contact} />
          <Route path="/finding_stores" component={FindingPetStores} />
          <GuestRoute path="/signup" component={Signup} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
