import React, { useContext } from "react";
import { PatientIndexContext } from "../../contexts/PatientIndexContext";

const Main = () => {
	const { changeIndex } = useContext(PatientIndexContext);

	return (
		<div>
			{changeIndex("")}
			<h1>Prototyp systemu medycznego korzystającego z Hypeledger Fabric</h1>
		</div>
	);
};

export default Main;
