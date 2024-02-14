import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, PatientNoSSN, NewPatient } from '../types';

const patients: PatientNoSSN[] = patientsData;

const getEntries = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientNoSSN | undefined => {
  const patient = patients.find((patient) => patient.id === id);
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