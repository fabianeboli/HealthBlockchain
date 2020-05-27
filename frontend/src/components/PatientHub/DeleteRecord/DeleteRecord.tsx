import React, { useState, FC } from "react";
import { RecordData, Gender } from "../../../types";

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const DeleteRecord: FC = (): JSX.Element => {
  const [index, setIndex] = useState<string>("");
 

  const handleForm = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      
    };
    console.log("HEREEE", index);
    const response = await fetch(`http://localhost:3001/${index}`, config);
    if (response.ok) {
      console.log(`Record was deleted ${response.body}`);
    } else {
      console.log(`ERROR: ${response.status}`);
    }
  };

  const form: JSX.Element = (
    <>
      <form>
        <input
          type="text"
          name="index"
          placeholder="Rekord do usunięcia"
          value={index}
          onChange={(event) => setIndex(event.target.value)}
          required
          min="1"
        />
    
        <button type="submit" onClick={(event) => handleForm(event)}>
         Usuń rekord
        </button>
      </form>
    </>
  );

  return <div>{form}</div>;
};

export default DeleteRecord;
