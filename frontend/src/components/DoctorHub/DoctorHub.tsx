import React, { useState, useContext } from "react";
import ReadRecord from "../ReadRecord/ReadRecord";
import UpdateRecord from "./UpdateRecord/UpdateRecord";
import { PatientIndexContext } from "../../contexts/PatientIndexContext";

const DoctorHub = () => {
	const [toggle, setToggle] = useState(false);
  const { changeIndex } = useContext(PatientIndexContext);
  
	return (
		<div>
			{changeIndex("")}
			<button onClick={() => setToggle(!toggle)}>
				{" "}
				{toggle ? `Zamknij` : `Oczytaj rekord`}
			</button>
			{toggle && <ReadRecord />} <UpdateRecord />
		</div>
	);
};

export default DoctorHub;
