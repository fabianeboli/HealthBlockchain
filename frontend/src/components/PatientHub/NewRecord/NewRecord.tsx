import React, { useState, FC, useContext } from "react";
import { RecordData, Gender } from "../../../types";
import { PatientIndexContext } from "../../../contexts/PatientIndexContext";
import { Redirect } from "react-router-dom";
import {
	TextField,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Grid,
	Typography,
	FormControl,
} from "@material-ui/core";
import { SubmitButton, useStyles } from "../../../styles";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const NewRecord: FC = (): JSX.Element => {
	// Material UI
	const classes = useStyles();

	// states
	const { index, changeIndex } = useContext(PatientIndexContext);

	const [firstName, setFirstName] = useState<RecordData["firstName"]>("");
	const [lastName, setLastName] = useState<RecordData["lastName"]>("");
	const [pesel, setPesel] = useState<RecordData["pesel"]>("");
	const [gender, setGender] = useState<RecordData["gender"]>(Gender.male);
	const [dateOfBirth, setDateOfBirth] = useState<RecordData["dateOfBirth"]>("01-01-1991");

	const [error, setError] = useState<string>("");

	const handleForm = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();
		const index = Math.floor(Math.random() * 1000000 + 1);
		const record: RecordData = {
			firstName,
			lastName,
			pesel,
			gender,
			dateOfBirth,
			medicalHistory: [],
		};
		const config = {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({ index, record }),
		};

		const response = await fetch("http://localhost:3001/", config);

		if (response.ok) {
			console.log(`Record was created ${response.body}`);
			await changeIndex(String(index));
			console.log(`Twój indeks to ${index}`);
		} else {
			setError(`ERROR: ${response.statusText}`);
			console.log(`ERROR: ${response.status}`);
		}
	};

	const form: JSX.Element = (
		<>
			<form className={classes.root}>
				<TextField
					type="text"
					name="firstName"
					label="Imię"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
					required
				/>
				<TextField
					type="text"
					name="lastName"
					label="Nazwisko"
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
					required
				/>
				<TextField
					type="text"
					name="pesel"
					label="PESEL"
					value={pesel}
					onChange={(event) => setPesel(event.target.value)}
					required
				/>
				<FormControl>
					<FormLabel>Płeć</FormLabel>
					<RadioGroup row>
						<FormControlLabel
							value="female"
							control={<Radio color="primary" />}
							label="Kobieta"
							labelPlacement="start"
						/>
						<FormControlLabel
							value="male"
							control={<Radio color="primary" />}
							label="Meżczyzna"
							labelPlacement="start"
						/>
					</RadioGroup>
				</FormControl>

				<TextField
					type="date"
					name="dateOfBirth"
					label="Data urodzenia"
					value={dateOfBirth}
					onChange={(event) => setDateOfBirth(event.target.value)}
					InputLabelProps={{
						shrink: true,
					}}
					required
				/>

				<SubmitButton
					variant="contained"
					color="primary"
					type="submit"
					onClick={(event) => handleForm(event)}
				>
					Dodaj Rekord
				</SubmitButton>
			</form>
		</>
	);

	return (
		<div>
			<h1>Dodaj nowy rekord</h1>
			{index && <Redirect to="/patient" />}
			{!index && form}
			{error && <Typography variant="h4">Błąd: {error}</Typography>}
		</div>
	);
};

export default NewRecord;
