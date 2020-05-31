import React, { useState, FC, useContext } from "react";
import { PatientIndexContext } from "../../../contexts/PatientIndexContext";
import { Redirect } from "react-router-dom";
type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const DeleteRecord: FC = (): JSX.Element => {
	const { index, changeIndex } = useContext(PatientIndexContext);
	const handleForm = async (event: MouseEvent): Promise<void> => {
		event.preventDefault();

		const config = {
			method: "DELETE",
			headers: { "Content-Type": "application/json;charset=utf-8" },
		};

		const response = await fetch(`http://localhost:3001/${index}`, config);
		if (response.ok) {
			console.log(`Record was deleted ${response.body}`);
		} else {
			console.log(`ERROR: ${response.status}`);
		}
		changeIndex("");
	};

	const form: JSX.Element = (
		<>
			<form>
				<input
					type="text"
					name="index"
					placeholder="Rekord do usunięcia"
					value={index}
					disabled
				/>

				<button type="submit" onClick={(event) => handleForm(event)}>
					Usuń rekord
				</button>
			</form>
		</>
	);

	return <div>{form}</div>;
};

export default DeleteRecord;
