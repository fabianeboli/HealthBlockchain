import React, { useState, FC, useContext } from "react";
import { PatientIndexContext } from "../../../contexts/PatientIndexContext";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { DangerButton } from "./DeleteRecord.style";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../../../styles";
import { Grid } from "@material-ui/core";
type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const DeleteRecord: FC = (): JSX.Element => {
	// Material ui
	const classes = useStyles();
	// States
	const { index, changeIndex } = useContext(PatientIndexContext);

	const [error, setError] = useState("");

	const handleForm = async (event: MouseEvent): Promise<void> => {
		setError("");
		event.preventDefault();

		const config = {
			method: "DELETE",
			headers: { "Content-Type": "application/json;charset=utf-8" },
		};

		const response = await fetch(`http://localhost:3001/${index}`, config);
		if (response.ok) {
			console.log(`Record was deleted ${response.body}`);
		} else {
			setError(`ERROR: ${response.statusText}`);
			console.error(`ERROR: ${response.status}`);
		}
		changeIndex("");
	};

	const form: JSX.Element = (
		<>
			<form className={classes.root}>
				<Grid container alignItems="center" justify="center">
					<TextField
						type="text"
						name="index"
						label="Rekord do usunięcia"
						value={index}
						disabled
					/>

					<DangerButton
						variant="contained"
						color="primary"
						type="submit"
						onClick={(event) => handleForm(event)}
					>
						Usuń rekord
					</DangerButton>
				</Grid>
			</form>
		</>
	);

	return (
		<div>
			{form}
			{error && <h1>Błąd: {error}</h1>}
		</div>
	);
};

export default DeleteRecord;
