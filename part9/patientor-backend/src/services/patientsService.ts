import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients-full";
import { Patient, PatientNoSSN, NewPatient } from "../types";

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

export default { getEntries, findById, addPatient };
