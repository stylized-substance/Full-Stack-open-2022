import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = patientsService.getEntries();
  res.send(result);
});

router.get("/:id", (req, res) => {
  const result = patientsService.findById(req.params.id);
  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsService.addPatient(newPatient);
  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  const newEntry = toNewEntry(req.body)
  const addedEntry = patientsService.addEntry(newEntry)
  res.json(addedEntry);
});

export default router;
