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
  const { index } = req.params;
  const updatedPatientData = req.body;
  update(index, updatedPatientData);
});

router.post("/", (req, res): void => {
  const index = Math.floor(Math.random() * 10000);

  const {
    firstName,
    lastName,
    pesel,
    gender,
    dateOfBirth,
    medicalHistory,
  } = req.body;
  const recordData: RecordData = {
    firstName,
    lastName,
    pesel,
    gender,
    dateOfBirth,
    medicalHistory,
  };
  create(String(index), recordData);
  res.status(201);
  console.log("CREATED A RECORD");
});

router.get(
  "/:index",
  async (req, res): Promise<void> => {
    const { index } = req.params;
    const text = await query(index);
    if (text) {
      console.log("TEXT: ", text);
      res.send(text);
    } else {
      res.status(400);
      res.send("PATIENT NOT FOUND");
    }
  }
);

export default router;
