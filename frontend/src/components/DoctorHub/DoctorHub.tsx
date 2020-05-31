import React, { useState } from "react";
import ReadRecord from "../ReadRecord";
import UpdateRecord from "./UpdateRecord/UpdateRecord";

const DoctorHub = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<div>
			<button onClick={() => setToggle(!toggle)}>
				{" "}
				{toggle ? `Zamknij` : `Oczytaj rekord`}
			</button>
			{toggle && <ReadRecord />} <UpdateRecord />
		</div>
	);
};

export default DoctorHub;
