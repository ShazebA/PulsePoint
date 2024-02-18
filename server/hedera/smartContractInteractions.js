const {
    Client,
    AccountId,
    PrivateKey,
    ContractCallQuery,
    ContractExecuteTransaction,
    Hbar,
    ContractFunctionParameters
  } = require("@hashgraph/sdk");
  require("dotenv").config();

  
  // Setup your client
  const operatorId = AccountId.fromString("0.0.3121387");
  const operatorKey = PrivateKey.fromStringECDSA("0x9c42eb4e3e3f33741a9767405763fb331a4574eb0258436b28432a1a0919c0f1");
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  // Function to upload a document hash to the smart contract
  async function uploadDocumentToSmartContract(docHash, healthCardHash, clinicIdHash) {
   
   
    const contractId = "0.0.3562786"; // Replace with your contract ID
    const contractGas = 1000000; // Adjust based on your contract's needs
      
    try {
        new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(contractGas)
        // .setPayableAmount(new Hbar(30)) // Adjust as needed based on contract requirements
        .setFunction(
          "addDocument",
          new ContractFunctionParameters()
            .addString(docHash)
            .addString(healthCardHash)
            .addString(clinicIdHash)
        )
        // .setTransactionValidDuration({seconds: 240})
        .execute(client);

      console.log("The transaction was submitted to the network with transaction ID");

      return { success: true };
    
    } catch (error) {
      console.error("Error uploading document hash to smart contract:", error);
      return { success: false, error: error.message };
    }
  }

  async function getDocumentFromSmartContract(docIndex) {
    const contractId = "0.0.3562786"; // Replace with your contract ID
    const contractGas = 600; // Adjust based on your contract's needs
  
    try { 
      const query = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(contractGas)
        .setMaxQueryPayment(new Hbar(20))
        .setFunction("getDocument", new ContractFunctionParameters().addUint256(docIndex))
    

      query.execute(client);
      const callResult = await query.execute(client);
      console.log("The call result is:", JSON.stringify(operatorKey));
      console.log("The call result is:", JSON.stringify(callResult));


      const documentHash = callResult.getString(0); // The document's hash (QmfQ7qMs...)
      const healthCardHash = callResult.getString(1); // The health card hash ("000000000000")
      const clinicIdHash = callResult.getString(2); // The clinic ID hash ("00000")
      const timestamp = callResult.getUint256(3); // The timestamp (1708235728)

        console.log("Document retrieved successfully:", {
            documentHash,
            healthCardHash,
            clinicIdHash,
            timestamp
        });

        return {
            success: true,
            document: {
                documentHash,
                healthCardHash,
                clinicIdHash,
                timestamp
            }
        };
  
    } catch (error) {
      console.error("Error retrieving document from smart contract:", error);
      return { success: false, error: error.message };
    }
  }
  

module.exports = { uploadDocumentToSmartContract, getDocumentFromSmartContract };