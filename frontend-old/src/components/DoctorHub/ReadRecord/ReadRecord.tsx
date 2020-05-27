import React, { useEffect, useState, FC } from "react";

interface props {
  index: string;
}

const ReadRecord: FC<props> = (props: props) => {
  const [patientData, setPatientData] = useState("");

  useEffect(() => {
    const getPatient = async () => {
      const response = await fetch(`http://localhost:3001/read/${props.index}`);

      if (response.ok) {
        const fetchedData = await response.json();
        setPatientData(fetchedData.value);
      } else {
        console.log(`ERROR: ${response.status}`);
      }
    };
    getPatient();
  }, []);

  return <div>Dane pacjenta: {patientData}</div>;
};

export default ReadRecord;
