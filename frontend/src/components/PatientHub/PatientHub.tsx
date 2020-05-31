import React, { useState, useContext } from "react";
import NewRecord from "./NewRecord/NewRecord";
import DeleteRecord from "./DeleteRecord/DeleteRecord";
import ReadRecord from "../ReadRecord";
import {
  PatientIndexContext,
  
} from "../../contexts/PatientIndexContext";

const PatientHub = () => {
  const [toggle, setToggle] = useState(false);
  const { index, changeIndex } = useContext(PatientIndexContext);
  return (
    <>
     
      {console.log("INDEX CONTEXT: ", index)}
        <div>
          {index && <h1>Twój indeks to: {index}</h1>}
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? `Zamknij` : `Stwórz rekord`}
          </button>
          {toggle && <NewRecord />}
          {index && (
            <>
              {" "}
              <ReadRecord />
              <DeleteRecord />{" "}
            </>
          )}
        </div>
     
    </>
  );
};

export default PatientHub;
