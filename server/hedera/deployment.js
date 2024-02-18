const {
    Client,
    PrivateKey,
    AccountId,
    ContractCreateTransaction,
    FileCreateTransaction,
    Hbar,
    ContractCreateFlow,
    ContractFunctionParameters
  } = require("@hashgraph/sdk");
  require('dotenv').config();

const fs = require('fs');
const path = require('path');

// Function to read the bytecode from the file
function getBytecode(filePath) {
    try {
        const bytecode = fs.readFileSync(filePath, 'utf8');
        return bytecode;
    } catch (error) {
        console.error('Error reading bytecode file:', error);
        process.exit(1);
    }
}

const contractBytecode = fs.readFileSync("bytecode.bin");

const operatorId = AccountId.fromString("0.0.3121387");
const operatorKey = PrivateKey.fromStringECDSA("0x9c42eb4e3e3f33741a9767405763fb331a4574eb0258436b28432a1a0919c0f1");

async function main() {
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    //Create the transaction
    // const contractCreate = new ContractCreateFlow()
    // .setGas(100000)
    // .setBytecode(contractBytecode);

    // //Sign the transaction with the client operator key and submit to a Hedera network
    // const txResponse = contractCreate.execute(client);

    // //Get the receipt of the transaction
    // const receipt = (await txResponse).getReceipt(client);

    // //Get the new contract ID
    // const newContractId = (await receipt).contractId;
        
    // console.log("The new contract ID is " + newContractId);

    const contractInstantiateTx = new ContractCreateTransaction()
	.setBytecodeFileId("0.0.3562779")
	.setGas(100000)
	.setConstructorParameters(new ContractFunctionParameters().addString("Alice").addUint256(111111));
    const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
    const contractId = contractInstantiateRx.contractId;
    const contractAddress = contractId.toSolidityAddress();
    console.log(`- The smart contract ID is: ${contractId} \n`);
    console.log(`- Smart contract ID in Solidity format: ${contractAddress} \n`);

    // const contractCreate = new ContractCreateFlow()
    // .setGas(100000)
    // .setBytecode(bytecode);

    // //Sign the transaction with the client operator key and submit to a Hedera network
    // const txResponse = contractCreate.execute(client);

    // //Get the receipt of the transaction
    // const receipt = (await txResponse).getReceipt(client);
    // // Create a file on Hedera and store the bytecode
    // const fileCreateTx = new FileCreateTransaction()
    //     .setContents(contractBytecode)
    //     .setMaxTransactionFee(new Hbar(0.75))
    //     .freezeWith(client);
    // const fileCreateSign = await fileCreateTx.sign(operatorKey);
    // const fileCreateSubmit = await fileCreateSign.execute(client);
    // const fileCreateRx = await fileCreateSubmit.getReceipt(client);
    // const bytecodeFileId = fileCreateRx.fileId;
    // console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);
    // const contractInstantiateTx = new ContractCreateTransaction()
    //     .setBytecodeFileId(bytecodeFileId)
    //     .setGas(100000)
    //     .setConstructorParameters(new ContractFunctionParameters().addString("Alice").addUint256(111111));
    // const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
    // const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
    // const contractId = contractInstantiateRx.contractId;
    // const contractAddress = contractId.toSolidityAddress();
    // console.log(`- The smart contract ID is: ${contractId} \n`);
    // console.log(`- Smart contract ID in Solidity format: ${contractAddress} \n`);
}

main().catch(console.error);