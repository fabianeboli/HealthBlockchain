export enum Gender {
  male = "Meżczyzna",
  female = "Kobieta",
}

export type Examination = {
  examinationName: string;
  place: string;
  date: Date | number;
  result: string;
  prescription: string;
  price: string;
}

export type RecordData = {
  firstName: string;
  lastName: string;
  pesel: string;
  gender: Gender;
  dateOfBirth: string;
  medicalHistory: Examination[];
};
