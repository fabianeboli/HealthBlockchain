import { RecordData } from './medical-record';
import { Context, Contract } from "fabric-contract-api";
import { MedicalRecord } from "./medical-record";
export declare class MedicalRecordContract extends Contract {
    medicalRecordExists(ctx: Context, medicalRecordId: string): Promise<boolean>;
    createMedicalRecord(ctx: Context, medicalRecordId: string, value: RecordData): Promise<void>;
    readMedicalRecord(ctx: Context, medicalRecordId: string): Promise<MedicalRecord>;
    updateMedicalRecord(ctx: Context, medicalRecordId: string, newValue: string): Promise<void>;
    deleteMedicalRecord(ctx: Context, medicalRecordId: string): Promise<void>;
    queryAllAssets(ctx: Context): Promise<string>;
}
