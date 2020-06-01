import { create } from "../src/create";
import { remove } from "../src/remove";
import { check } from "../src/check";
import { update } from "../src/update";
import { query } from "../src/query";

const createRecord = async (req, res) => {
	const { index, record } = req.body;
	const newRecord = await create(String(index), record);
	console.log(record);
	if (newRecord && Object.values(record).every((input: any) => input !== "")) {
		console.log(`NEW RECORD: INDEKS: ${index}\n VALUE: ${record}`);
		res.status(200).end();
	} else {
		res.status(400).end();
	}
};

const readRecord = async (req, res) => {
	const { index } = req.params;
	const text = await query(index);
	if (text) {
		res.send(text);
		res.status(200).end();
	} else {
		res.status(400).end();
		res.send("PATIENT NOT FOUND");
	}
};

const updateRecord = async (req, res) => {
	const { index } = req.params;
	const updatedPatientData = req.body;
	console.log("UPDATED RECORD: \n ", updatedPatientData);

	const updatedRecord = await update(index, updatedPatientData);
	if (updatedRecord && Object.values(updatedPatientData).every((input: any) => input !== "")) {
		res.status(200).end();
	} else {
		res.status(400).end();
	}
};

const deleteRecord = async (req, res) => {
	const { index } = req.params;
	console.log(index);
	remove(index);
	const checkIfExists = await check(index);
	if (!checkIfExists) {
		console.log("RECORD NO LONGER EXISTS");
		res.status(400);
	} else {
		console.log("Record exists");
	}
};

export default { deleteRecord, updateRecord, readRecord, createRecord };
