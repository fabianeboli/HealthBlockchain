import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DoctorHub from "./components/DoctorHub/DoctorHub";
import PatientHub from "./components/PatientHub/PatientHub";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PatientIndexProvider } from "./contexts/PatientIndexContext";

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
            <PatientIndexProvider>
              <Route path="/patient">
                <PatientHub />
              </Route>
            </PatientIndexProvider>
            <Route path="/doctor">
              <DoctorHub />
            </Route>
            <Route path="/">{/* <Home /> */}</Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
