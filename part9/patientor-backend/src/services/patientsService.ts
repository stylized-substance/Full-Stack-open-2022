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

export default { getEntries };