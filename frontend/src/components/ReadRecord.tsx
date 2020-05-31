import React, { useEffect, useState, FC } from "react";
import { RecordData, Gender } from "../types";

const ReadRecord: FC = () => {
  const [patientData, setPatientData] = useState<RecordData>();
  const [index, setIndex] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const getPatientData = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    setLoader(true);
    const response: Response = await fetch(`http://localhost:3001/${index}`);
    if (response.ok) {
      const fetchedData = await response.json();
      const data = JSON.parse(fetchedData.value);

    
        setPatientData(data);
      
    } else {
      console.log(`ERROR: ${response.status}`);
    }
    setLoader(false);
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
          {record.medicalHistory.map((examination) => (
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
        <input
          type="text"
          name="index"
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button onClick={(event) => getPatientData(event)}>
          Sprawdź dane pacjenta
        </button>
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
            {/* {patientData} */}
          </>
        )
      )}
    </div>
  );
};

export default ReadRecord;
