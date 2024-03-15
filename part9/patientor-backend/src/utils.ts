import { NewPatient } from "./types";
import { Gender } from "./types";
import { BaseEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheck, NewEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect date of birth");
  }

  return dateOfBirth;
};

const parsSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation");
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid or missing gender");
  }

  return gender;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("incorrect specialist")
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("incorrect description")
  }

  return description;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string => {
  if (!isString(diagnosisCodes)) {
    throw new Error("incorrect diagnosisCodes")
  }

  return diagnosisCodes;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("incorrect employerName")
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): string => {
  if (!isString(sickLeave)) {
    throw new Error("incorrect sickLeave")
  }

  return sickLeave;
};

const parseDischarge = (discharge: unknown): string => {
  if (!isString(discharge)) {
    throw new Error("incorrect discharge")
  }

  return discharge;
};

const parseHealthCheckRating = (healthCheckRating: unknown): string => {
  if (!isString(healthCheckRating)) {
    throw new Error("incorrect healthCheckRating")
  }

  return healthCheckRating;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parsSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatient;
  } else {
    throw new Error("Incorrect data, some fields are missing");
  }
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (object.diagnosisCodes) {
    //diagnosisCodes here
  }

  switch (object.type) {
    case "OccupationalHealthcare":
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "employerName" in object
      ) {
        const newEntry: NewEntry = {
          specialist: parseSpecialist(object.specialist),
          description: parseDescription(object.description),
        };
    
        return newPatient;
      } else {
        throw new Error("Incorrect data, some fields are missing");
      }
    case "Hospital":
    case "HealthCheck":
    default:
      break;
  }
}

export default toNewPatient;
