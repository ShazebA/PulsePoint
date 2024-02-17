// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";

// contract MedicalDataStorage is Ownable {
//     struct Document {
//         string docHash; // SHA-256 hash of the document (lab report or PDF)
//         string healthCardHash; // Hashed health card number for identification
//         string clinicIdHash; // Hashed clinic ID for identifying the uploader
//         uint256 timestamp; // Timestamp of when the document was added
//     }

//     // Array to store documents
//     Document[] private documents;

//     // Event to emit when a new document is added
//     event DocumentAdded(uint256 indexed docIndex, string docHash, string healthCardHash, string clinicIdHash, uint256 timestamp);

//     // Function to add a new document
//     function addDocument(string memory docHash, string memory healthCardHash, string memory clinicIdHash) public onlyOwner {
//         documents.push(Document(docHash, healthCardHash, clinicIdHash, block.timestamp));
//         emit DocumentAdded(documents.length - 1, docHash, healthCardHash, clinicIdHash, block.timestamp);
//     }

//     // Function to retrieve a specific document
//     function getDocument(uint256 docIndex) public view onlyOwner returns (Document memory) {
//         require(docIndex < documents.length, "Invalid document index.");
//         return documents[docIndex];
//     }

//     // Optional: Function to get the total number of documents
//     function getDocumentCount() public view onlyOwner returns (uint256) {
//         return documents.length;
//     }
// }
