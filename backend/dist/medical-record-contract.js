"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordContract = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
const fabric_contract_api_1 = require("fabric-contract-api");
const medical_record_1 = require("./medical-record");
let MedicalRecordContract = /** @class */ (() => {
    let MedicalRecordContract = class MedicalRecordContract extends fabric_contract_api_1.Contract {
        async medicalRecordExists(ctx, medicalRecordId) {
            const buffer = await ctx.stub.getState(medicalRecordId);
            return !!buffer && buffer.length > 0;
        }
        async createMedicalRecord(ctx, medicalRecordId, value) {
            const exists = await this.medicalRecordExists(ctx, medicalRecordId);
            if (exists) {
                throw new Error(`The medical record ${medicalRecordId} already exists`);
            }
            const medicalRecord = new medical_record_1.MedicalRecord();
            medicalRecord.value = JSON.stringify(value);
            const buffer = Buffer.from(JSON.stringify(medicalRecord));
            await ctx.stub.putState(medicalRecordId, buffer);
            const eventPayload = Buffer.from(`Created asset ${medicalRecordId} (${value})`);
            ctx.stub.setEvent("myEvent", eventPayload);
        }
        async readMedicalRecord(ctx, medicalRecordId) {
            const exists = await this.medicalRecordExists(ctx, medicalRecordId);
            if (!exists) {
                throw new Error(`The medical record ${medicalRecordId} does not exist`);
            }
            const buffer = await ctx.stub.getState(medicalRecordId);
            const medicalRecord = JSON.parse(buffer.toString());
            return medicalRecord;
        }
        async updateMedicalRecord(ctx, medicalRecordId, newValue) {
            const exists = await this.medicalRecordExists(ctx, medicalRecordId);
            if (!exists) {
                throw new Error(`The medical record ${medicalRecordId} does not exist`);
            }
            const medicalRecord = new medical_record_1.MedicalRecord();
            medicalRecord.value = newValue;
            const buffer = Buffer.from(JSON.stringify(medicalRecord));
            await ctx.stub.putState(medicalRecordId, buffer);
        }
        async deleteMedicalRecord(ctx, medicalRecordId) {
            const exists = await this.medicalRecordExists(ctx, medicalRecordId);
            if (!exists) {
                throw new Error(`The medical record ${medicalRecordId} does not exist`);
            }
            await ctx.stub.deleteState(medicalRecordId);
        }
        async queryAllAssets(ctx) {
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
                    }
                    catch (err) {
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
    };
    __decorate([
        fabric_contract_api_1.Transaction(false),
        fabric_contract_api_1.Returns("boolean"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
        __metadata("design:returntype", Promise)
    ], MedicalRecordContract.prototype, "medicalRecordExists", null);
    __decorate([
        fabric_contract_api_1.Transaction(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Object]),
        __metadata("design:returntype", Promise)
    ], MedicalRecordContract.prototype, "createMedicalRecord", null);
    __decorate([
        fabric_contract_api_1.Transaction(false),
        fabric_contract_api_1.Returns("MedicalRecord"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
        __metadata("design:returntype", Promise)
    ], MedicalRecordContract.prototype, "readMedicalRecord", null);
    __decorate([
        fabric_contract_api_1.Transaction(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
        __metadata("design:returntype", Promise)
    ], MedicalRecordContract.prototype, "updateMedicalRecord", null);
    __decorate([
        fabric_contract_api_1.Transaction(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
        __metadata("design:returntype", Promise)
    ], MedicalRecordContract.prototype, "deleteMedicalRecord", null);
    __decorate([
        fabric_contract_api_1.Transaction(false),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
        __metadata("design:returntype", Promise)
    ], MedicalRecordContract.prototype, "queryAllAssets", null);
    MedicalRecordContract = __decorate([
        fabric_contract_api_1.Info({ title: "MedicalRecordContract", description: "My Smart Contract" })
    ], MedicalRecordContract);
    return MedicalRecordContract;
})();
exports.MedicalRecordContract = MedicalRecordContract;
//# sourceMappingURL=medical-record-contract.js.map