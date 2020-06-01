import React, { useState, FC } from "react";
import { RecordData, Examination } from "../../../types";
import moment from "moment";
import "moment/locale/pl";
import { Input, Button, TextField, Grid } from "@material-ui/core";
import { SubmitButton, useStyles } from "../../../styles";

const UpdateRecord: FC = () => {
	// Material UI
	const classes = useStyles();

	// States
	const [index, setIndex] = useState<string>("");
	const [loader, setLoader] = useState<boolean>(false);
	const [medicalHistory, setMedicalHistory] = useState<Examination[]>([]);
	const [examinationName, setExaminationName] = useState<string>("");
	const [place, setPlace] = useState<string>("");
	const [result, setResult] = useState<string>("");
	const [prescription, setPrescription] = useState<string>("");
	const [price, setPrice] = useState<string>("");

	const [error, setError] = useState<string>("");

	const addExamination = async (
		firstName: RecordData["firstName"],
		lastName: RecordData["lastName"],
		pesel: RecordData["pesel"],
		dateOfBirth: RecordData["dateOfBirth"],
		gender: RecordData["gender"],
		examinationName: Examination["examinationName"],
		place: Examination["place"],
		date: Examination["date"],
		result: Examination["result"],
		prescription: Examination["prescription"],
		price: Examination["price"],
	) => {
		const newExamination: Examination = {
			examinationName,
			place,
			date,
			result,
			prescription,
			price,
		};

		const updatedMedicalHistory: Examination[] = [...medicalHistory, newExamination];

		setMedicalHistory(updatedMedicalHistory);

		const updatedPatientData: RecordData = {
			firstName,
			lastName,
			pesel,
			gender,
			dateOfBirth,
			medicalHistory: updatedMedicalHistory,
		};

		const config = {
			method: "PUT",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(updatedPatientData),
		};

		const response: Response = await fetch(`http://localhost:3001/${index}`, config);
		console.log("I AM HERE");
		if (response.ok) {
			console.log("New examination has been added");
		} else {
			setError(`ERROR: ${response.statusText}`);
			console.error(`ERROR: ${response.status}`);
		}
	};

	const handleForm = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	): Promise<void> => {
		event.preventDefault();
		setError("")
		setLoader(true);
		const response: Response = await fetch(`http://localhost:3001/${index}`);
		if (response.ok) {
			console.log("OK");
			const fetchedData = await response.json();
			const { firstName, lastName, pesel, gender, dateOfBirth, medicalHistory } = JSON.parse(
				fetchedData.value,
			);
			setMedicalHistory(medicalHistory);
			console.log(fetchedData);
			addExamination(
				firstName,
				lastName,
				pesel,
				gender,
				dateOfBirth,
				examinationName,
				place,
				moment().format("LLLL"),
				result,
				prescription,
				price,
			);
		} else {
			console.log(`ERROR: ${response.status}`);
		}
		setLoader(false);
	};

	const form: JSX.Element = (
		<>
			<form className={classes.textField}>
			
				<TextField
					type="text"
					name="index"
					label="Indeks pacjenta"
					value={index}
					onChange={(event) => setIndex(event.target.value)}
					required
				/>
				<TextField
					type="text"
					name="Examination"
					label="Badanie"
					value={examinationName}
					onChange={(event) => setExaminationName(event.target.value)}
					required
				/>
				<TextField
					type="text"
					name="date"
					label="Miejsce badania"
					value={place}
					onChange={(event) => setPlace(event.target.value)}
					required
				/>

				<TextField
					type="text"
					name="result"
					label="Wynik badania"
					value={result}
					onChange={(event) => setResult(event.target.value)}
					required
				/>
				<TextField
					type="text"
					name="prescription"
					label="Recepta"
					value={prescription}
					onChange={(event) => setPrescription(event.target.value)}
					required
				/>
				<TextField
					type="text"
					name="price"
					label="Cena badania"
					value={price}
					onChange={(event) => setPrice(event.target.value)}
					required
				/>
			
				
				<div>
					<SubmitButton
						variant="contained"
						color="primary"
						type="submit"
						onClick={(event) => handleForm(event)}
					>
						Dodaj nowe Badanie
					</SubmitButton>
				</div>
			</form>
		</>
	);

	return (
		<div>
			{form}
			{loader && <h1>Dodawanie nowego badania...</h1>}
			{error && <h1>Błąd: {error}</h1>}
		</div>
	);
};

export default UpdateRecord;
