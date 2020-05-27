import React from "react";
import "./App.css";
import DoctorHub from "./components/DoctorHub/DoctorHub";
import PatientHub from "./components/PatientHub/PatientHub";

function App() {
  return (
    <div className="App">
      <DoctorHub />
      <PatientHub />
    </div>
  );
}

export default App;
