import express from "express";
import { create } from "../src/create";
import { RecordData } from "../types";
const router = express.Router();

router.get("/create", (req, res) => {
  const {
    index,
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
  create(index, recordData);
});
