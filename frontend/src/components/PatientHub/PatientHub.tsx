import React, { useState } from "react";
import NewRecord from "./NewRecord/NewRecord";
import DeleteRecord from "./DeleteRecord/DeleteRecord";
import ReadRecord from "../ReadRecord";

const PatientHub = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? `Zamknij` : `Stwórz rekord`}
      </button>
      {toggle && <NewRecord />}
      <ReadRecord/>
      <DeleteRecord/>
      {/* <button>
                Odczytaj swoje dane
            </button> */}
    </div>
  );
};

export default PatientHub;
