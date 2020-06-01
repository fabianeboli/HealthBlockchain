import { RecordData } from "./medical-record";
/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from "fabric-contract-api";
import { ChaincodeStub, ClientIdentity } from "fabric-shim";
import { MedicalRecordContract } from ".";

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import { Gender } from "./medical-record";
import winston = require("winston");

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<
        ChaincodeStub
    > = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<
        ClientIdentity
    > = sinon.createStubInstance(ClientIdentity);
    public logging = {
        getLogger: sinon
            .stub()
            .returns(
                sinon.createStubInstance(winston.createLogger().constructor)
            ),
        setLevel: sinon.stub(),
    };
}

describe("MedicalRecordContract", () => {
    let contract: MedicalRecordContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new MedicalRecordContract();
        ctx = new TestContext();
        const value: RecordData = {
            firstName: 'Mariusz',
            lastName: 'Kowalski',
            pesel: '881204009013',
            gender: Gender.male,
            dateOfBirth: new Date('1988-12-04'),
            medicalHistory: [],
        };
        ctx.stub.getState
            .withArgs("1001")
            .resolves(Buffer.from(String(value)));
        ctx.stub.getState
            .withArgs("1002")
            .resolves(Buffer.from(String(value)));
    });

    describe("#medicalRecordExists", () => {
        it("should return true for a medical record", async () => {
            await contract.medicalRecordExists(ctx, "1001").should.eventually.be
                .true;
        });

        it("should return false for a medical record that does not exist", async () => {
            await contract.medicalRecordExists(ctx, "1003").should.eventually.be
                .false;
        });
    });

    describe("#createMedicalRecord", () => {
        it("should create a medical record", async () => {
            // await contract.createMedicalRecord(ctx, '1003', 'medical record 1003 value');
            const value: RecordData = {
                firstName: "Mariusz",
                lastName: "Kowalski",
                pesel: "881204009013",
                gender: Gender.male,
                dateOfBirth: new Date("1988-12-04"),
                medicalHistory: [],
            };
            await contract.createMedicalRecord(ctx, "1003",  String(value));
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                "1003",
                value
            );
            // Buffer.from('{"value":"medical record 1003 value"}')
        });

        it("should throw an error for a medical record that already exists", async () => {
            const value: RecordData = {
                firstName: "Jan",
                lastName: "Kowalski",
                pesel: "881204009011",
                gender: Gender.male,
                dateOfBirth: new Date("1988-12-04"),
                medicalHistory: [],
            };

            await contract
                //  .createMedicalRecord(ctx, "1001", "myvalue")
                .createMedicalRecord(ctx, "1001", String(value))
                .should.be.rejectedWith(
                    /The medical record 1001 already exists/
                );
        });
    });

    describe("#readMedicalRecord", () => {
        const value: RecordData = {
            firstName: "Jan",
            lastName: "Kowalski",
            pesel: "881204009011",
            gender: Gender.male,
            dateOfBirth: new Date("1988-12-04"),
            medicalHistory: [],
        };

        const updatedValue: RecordData = {
            firstName: "Jan",
            lastName: "Kowalski",
            pesel: "881204009011",
            gender: Gender.male,
            dateOfBirth: new Date("1988-12-04"),
            medicalHistory: [],
        };

        it("should return a medical record", async () => {
            await contract
                .readMedicalRecord(ctx, "1001")
                .should.eventually.deep.equal({
                    updatedValue,
                });
        });

        it("should throw an error for a medical record that does not exist", async () => {
            await contract
                .readMedicalRecord(ctx, "9003")
                .should.be.rejectedWith(
                    /The medical record 1003 does not exist/
                );
        });
    });

    describe("#updateMedicalRecord", () => {
        const value: RecordData = {
            firstName: "Jan",
            lastName: "Kowalski",
            pesel: "881204009011",
            gender: Gender.male,
            dateOfBirth: new Date("1988-12-04"),
            medicalHistory: [],
        };

        const updatedValue: RecordData = {
            firstName: "Jan",
            lastName: "Kowalski",
            pesel: "881204009011",
            gender: Gender.male,
            dateOfBirth: new Date("1988-12-04"),
            medicalHistory: [
                {
                    examinationName: "Wizyta kontrolna",
                    place: "Szpital redłowo, oddział pediatrii, sala 115",
                    date: new Date(),
                    result: "Pacjent nie wykazuje objawów choroby",
                    prescription: "",
                    price: 0,
                },
            ],
        };

        it("should update a medical record", async () => {
            await contract.updateMedicalRecord(
                ctx,
                "1001",
                String(updatedValue)
            );
            // await contract.updateMedicalRecord(
            //     ctx,
            //     "1001",
            //     "medical record 1001 new value"
            // );
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                "1001",
                Buffer.from(String(updatedValue))
            );
        });

        it("should throw an error for a medical record that does not exist", async () => {
            await contract
                .updateMedicalRecord(
                    ctx,
                    "1003",
                    String(updatedValue)
                )
                .should.be.rejectedWith(
                    /The medical record 1003 does not exist/
                );
        });
    });

    describe("#deleteMedicalRecord", () => {
        it("should delete a medical record", async () => {
            await contract.deleteMedicalRecord(ctx, "1001");
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly("1001");
        });

        it("should throw an error for a medical record that does not exist", async () => {
            await contract
                .deleteMedicalRecord(ctx, "1003")
                .should.be.rejectedWith(
                    /The medical record 1003 does not exist/
                );
        });
    });
});
