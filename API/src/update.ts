import { RecordData } from "./../types.d";
import { FileSystemWallet, Gateway } from "fabric-network";
import * as path from "path";

export const update = async (
  index: string,
  recordData: RecordData
): Promise<boolean> => {
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

    // Submit the specified transaction.

    await contract.submitTransaction(
      "updateMedicalRecord",
      index,
      JSON.stringify(recordData)
    );
    console.log(`Transaction has been submitted`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return true;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return false;
  }
};