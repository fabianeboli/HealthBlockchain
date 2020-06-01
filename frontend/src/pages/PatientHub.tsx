import React, { useState, useContext } from "react";
import { PatientIndexContext } from "../contexts/PatientIndexContext";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";

const PatientHub = () => {
	const [toggle, setToggle] = useState(false);
	const { index, changeIndex } = useContext(PatientIndexContext);
	const classes = useStyles();

	const open = (
		<>
			<Typography variant="h4">Nie masz jeszcze swojego rekordu</Typography>
			<Link to="/patient/newrecord">
				<Button variant="contained" color="primary" onClick={() => setToggle(!toggle)}>
					Stwórz nowy rekord
				</Button>
			</Link>
		</>
	);

	const close = (
		<Link to="/patient/">
			<Button variant="contained" color="primary" onClick={() => setToggle(!toggle)}>
				Zamknij
			</Button>
		</Link>
	);

	return (
		<>
			{index ? (
				<>
				<Typography variant="h4">Twoje Menu</Typography>
				<Typography variant="h6">Twój indeks to: {index}</Typography>
				</>
			) : toggle ? (
				close
			) : (
				open
			)}
			<Grid justify="center" alignItems="center" spacing={3}>
				{index && (
					<div className={classes.root}>
						{" "}
						<Link to="/patient/readrecord">
							<Button variant="contained" color="primary">
								Odczytaj swoje dane
							</Button>
						</Link>
						<Link to="/patient/deleterecord">
							<Button variant="contained" color="primary">
								Usuń swoje dane
							</Button>
						</Link>
					</div>
				)}
			</Grid>
		</>
	);
};

export default PatientHub;
