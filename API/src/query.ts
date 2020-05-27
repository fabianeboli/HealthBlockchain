import { FileSystemWallet, Gateway } from "fabric-network";
import * as path from "path";
export const query = async (index: string): Promise<string> => {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "Org1Wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    const connectionProfile = path.resolve(__dirname, "..", "connection.json");
    let connectionOptions = {
      wallet,
      identity: "org1Admin",
      discovery: { enabled: true, asLocalhost: true },
    };
    await gateway.connect(connectionProfile, connectionOptions);

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("Health");

    const result = await contract.evaluateTransaction(
      "readMedicalRecord",
      index
    );

    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );

    // Disconnect from the gateway and return the result
    await gateway.disconnect();
    return result.toString();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    // return `Pacjent o indeksie ${index} nie został znaleziony`;
    // process.exit(1);
  }
};
// main();
// async function main() {
//   try {
//     // Create a new file system based wallet for managing identities.
//     const walletPath = path.join(process.cwd(), "Org1Wallet");
//     const wallet = new FileSystemWallet(walletPath);
//     console.log(`Wallet path: ${walletPath}`);

//     // Create a new gateway for connecting to our peer node.
//     const gateway = new Gateway();
//     const connectionProfile = path.resolve(__dirname, "..", "connection.json");
//     let connectionOptions = {
//       wallet,
//       identity: "org1Admin",
//       discovery: { enabled: true, asLocalhost: true },
//     };
//     await gateway.connect(connectionProfile, connectionOptions);

//     // Get the network (channel) our contract is deployed to.
//     const network = await gateway.getNetwork("mychannel");

//     // Get the contract from the network.
//     const contract = network.getContract("Health");

//     const result = await contract.evaluateTransaction('readMedicalRecord', '001');
//     console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

//     // Disconnect from the gateway.
//     await gateway.disconnect();
//   } catch (error) {
//     console.error(`Failed to submit transaction: ${error}`);
//     process.exit(1);
//   }
// }
// main();
