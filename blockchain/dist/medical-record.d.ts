export declare enum Gender {
    male = "male",
    female = "female"
}
interface Examination {
    examinationName: string;
    place: string;
    date: Date | number;
    result: string;
    prescription: string;
    price: number;
}
export declare type RecordData = {
    firstName: string;
    lastName: string;
    pesel: string;
    gender: Gender;
    dateOfBirth: Date;
    medicalHistory: Examination[];
};
export declare class MedicalRecord {
    value: string;
}
export {};
