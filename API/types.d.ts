export enum Gender {
	male = "male",
	female = "female",
}

type Examination = {
	examinationName: string;
	place: string;
	date: Date | number;
	result: string;
	prescription: string;
	price: number;
}

export type RecordData = {
	firstName: string;
	lastName: string;
	pesel: string;
	gender: Gender;
	dateOfBirth: Date;
	medicalHistory: Examination[];
};
