export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<string>;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Discharge = {
  date: string;
  criteria: string
};

export interface HealthCheck extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheck;

export type NewEntry = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn: string;
  dateOfBirth: string;
  entries?: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// export enum Type {
//   OccupationalHealthcareEntry = "OccupationalHealthcare",
//   HospitalEntry = "Hospital",
//   HealthCheck = "HealthCheck",
// }

export type PatientNoSSN = Omit<Patient, "ssn">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;
