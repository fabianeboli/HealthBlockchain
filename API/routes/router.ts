import { Examination } from "./../../frontend/src/types";
import { remove } from "./../src/remove";
import { check } from "./../src/check";
import express, { json } from "express";
import { create } from "../src/create";
import { RecordData } from "../types";
import { query } from "../src/query";
import { update } from "../src/update";
const router = express.Router();

router.delete("/:index", async (req, res) => {
  const { index } = req.params;
  console.log(index);
  remove(index);
  const checkIfExists = await check(index);
  if (!checkIfExists) {
    console.log("RECORD NO LONGER EXIST");
    res.status(400);
  } else {
    console.log("Record exists");
  }
});

router.put("/:index", (req, res) => {
  console.warn("UPDATING A RECORD")
  const { index } = req.params;
  const  updatedPatientData = req.body;
  console.log("DATA ", updatedPatientData);
  console.log("------------- UPDATED: ---------------------------------- \n ", updatedPatientData);
  update(index, updatedPatientData);
  res.status(200).end();
});

router.post("/", (req, res): void => {
  console.log("CREATING A NEW RECORD")
  const {
    index,
    record
  } = req.body;
  console.log(`NEW RECORD: INDEKS: ${index}\n VALUE: ${record}`)
  create(String(index), record);
  console.log("CREATED A RECORD");
  res.status(201).end();
});

router.get(
  "/:index",
  async (req, res): Promise<void> => {
    const { index } = req.params;
    const text = await query(index);
    if (text) {
      //console.log("TEXT: ", text);
      res.send(text);
    } else {
      res.status(400);
      res.send("PATIENT NOT FOUND");
    }
  }
);

export default router;
