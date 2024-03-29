require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userClinicRouter = require("./routes/userClinicData.js");
const blockchainRouter = require("./routes/blockchainRouter.js");
const patientData = require("./routes/patientData.js");
const gptAssistant = require("./routes/gptAssistant.js");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'client','build')));
app.use(express.json());
app.use("/", userClinicRouter);
app.use("/hedera", blockchainRouter);
app.use("", patientData);
app.use("", gptAssistant);
let port = process.env.PORT || 3001;


const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(port, () => {
    console.log('Express started on port: ', port);
    });


    