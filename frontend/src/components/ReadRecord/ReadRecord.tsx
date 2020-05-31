import React, { useState, FC, useContext } from "react";
import { RecordData, Examination } from "../../types";
import { PatientIndexContext } from "../../contexts/PatientIndexContext";

const ReadRecord: FC = () => {
	const [patientData, setPatientData] = useState<RecordData>();
	const { index } = useContext(PatientIndexContext);
	const [localIndex, setLocalIndex] = useState<string>(index);

	const [loader, setLoader] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const fetchPatientData = async (index: string) => {
		setLoader(true);
		const response: Response = await fetch(`http://localhost:3001/${index}`);

		if (response.ok) {
			console.log("DATA IS FETCHED");
			const fetchedData = await response.json();
			const data = JSON.parse(fetchedData.value);
			setPatientData(data);
		} else {
			setError(`Błąd: ${response.status}`);
			console.error(`ERROR: ${response.status}`);
		}
		setLoader(false);
	};

	const handleForm = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	): Promise<void> => {
		event.preventDefault();
		fetchPatientData(localIndex);
	};

	const presentData = (record: RecordData) => {
		return (
			<ul>
				<li>Imię: {record.firstName}</li>
				<li>Nazwisko: {record.lastName}</li>
				<li>Płeć: {record.gender}</li>
				<li>PESEL: {record.pesel}</li>
				<li>
					Historia medyczna:{" "}
					{record.medicalHistory.map((examination: Examination) => (
						<ul>
							<li>Nazwa Badania: {examination.examinationName} </li>
							<li>Miejsce Badania {examination.place} </li>
							<li>Data: {examination.date} </li>
							<li>Wynik Badania: {examination.result} </li>
							<li>Recepta: {examination.prescription} </li>
							<li>Cena: {examination.price} </li>
						</ul>
					))}
				</li>
			</ul>
		);
	};

	const form: JSX.Element = (
		<>
			<form>
				{index ? (
					<input type="text" name="index" value={index} disabled />
				) : (
					<input
						type="text"
						name="index"
						value={localIndex}
						onChange={({ target }) => setLocalIndex(target.value)}
					/>
				)}

				<button onClick={(event) => handleForm(event)}>Sprawdź dane</button>
			</form>
		</>
	);

	return (
		<div>
			{form}
			{loader ? (
				<h1>Ładowanie...</h1>
			) : (
				patientData && (
					<>
						<h1>Dane Pacjenta</h1> {presentData(patientData)}
					</>
				)
			)}
			{error && <h1>{error}</h1>}
		</div>
	);
};

export default ReadRecord;
