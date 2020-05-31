import React, { useState, FC, useContext } from "react";
import { RecordData, Gender } from "../../../types";
import { PatientIndexContext } from "../../../contexts/PatientIndexContext";
import { Redirect } from "react-router-dom";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const NewRecord: FC = (): JSX.Element => {
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

	

		if (response.ok ) {
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
			<form>
				<input
					type="text"
					name="firstName"
					placeholder="Imię"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
					required
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Nazwisko"
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
					required
				/>
				<input
					type="text"
					name="pesel"
					placeholder="PESEL"
					min="11"
					max="11"
					value={pesel}
					onChange={(event) => setPesel(event.target.value)}
					required
				/>

				<label htmlFor="gender">Mężczyzna</label>
				<input
					type="radio"
					name="gender"
					value={Gender.male}
					onChange={() => setGender(Gender.male)}
					required
				/>
				<label htmlFor="gender">Kobieta</label>
				<input
					type="radio"
					name="gender"
					value={Gender.female}
					onChange={() => setGender(Gender.female)}
					required
				/>
				<label htmlFor="dateOfBirth"> Data urodzenia</label>
				<input
					type="date"
					name="dateOfBirth"
					placeholder="Data urodzenia"
					value={dateOfBirth}
					onChange={(event) => setDateOfBirth(event.target.value)}
					required
				/>
				<button type="submit" onClick={(event) => handleForm(event)}>
					Dodaj Rekord
				</button>
			</form>
		</>
	);

	return (
		<div>
			<h1>Dodaj nowy rekord</h1>
			{index && <Redirect to="/patient" />}
			{!index && form}
			{error && <h1>Błąd: {error}</h1>}
		</div>
	);
};

export default NewRecord;
