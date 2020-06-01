import React from "react";

import "./App.css";
import DoctorHub from "./pages/DoctorHub";
import PatientHub from "./pages/PatientHub";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PatientIndexProvider } from "./contexts/PatientIndexContext";
import NewRecord from "./components/PatientHub/NewRecord/NewRecord";
import ReadRecord from "./components/ReadRecord/ReadRecord";
import UpdateRecord from "./components/DoctorHub/UpdateRecord/UpdateRecord";
import DeleteRecord from "./components/PatientHub/DeleteRecord/DeleteRecord";
import Main from "./pages/Main";
import { teal } from "@material-ui/core/colors";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	ListItem,
	ListItemText,
	Paper,
} from "@material-ui/core";
import { mainUseStyles as useStyles } from "./styles";
import { LocalHospitalRounded } from "@material-ui/icons";

function App() {
	const classes = useStyles();

	return (
		<div className="App">
			<Router>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<LocalHospitalRounded style={{ color: teal[400], fontSize: 40 }} />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							System medyczny
						</Typography>
						<ListItem button component={Link} alignItems="center" to="/">
							<ListItemText style={{ textAlign: "center" }}>
								Strona Główna
							</ListItemText>
						</ListItem>
						<ListItem button component={Link} alignItems="center" to="/doctor">
							<ListItemText style={{ textAlign: "center" }}>
								Strefa Lekarza
							</ListItemText>
						</ListItem>
						<ListItem button component={Link} alignItems="center" to="/patient">
							<ListItemText style={{ textAlign: "center" }}>
								Strefa Pacjenta
							</ListItemText>
						</ListItem>
					</Toolbar>
				</AppBar>

				<Switch>
					<Paper className={classes.paper}>
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
					</Paper>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
