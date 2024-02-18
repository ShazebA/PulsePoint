const express = require('express');
const multer = require('multer');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
const { uploadDocumentToSmartContract, getDocumentFromSmartContract } = require('../hedera/smartContractInteractions');  
// import { create } from '@web3-storage/w3up-client'
const { createReadStream, createWriteStream } = require('fs');
const crypto = require('crypto');
const ipfsAPI = require('ipfs-api');
const { com } = require('@hashgraph/proto');
const axios = require('axios')
const FormData = require('form-data')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzgzMDk2Ni0yYzUwLTQ1MzMtOWEzYy1lZmNiYTQzZTdhZjYiLCJlbWFpbCI6Im0uc2hhemVlNDU0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmZTI4M2YxZjUyMjUxYzdjODg2NSIsInNjb3BlZEtleVNlY3JldCI6ImU1ODAwOWU2ZWNhNzI1YmRiODE4NmMxZjdhMmQ2NzZlYmZmODk2ZmMwN2U1MmU1MWJkOWQ1ZWFiMjQ2ZjNhY2MiLCJpYXQiOjE3MDgyMjkxODd9.LQohGYZwpigaBnnD9sdx1dWUPVO3QTr8_GrBbqoVCIY'
const Document = require('../schemas/Document');


const mongoose = require('mongoose');
const { log } = require('console');
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log(''))
    .catch(err => console.error('', err));

// const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API });
// const web3client = await create()
// const myAccount = await web3client.login('shazebashique@gmail.com')
// const space = web3client.getStorage('PulsePoint')
// await client.setCurrentSpace(space.did())

const pinFileToIPFS = async (filePath) => {
  const formData = new FormData();
  const src = filePath;
  
  const file = fs.createReadStream(src)
  formData.append('file', file)
  
  const pinataMetadata = JSON.stringify({
    name: 'File name',
  });
  formData.append('pinataMetadata', pinataMetadata);
  
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', pinataOptions);

  try{
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    console.log(res.data);
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}

const secretKey = "WUA2jKM5ny7VXRpZYBij1gw0YaakN9QHqNfCSx9B2";
let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);


const router = express.Router();

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
const password = 'WUA2jKM5ny7VXRpZYBij1gw0YaakN9QHqNfCSx9B2'; // Use a strong password or key derivation

const upload = multer({ dest: 'uploads/' });

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/api/uploadDocument', upload.single('document'), async (req, res) => {
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

          uploadDocumentToSmartContract(cid)
            .then((txHash) => {
              // Transaction hash can be used as a reference or for confirmation
              console.log('Document hash uploaded to smart contract:', txHash);
              res.json({ success: true, cid, txHash });
            })
            .catch((error) => {
              console.error('Error uploading document hash to smart contract:', error);
              res.status(500).send('Failed to upload document hash to smart contract.');
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
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

router.post('/api/uploadData', async (req, res) => {
  let numericalData = req.body; // Directly receive data as text
  console.log(numericalData);
  const clinic = JSON.stringify(req.body.clinic._ID);
  console.log(clinic);
  delete numericalData.clinic;
  const user = JSON.stringify(req.body.user.healthCardHASH);
  console.log(user);
  delete numericalData.user;
  numericalData = JSON.stringify(numericalData);
  console.log(numericalData);
  const encryptedData = encrypt(numericalData);
  
  // Save the encrypted data to a temporary file
  const tempFilePath = path.join(__dirname, 'tempData.txt');
  fs.writeFileSync(tempFilePath, encryptedData);


  try {
      // Upload the encrypted file to Web3.Storage
      let cid = "";
      const ipfsHash = await pinFileToIPFS(tempFilePath);
      console.log("uploading to ipfs complete")

      
      // Clean up: remove the temporary file
      fs.unlinkSync(tempFilePath);
      console.log(ipfsHash);


      const docs = await Document.find();
      const docLen = docs.length;
      const document = new Document({
            healthCardHASH: user,
            documentHash:  ipfsHash,
      });
      await document.save();
      uploadDocumentToSmartContract(ipfsHash, user, clinic )
        .then((txHash) => {
          // Transaction hash can be used as a reference or for confirmation
          console.log('Data hash uploaded to smart contract:', txHash);
        })
        .catch((error) => {
          console.error('Error uploading data hash to smart contract:', error);
          res.status(500).json({ success: false, message: 'Failed to upload data hash to smart contract.' });
        });

        

      res.json({ success: true, message: 'Numerical data encrypted and uploaded successfully.', cid });
  } catch (error) {
      console.error('Failed to upload numerical data:', error);
      res.status(500).json({ success: false, message: 'Failed to upload numerical data.' });
  }
});


router.get('/api/getDocument', async (req, res) => {
  const docIndex = req.query; // Get the document index from query parameters
  const user = JSON.stringify(req.query.healthCardHASH);
  console.log(user);
  delete docIndex.healthCardHASH;

  const existingDoc = await Document.findOne({healthCardHASH: user });
  console.log(existingDoc);
  const docInd = existingDoc.documentIndex;
  console.log(docInd);
  

  if (docIndex === undefined) {
    return res.status(400).send('Document index is required.');
  }

  try {
    
    const result = await getDocumentFromSmartContract(docInd);
    if (result.success) {
      res.json({ success: true, document: result.document });
    } else {
      res.status(404).send('Document not found.');
    }
  } catch (error) {
    console.error('Error retrieving document from smart contract:', error);
    res.status(500).send('Failed to retrieve document from smart contract.');
  }
});

router.get('/api/getDocumentFromIPFS', async (req, res) => {
  const healthCardHASH = req.query.healthCardHASH; // or req.params.healthCardHASH if using route parameters

  if (!healthCardHASH) {
    return res.status(400).json({ success: false, message: 'Health card hash is required.' });
  }

  try {
    // Find the document in the database
    const document = await Document.findOne({ healthCardHASH });

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const ipfsHash = document.documentHash;
    // Retrieve the file from IPFS
    const file = await getFileFromIPFS(ipfsHash); // Adjust this function call based on your IPFS retrieval logic

    // Send the file back to the client
    // This step depends on the format of the file and how you want to return it
    // For example, if it's a PDF, you might set the appropriate content-type header
    res.setHeader('Content-Type', 'application/pdf');
    res.send(file);
  } catch (error) {
    console.error('Error retrieving document:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve document.' });
  }
});


module.exports = router;