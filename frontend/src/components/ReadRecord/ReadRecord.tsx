import React, { useState, FC, useContext } from "react";
import { RecordData, Examination } from "../../types";
import { PatientIndexContext } from "../../contexts/PatientIndexContext";
import {
	Table,
	TableContainer,
	Paper,
	TableHead,
	TableRow as StyledTableRow,
	TableCell,
	TableBody,
	TextField,
	Button,
} from "@material-ui/core";
import { useStyles } from "../../styles";
import { StyledTableCell } from "./ReadRecord.style";

const ReadRecord: FC = () => {
	// material
	const classes = useStyles();

	// states
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
			<>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<StyledTableRow>
								<StyledTableCell>Nazwa</StyledTableCell>
								<StyledTableCell>Dane</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							<StyledTableRow>
								<StyledTableCell>Imię</StyledTableCell>
								<StyledTableCell>{record.firstName}</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell>Nazwisko</StyledTableCell>
								<StyledTableCell>{record.lastName}</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell>PESEL</StyledTableCell>
								<StyledTableCell>{record.pesel}</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell>Płeć</StyledTableCell>
								<StyledTableCell>{record.gender}</StyledTableCell>
							</StyledTableRow>
							<StyledTableRow>
								<StyledTableCell>Data urodzenia</StyledTableCell>
								<StyledTableCell>{record.dateOfBirth}</StyledTableCell>
							</StyledTableRow>

							<TableHead>
								<StyledTableRow>
									<StyledTableCell>Historia Medyczna</StyledTableCell>
								</StyledTableRow>
								{record.medicalHistory.map((examination: Examination) => (
									<>
										<StyledTableRow>
											<StyledTableCell>Nazwa Badania:</StyledTableCell>
											<StyledTableCell>
												{examination.examinationName}
											</StyledTableCell>
										</StyledTableRow>
										<StyledTableRow>
											<StyledTableCell>Miejsce Badania</StyledTableCell>
											<StyledTableCell>${examination.place}</StyledTableCell>
										</StyledTableRow>
										<StyledTableRow>
											<StyledTableCell>Data: </StyledTableCell>
											<StyledTableCell>{examination.date}</StyledTableCell>
										</StyledTableRow>
										<StyledTableRow>
											<StyledTableCell>Wynik Badania:</StyledTableCell>
											<StyledTableCell>{examination.result}</StyledTableCell>
										</StyledTableRow>
										<StyledTableRow>
											<StyledTableCell>Recepta:</StyledTableCell>
											<StyledTableCell>
												{examination.prescription}
											</StyledTableCell>
										</StyledTableRow>
										<StyledTableRow>
											<StyledTableCell>Cena</StyledTableCell>
											<StyledTableCell>{examination.price}</StyledTableCell>
										</StyledTableRow>
									</>
								))}
							</TableHead>
						</TableBody>
					</Table>
				</TableContainer>
			</>
			/* <li>Imię: {record.firstName}</li>
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
			</ul> */
		);
	};

	const form: JSX.Element = (
		<>
			<form className={classes.textField}>
				{index ? (
					<TextField type="text" name="index" value={index} disabled />
				) : (
					<TextField
						type="text"
						name="index"
						value={localIndex}
						onChange={({ target }) => setLocalIndex(target.value)}
					/>
				)}

				<Button variant="contained" color="primary" onClick={(event) => handleForm(event)}>
					Sprawdź dane
				</Button>
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
