const {
    Client,
    AccountId,
    PrivateKey,
    ContractCallQuery,
    ContractExecuteTransaction,
    Hbar,
  } = require("@hashgraph/sdk");
  require("dotenv").config();
  
  // Setup your client
  const client = Client.forTestnet();
  client.setOperator(AccountId.fromString(process.env.HEDERA_ACCOUNT_ID), PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY));
  
  const contractId = "0.0.YOUR_CONTRACT_ID"; // Replace with your contract ID
  const contractGas = 100000; // Adjust based on your contract's needs
  
  // Function to upload a document hash to the smart contract
  async function uploadDocumentToSmartContract(docHash) {
    try {
      // Assume your smart contract has a function `storeDocumentHash` to store the document hash
      const response = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(contractGas)
        .setFunction("storeDocumentHash", [docHash])
        .setPayableAmount(new Hbar(1)) // Adjust as needed based on contract requirements
        .execute(client);
  
      const receipt = await response.getReceipt(client);
      return { success: true, transactionStatus: receipt.status.toString() };
    } catch (error) {
      console.error("Error uploading document hash to smart contract:", error);
      return { success: false, error: error.message };
    }
  }
  
  // Function to upload numerical data hash to the smart contract
  async function uploadDataToSmartContract(dataHash) {
    try {
      // Assume your smart contract has a function `storeDataHash` for storing the data hash
      const response = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(contractGas)
        .setFunction("storeDataHash", [dataHash])
        .setPayableAmount(new Hbar(1)) // Adjust as needed
        .execute(client);
  
      const receipt = await response.getReceipt(client);
      return { success: true, transactionStatus: receipt.status.toString() };
    } catch (error) {
      console.error("Error uploading data hash to smart contract:", error);
      return { success: false, error: error.message };
    }
  }
  
  module.exports = {
    uploadDocumentToSmartContract,
    uploadDataToSmartContract,
  };
  