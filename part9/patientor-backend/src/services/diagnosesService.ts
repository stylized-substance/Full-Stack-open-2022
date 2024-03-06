import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const getOne = (code: string): Diagnosis | undefined => {
  return diagnoses.find((diagnosis) => diagnosis.code === code);
};

export default { getEntries, getOne };
