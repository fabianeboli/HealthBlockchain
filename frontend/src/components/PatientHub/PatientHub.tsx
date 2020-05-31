import React, { useState, useContext } from "react";
import NewRecord from "./NewRecord/NewRecord";
import DeleteRecord from "./DeleteRecord/DeleteRecord";
import ReadRecord from "../ReadRecord/ReadRecord";
import { PatientIndexContext } from "../../contexts/PatientIndexContext";
import { Route, Link } from "react-router-dom";

const PatientHub = () => {
	const [toggle, setToggle] = useState(false);
	const { index, changeIndex } = useContext(PatientIndexContext);

	const open = (
		<Link to="/patient/newrecord">
			<button onClick={() => setToggle(!toggle)}>Stwórz nowy rekord</button>
		</Link>
	);

	const close = (
		<Link to="/patient/">
			<button onClick={() => setToggle(!toggle)}>Zamknij</button>
		</Link>
	);

	return (
		<>
			<div>
				{index && <h1>Twój indeks to: {index}</h1>}

				{toggle ? close : open}

				{index && (
					<>
						{" "}
						<Link to="/patient/readrecord">
							<button>Odczytaj swoje dane</button>
						</Link>
						<Link to="/patient/deleterecord">
							<button>Usuń swoje dane</button>
						</Link>
					</>
				)}
			</div>
		</>
	);
};

export default PatientHub;
