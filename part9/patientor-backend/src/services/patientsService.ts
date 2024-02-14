import patientsData from '../../data/patients';
import { PatientNoSSN } from '../types';

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

export default { getEntries, findById };