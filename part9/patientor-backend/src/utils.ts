import {
  Diagnosis,
  HealthCheck,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
} from "./types";
import { Gender } from "./types";
import { NewEntry, SickLeave } from "./types";

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

const isObject = (input: unknown): input is object => {
  return input !== null && typeof input === "object";
};

const isNewEntry = (input: unknown): input is NewEntry => {
  const entryTypes = ["OccupationalHealthcare", "HospitalEntry", "HealthCheck"];

  return (
    isObject(input) &&
    "date" in input &&
    "specialist" in input &&
    "description" in input &&
    "type" in input &&
    isString(input.type) &&
    entryTypes.includes(input.type)
  );
};

const isOccupationalHealthcareEntry = (
  input: NewEntry
): input is OccupationalHealthcareEntry => {
  return "employerName" in input && isString(input.employerName);
};

const isHospitalEntry = (input: NewEntry): input is HospitalEntry => {
  return (
    "discharge" in input &&
    isObject(input.discharge) &&
    isString(input.discharge.date) &&
    isString(input.discharge.criteria)
  );
};

const isHealthCheckEntry = (input: NewEntry): input is HealthCheck => {
  return "healthCheckRating" in input;
};

const isHealthCheckRating = (input: unknown): input is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(input))
};

const parseHealthCheckRating = (input: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(input)) {
    throw new Error("HealthCheckRating must be a number between 0 and 3");
  }
  return input;
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

const parseDate = (input: unknown): string => {
  if (!isString(input) || !isDate(input)) {
    throw new Error("Incorrect date of birth");
  }

  return input;
};

const parseSsn = (ssn: unknown): string => {
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
    throw new Error("incorrect specialist");
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("incorrect description");
  }

  return description;
};

const parseDiagnosisCodes = (input: NewEntry): Array<Diagnosis['code']> => {
  // if (!isString(diagnosisCodes)) {
  //   throw new Error("incorrect diagnosisCodes");
  // }

  // return diagnosisCodes;
  if (
    !('diagnosisCodes' in input) ||
    !isObject(input.diagnosisCodes)
  ) {
    return [] as Array<Diagnosis['code']>;
  }

  return input.diagnosisCodes;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("incorrect employerName");
  }

  return employerName;
};

const isSickLeave = (input: unknown): input is SickLeave => {
  return (
    isObject(input) &&
    "startDate" in input &&
    "endDate" in input &&
    isString(input.startDate) &&
    isString(input.endDate)
  );
};

const parseSickLeave = (input: unknown): SickLeave => {
  if (!isSickLeave(input)) {
    throw new Error("Incorrect sickLeave");
  }

  return {
    startDate: parseDate(input.startDate),
    endDate: parseDate(input.endDate),
  };
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!isObject(object)) {
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
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatient;
  } else {
    throw new Error("Incorrect data, some fields are missing");
  }
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!isNewEntry(object)) {
    throw new Error("Incorrect or missing data");
  }

  const diagnosisCodes = parseDiagnosisCodes(object);

  switch (object.type) {
    case "OccupationalHealthcare": {
      if (!isOccupationalHealthcareEntry(object)) {
        throw new Error(
          "Incorrect or missing data for OccupationalHealthcare entry"
        );
      }
      const newEntry: NewEntry = {
        type: object.type,
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description),
        employerName: parseEmployerName(object.employerName),
        diagnosisCodes: diagnosisCodes
      };
      if ("sickLeave" in object && "sickLeave" !== undefined) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newEntry;
    }
    case "Hospital": {
      if (!isHospitalEntry(object)) {
        throw new Error("Incorrect or missing data for Hospital entry");
      }
      const newEntry = {
        type: object.type,
        date: object.date,
        specialist: object.specialist,
        description: object.description,
        discharge: object.discharge,
        diagnosisCodes: diagnosisCodes
      };
      return newEntry;
    }
    case "HealthCheck": {
      if (!isHealthCheckEntry(object)) {
        throw new Error("Incorrect or missing data for HealthCheck entry");
      }
      const newEntry = {
        type: object.type,
        date: object.date,
        specialist: object.specialist,
        description: object.description,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        diagnosisCodes: diagnosisCodes
      };
      return newEntry;
    }
    default: {
      const _exhaustiveCheck: never = object;
      return _exhaustiveCheck;
    }
  }
};

export { toNewPatient, toNewEntry };
