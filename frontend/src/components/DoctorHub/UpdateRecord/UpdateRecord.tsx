import React, { useState, FC } from "react";
import { RecordData, Examination, Gender } from "../../../types";
import { stringify } from "querystring";

const UpdateRecord: FC = () => {
  const [index, setIndex] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  // const [firstName, setFirstName] = useState<RecordData["firstName"]>("");
  // const [lastName, setLastName] = useState<RecordData["lastName"]>("");
  // const [pesel, setPesel] = useState<RecordData["pesel"]>("");
  // const [gender, setGender] = useState<RecordData["gender"]>(Gender.male);
  // const [dateOfBirth, setDateOfBirth] = useState<RecordData["dateOfBirth"]>(
  //   "01-01-1991"
  // );
  const [medicalHistory, setMedicalHistory] = useState<Examination[]>([]);

  const [examinationName, setExaminationName] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [date] = useState<Date>(new Date());
  const [result, setResult] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const addExamination = async (
    firstName: RecordData["firstName"],
    lastName: RecordData["lastName"],
    pesel: RecordData["pesel"],
    dateOfBirth: RecordData["dateOfBirth"],
    gender: RecordData["gender"],
    examinationName: Examination["examinationName"],
    place: Examination["place"],
    date: Examination["date"],
    result: Examination["result"],
    prescription: Examination["prescription"],
    price: Examination["price"]
  ) => {
    const newExamination: Examination = {
      examinationName,
      place,
      date,
      result,
      prescription,
      price,
    };

    const updatedMedicalHistory: Examination[] = [
      ...medicalHistory,
      newExamination,
    ];

    setMedicalHistory(updatedMedicalHistory);

    const updatedPatientData: RecordData = {
      firstName,
      lastName,
      pesel,
      gender,
      dateOfBirth,
      medicalHistory: updatedMedicalHistory,
    };

    const config = {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(updatedPatientData),
    };

    const response: Response = await fetch(
      `http://localhost:3001/${index}`,
      config
    );
    console.log("I AM HERE");
    if (response.ok) {
      console.log("New examination has been added");
    } else {
      console.log(`ERROR: ${response.status}`);
    }
  };

  const handleForm = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    setLoader(true);
    const response: Response = await fetch(`http://localhost:3001/${index}`);
    if (response.ok) {
      console.log("OK");
      const fetchedData = await response.json();
      const data = JSON.parse(fetchedData.value);
      console.log(fetchedData);
      if ((data as RecordData).firstName) {
        // setFirstName(data.firstName);
        // setLastName(data.lastName);
        // setPesel(data.pesel);
        // setDateOfBirth(data.dateOfBirth);
        // setGender(data.gender);
        // setMedicalHistory(data.medicalHistory);
        addExamination(
          data.firstName,
          data.lastName,
          data.pesel,
          data.gender,
          data.dateOfBirth,
          examinationName,
          place,
          date,
          result,
          prescription,
          price
        );
      }
    } else {
      console.log(`ERROR: ${response.status}`);
    }
    setLoader(false);
  };

  const form: JSX.Element = (
    <>
      <form>
        <input
          type="text"
          name="index"
          placeholder="Indeks pacjenta"
          value={index}
          onChange={(event) => setIndex(event.target.value)}
          required
        />
        <input
          type="text"
          name="Examination"
          placeholder="Badanie"
          value={examinationName}
          onChange={(event) => setExaminationName(event.target.value)}
          required
        />
        <input
          type="text"
          name="date"
          placeholder="Miejsce badania"
          min="11"
          max="11"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
          required
        />

        <input
          type="text"
          name="result"
          placeholder="Wynik badania"
          min="11"
          max="11"
          value={result}
          onChange={(event) => setResult(event.target.value)}
          required
        />
        <input
          type="date"
          name="prescription"
          placeholder="Leki"
          value={prescription}
          onChange={(event) => setPrescription(event.target.value)}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="cena badania"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <button type="submit" onClick={(event) => handleForm(event)}>
          Dodaj nowe Badanie
        </button>
      </form>
    </>
  );

  return <div>{form}</div>;
};

export default UpdateRecord;
