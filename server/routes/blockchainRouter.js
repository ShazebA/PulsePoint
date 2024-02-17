const express = require('express');
const multer = require('multer');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
const { uploadDocumentToSmartContract, uploadDataToSmartContract } = require('./smartContractInteractions');
const Document = require('./models/Document'); // Assume you have a Mongoose model for documents
const Data = require('./models/Data'); // Assume a model for numerical data

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for uploading documents
app.post('/api/uploadDocument', upload.single('document'), async (req, res) => {
  // Encrypt and store the document
  const filePath = req.file.path;
  const originalData = fs.readFileSync(filePath);
  const encryptedData = CryptoJS.AES.encrypt(originalData.toString(), 'your-encryption-key').toString();
  const documentHash = CryptoJS.SHA256(originalData).toString();

  // Save encrypted data to a file or database
  const encryptedFilePath = path.join('encrypted', req.file.filename); // Adjust path as needed
  fs.writeFileSync(encryptedFilePath, encryptedData);

  // Upload hash to smart contract and save reference in MongoDB
  const contractResponse = await uploadDocumentToSmartContract(documentHash);
  await Document.create({ filePath: encryptedFilePath, hash: documentHash, contractAddress: contractResponse.address });

  res.json({ success: true, message: 'Document uploaded and hashed successfully', documentHash });
});

// Route for uploading numerical data
app.post('/api/uploadData', async (req, res) => {
  const dataString = JSON.stringify(req.body);
  const dataHash = CryptoJS.SHA256(dataString).toString();

  // Encrypt and store the data
  const encryptedData = CryptoJS.AES.encrypt(dataString, 'your-encryption-key').toString();

  // Upload hash to smart contract and save reference in MongoDB
  const contractResponse = await uploadDataToSmartContract(dataHash);
  await Data.create({ data: encryptedData, hash: dataHash, contractAddress: contractResponse.address });

  res.json({ success: true, message: 'Data uploaded and hashed successfully', dataHash });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
