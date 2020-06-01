/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from "fabric-contract-api";

export enum Gender {
    male = 'male',
    female = 'female',
}

interface Examination {
    examinationName: string;
	place: string;
	date: Date | number;
	result: string;
	prescription: string;
	price: number;
};

export type RecordData = {
    firstName: string;
    lastName: string;
    pesel: string;
    gender: Gender;
    dateOfBirth: Date;
    medicalHistory: Examination[];
};

@Object()
export class MedicalRecord {
    @Property()
    public value: string;
}
