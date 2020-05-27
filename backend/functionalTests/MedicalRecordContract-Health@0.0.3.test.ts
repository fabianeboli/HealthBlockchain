/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

import * as assert from 'assert';
import * as fabricNetwork from 'fabric-network';
import { SmartContractUtil } from './ts-smart-contract-util';

import * as os from 'os';
import * as path from 'path';

describe('MedicalRecordContract-Health@0.0.3' , () => {

    const homedir: string = os.homedir();
    const walletPath: string = path.join(homedir, '.fabric-vscode', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');
    const gateway: fabricNetwork.Gateway = new fabricNetwork.Gateway();
    const fabricWallet: fabricNetwork.FileSystemWallet = new fabricNetwork.FileSystemWallet(walletPath);
    const identityName: string = 'org1Admin';
    let connectionProfile: any;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
    });

    beforeEach(async () => {
        const discoveryAsLocalhost: boolean = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled: boolean = true;

        const options: fabricNetwork.GatewayOptions = {
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled,
            },
            identity: identityName,
            wallet: fabricWallet,
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    describe('medicalRecordExists', () => {
        it('should submit medicalRecordExists transaction', async () => {
            // TODO: populate transaction parameters
            const medicalRecordId: string = '002';
            const args: string[] = [ medicalRecordId];

            const response: Buffer = await SmartContractUtil.submitTransaction('MedicalRecordContract', 'medicalRecordExists', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(JSON.parse(response.toString()), true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createMedicalRecord', () => {
        it('should submit createMedicalRecord transaction', async () => {
            // TODO: populate transaction parameters
            const medicalRecordId: string = 'EXAMPLE';
            const value: string = 'EXAMPLE';
            const args: string[] = [ medicalRecordId, value];

            const response: Buffer = await SmartContractUtil.submitTransaction('MedicalRecordContract', 'createMedicalRecord', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readMedicalRecord', () => {
        it('should submit readMedicalRecord transaction', async () => {
            // TODO: populate transaction parameters
            const medicalRecordId: string = 'EXAMPLE';
            const args: string[] = [ medicalRecordId];

            const response: Buffer = await SmartContractUtil.submitTransaction('MedicalRecordContract', 'readMedicalRecord', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('updateMedicalRecord', () => {
        it('should submit updateMedicalRecord transaction', async () => {
            // TODO: populate transaction parameters
            const medicalRecordId: string = 'EXAMPLE';
            const newValue: string = 'EXAMPLE';
            const args: string[] = [ medicalRecordId, newValue];

            const response: Buffer = await SmartContractUtil.submitTransaction('MedicalRecordContract', 'updateMedicalRecord', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('deleteMedicalRecord', () => {
        it('should submit deleteMedicalRecord transaction', async () => {
            // TODO: populate transaction parameters
            const medicalRecordId: string = 'EXAMPLE';
            const args: string[] = [ medicalRecordId];

            const response: Buffer = await SmartContractUtil.submitTransaction('MedicalRecordContract', 'deleteMedicalRecord', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('queryAllAssets', () => {
        it('should submit queryAllAssets transaction', async () => {
            // TODO: Update with parameters of transaction
            const args: string[] = [];

            const response: Buffer = await SmartContractUtil.submitTransaction('MedicalRecordContract', 'queryAllAssets', args, gateway);
            // submitTransaction returns buffer of transcation return value
            // TODO: Update with return value of transaction
            assert.equal(true, true);
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
