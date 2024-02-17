require('dotenv').config();
const express = require('express');
const { Client, AccountId, PrivateKey, ContractCreateTransaction, FileCreateTransaction, Hbar } = require("@hashgraph/sdk");
const contractJson = require('./path_to_your_compiled_contract.json'); // Update this path

const app = express();
app.use(express.json());

const client = Client.forTestnet();
client.setOperator(AccountId.fromString(process.env.HEDERA_ACCOUNT_ID), PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY));

app.post('/deployContract', async (req, res) => {
    try {
        const bytecode = contractJson.bytecode; // Your contract bytecode

        // Create a file on Hedera to store the bytecode
        const fileCreateTx = await new FileCreateTransaction()
            .setContents(bytecode)
            .setMaxTransactionFee(new Hbar(0.01)) // Adjust fee as needed
            .execute(client);

        const fileReceipt = await fileCreateTx.getReceipt(client);
        const bytecodeFileId = fileReceipt.fileId.toString();

        // Deploy the smart contract
        const contractDeployTx = await new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(1000000) // Adjust gas as needed
            .execute(client);

        const contractReceipt = await contractDeployTx.getReceipt(client);
        const contractId = contractReceipt.contractId.toString();

        res.send({ message: "Contract deployed successfully", contractId });
    } catch (error) {
        console.error("Error deploying contract:", error);
        res.status(500).send({ message: "Failed to deploy contract" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
