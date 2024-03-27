import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients-full";
import { Patient, PatientNoSSN, NewPatient, Entry, NewEntry } from "../types";

const patients: Patient[] = patientsData;

const getEntries = (): PatientNoSSN[] => {
  const map = patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  );
  return map;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = findById(id);
  if (patient && patient.entries) {
    patient.entries.push(newEntry);
  }
  return newEntry;
};

const findById = (id: string): PatientNoSSN | undefined => {
  let patient = patients.find((patient) => patient.id === id);
  if (patient && !patient.entries) {
    patient = {
      ...patient,
      entries: [],
    };
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getEntries, findById, addPatient, addEntry };
