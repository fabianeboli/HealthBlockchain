import React, { useContext } from "react";
import { PatientIndexContext } from "../contexts/PatientIndexContext";
import { Typography } from "@material-ui/core";

const Main = () => {
	const { changeIndex } = useContext(PatientIndexContext);

	return (
		<div>
			{changeIndex("")}
			<Typography variant="h3">
				Prototyp systemu medycznego korzystającego z Hypeledger Fabric
			</Typography>
			<Typography variant="h6">Autor: Fabian Eboli</Typography>
		</div>
	);
};

export default Main;
