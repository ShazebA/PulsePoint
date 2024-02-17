const express = require('express');
const multer = require('multer');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
const { uploadDocumentToSmartContract, uploadDataToSmartContract } = require('../hedera/smartContractInteractions');  
const axios = require('axios');
const Document = require('./models/Document'); // Assume you have a Mongoose model for documents
const Data = require('./models/Data'); // Assume a model for numerical data
const FormData = require('form-data');
const { createReadStream, createWriteStream } = require('fs');

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API });


function encryptStream(inputPath, outputPath, callback) {
  const cipher = crypto.createCipher(algorithm, password);
  const input = createReadStream(inputPath);
  const output = createWriteStream(outputPath);

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
      console.log('File encrypted successfully.');
      callback(outputPath);
  });
}

const algorithm = 'aes-256-ctr';
const password = 'your-encryption-password'; // Use a strong password or key derivation

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/uploadDocument', upload.single('document'), async (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  // Define path for the encrypted file
  const encryptedFilePath = path.join('uploads', `encrypted-${req.file.filename}`);

  // Encrypt the file before uploading
  encryptStream(req.file.path, encryptedFilePath, async (encryptedPath) => {
      try {
          const files = await getFilesFromPath(encryptedPath);
          const cid = await client.put(files);
          // Clean up: remove the encrypted file after upload
          fs.unlink(encryptedPath, (err) => {
              if (err) console.error('Failed to remove encrypted file:', err);
          });
          res.json({ success: true, cid });
      } catch (error) {
          console.error('Error uploading encrypted document to Web3.Storage:', error);
          res.status(500).send('Failed to upload encrypted document.');
      }
  });
});

const iv = crypto.randomBytes(16); // Initialization vector

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

app.post('/api/uploadData', async (req, res) => {
  const numericalData = req.body; // Directly receive data as text
  const encryptedData = encrypt(numericalData);
  
  // Save the encrypted data to a temporary file
  const tempFilePath = path.join(__dirname, 'tempData.txt');
  fs.writeFileSync(tempFilePath, encryptedData);

  try {
      // Upload the encrypted file to Web3.Storage
      const files = await getFilesFromPath(tempFilePath);
      const cid = await web3StorageClient.put(files);
      
      // Clean up: remove the temporary file
      fs.unlinkSync(tempFilePath);

      res.json({ success: true, message: 'Numerical data encrypted and uploaded successfully.', cid });
  } catch (error) {
      console.error('Failed to upload numerical data:', error);
      res.status(500).json({ success: false, message: 'Failed to upload numerical data.' });
  }
});
