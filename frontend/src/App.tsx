import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import DoctorHub from "./components/DoctorHub/DoctorHub";
import PatientHub from "./components/PatientHub/PatientHub";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PatientIndexProvider } from "./contexts/PatientIndexContext";
import NewRecord from "./components/PatientHub/NewRecord/NewRecord";
import ReadRecord from "./components/ReadRecord/ReadRecord";
import UpdateRecord from "./components/DoctorHub/UpdateRecord/UpdateRecord";
import DeleteRecord from "./components/PatientHub/DeleteRecord/DeleteRecord";
import Main from "./components/Main/Main";

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home </Link>
							</li>
							<li>
								<Link to="/doctor">Doktor </Link>
							</li>
							<li>
								<Link to="/patient">Pacjent</Link>
							</li>
						</ul>
					</nav>

					<Switch>
						<PatientIndexProvider>
							<Route path="/patient">
								<PatientHub />
							</Route>
							<Route path="/patient/newrecord">
								<NewRecord />{" "}
							</Route>
							<Route path="/patient/readrecord">
								<ReadRecord />{" "}
							</Route>
							<Route path="/patient/deleterecord">
								<DeleteRecord />{" "}
							</Route>

							<Route path="/doctor">
								<DoctorHub />
							</Route>
							<Route path="/doctor/updaterecord">
								<UpdateRecord />
							</Route>
							<Route path="/doctor/readrecord">
								<ReadRecord />{" "}
							</Route>
							<Route path="/" exact>
								{" "}
								<Main />{" "}
							</Route>
						</PatientIndexProvider>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
