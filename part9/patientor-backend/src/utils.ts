import { HealthCheck, HospitalEntry, NewPatient, OccupationalHealthcareEntry } from "./types";
import { Gender } from "./types";
import { NewEntry, SickLeave } from "./types";

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

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
  const entryTypes = [
    'OccupationalHealthcareEntry',
    'HospitalEntry',
    'HealthCheck'
  ];

  return (
    isObject(input) &&
    'date' in input &&
    'specialist' in input &&
    'description' in input &&
    'type' in input &&
    isString(input.type) &&
    entryTypes.includes(input.type)
  );
};

const isOccupationalHealthcareEntry = (
  input: NewEntry
): input is OccupationalHealthcareEntry => {
  return (
    "employerName" in input &&
    isString(input.employerName)
  );
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

// const parseType = (type: unknown): string => {
//   if (!isString(type)) {
//     throw new Error("incorrect type");
//   }

//   return type;
// };

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

// const parseDiagnosisCodes = (diagnosisCodes: unknown): string => {
//   if (!isString(diagnosisCodes)) {
//     throw new Error("incorrect diagnosisCodes");
//   }

//   return diagnosisCodes;
// };

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

// const parseDischarge = (discharge: unknown): string => {
//   if (!isString(discharge)) {
//     throw new Error("incorrect discharge");
//   }

//   return discharge;
// };

// const parseHealthCheckRating = (healthCheckRating: unknown): string => {
//   if (!isString(healthCheckRating)) {
//     throw new Error("incorrect healthCheckRating");
//   }

//   return healthCheckRating;
// };

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
  if (!isNewEntry(object)) {
    throw new Error("Incorrect or missing data");
  }

  console.log(object);

  // if (object.diagnosisCodes) {
  //   //diagnosisCodes here
  // }
  
  switch (object.type) {
    case "OccupationalHealthcare":
      if (!isOccupationalHealthcareEntry(object)) {
        throw new Error("Incorrect or missing data for 'OccupationalHealthcare' entry");
      }
      const newEntry: NewEntry = {
        type: object.type,
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description),
        employerName: parseEmployerName(object.employerName),
      };
      if ("sickLeave" in object && "sickLeave" !== undefined) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newEntry;
    case "Hospital":
      return 'asd' as unknown as HospitalEntry;
    case "HealthCheck":
      return 'asd' as unknown as HealthCheck;
    default:
      const _exhaustiveCheck: never = object;
      return _exhaustiveCheck;
  }
};

export { toNewPatient, toNewEntry };
