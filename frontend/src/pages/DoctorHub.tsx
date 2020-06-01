import React, { useState, useContext } from "react";
import ReadRecord from "../components/ReadRecord/ReadRecord";
import UpdateRecord from "../components/DoctorHub/UpdateRecord/UpdateRecord";
import { PatientIndexContext } from "../contexts/PatientIndexContext";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { useStyles } from "../styles";

const DoctorHub = () => {
	//material
	const classes = useStyles();

	//style
	const [toggleReadRecord, setToggleReadRecord] = useState<boolean>(false);
	const [toggleAddRecord, setToggleAddRecord] = useState<boolean>(false);
	const { changeIndex } = useContext(PatientIndexContext);

	return (
		<div className={classes.root}>
			{changeIndex("")}
			<Typography variant="h4">Twoje Menu</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setToggleReadRecord(!toggleReadRecord)}
			>
				{" "}
				{toggleReadRecord ? `Zamknij` : `Odczytaj rekord`}
			</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setToggleAddRecord(!toggleAddRecord)}
			>
				{" "}
				{toggleAddRecord ? `Zamknij formularz` : `Dodaj nowe badanie`}
			</Button>
			{toggleReadRecord && <ReadRecord />} 
			{toggleAddRecord && <UpdateRecord />}
		</div>
	);
};

export default DoctorHub;
