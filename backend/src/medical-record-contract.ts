/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from "fabric-contract-api";
import { MedicalRecord } from "./medical-record";

@Info({ title: "MedicalRecordContract", description: "My Smart Contract" })
export class MedicalRecordContract extends Contract {
    @Transaction(false)
    @Returns("boolean")
    public async medicalRecordExists(
        ctx: Context,
        medicalRecordId: string
    ): Promise<boolean> {
        const buffer = await ctx.stub.getState(medicalRecordId);
        return !!buffer && buffer.length > 0;
    }

    @Transaction()
    public async createMedicalRecord(
        ctx: Context,
        medicalRecordId: string,
        value: string
    ): Promise<void> {
        const exists = await this.medicalRecordExists(ctx, medicalRecordId);
        if (exists) {
            throw new Error(
                `The medical record ${medicalRecordId} already exists`
            );
        }
        
        const medicalRecord = new MedicalRecord();
        medicalRecord.value = value ;
        const buffer: Buffer = Buffer.from(JSON.stringify(medicalRecord));
        await ctx.stub.putState(medicalRecordId, buffer);
        const eventPayload: Buffer = Buffer.from(`Created asset ${medicalRecordId} (${value})`);
        ctx.stub.setEvent("myEvent", eventPayload);
    }

    @Transaction(false)
    @Returns("MedicalRecord")
    public async readMedicalRecord(
        ctx: Context,
        medicalRecordId: string
    ): Promise<MedicalRecord> {
        const exists = await this.medicalRecordExists(ctx, medicalRecordId);
        if (!exists) {
            throw new Error(
                `The medical record ${medicalRecordId} does not exist`
            );
        }
        const buffer = await ctx.stub.getState(medicalRecordId);
        const medicalRecord = JSON.parse(buffer.toString()) as MedicalRecord;
        return medicalRecord;
    }

    @Transaction()
    public async updateMedicalRecord(
        ctx: Context,
        medicalRecordId: string,
        newValue: string
    ): Promise<void> {
        const exists = await this.medicalRecordExists(ctx, medicalRecordId);
        if (!exists) {
            throw new Error(
                `The medical record ${medicalRecordId} does not exist`
            );
        }
        const medicalRecord = new MedicalRecord();
        medicalRecord.value = newValue;
        const buffer = Buffer.from(JSON.stringify(medicalRecord));
        await ctx.stub.putState(medicalRecordId, buffer);
    }

    @Transaction()
    public async deleteMedicalRecord(
        ctx: Context,
        medicalRecordId: string
    ): Promise<void> {
        const exists = await this.medicalRecordExists(ctx, medicalRecordId);
        if (!exists) {
            throw new Error(
                `The medical record ${medicalRecordId} does not exist`
            );
        }
        await ctx.stub.deleteState(medicalRecordId);
    }

    @Transaction(false)
    public async queryAllAssets(ctx: Context): Promise<string> {
        const startKey = "000";
        const endKey = "999";
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString());
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString());
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString();
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log("end of data");
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }
}
