import React from 'react';
import logo from './logo.svg';
import './App.css';
import DoctorHub from './components/DoctorHub/DoctorHub';
import PatientHub from './components/PatientHub/PatientHub';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
   
      <div className="App">
       <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/doctor">Doktor</Link>
            </li>
            <li>
              <Link to="/patient">Pacjent</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/patient">
            <PatientHub />
          </Route>
          <Route path="/doctor">
            <DoctorHub />
          </Route>
          <Route path="/">
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  
    </div>
  );
}

export default App;
