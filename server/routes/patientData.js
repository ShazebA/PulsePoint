const express = require('express');
const app = express();

//to read in .testnames
const fs = require('fs');
const readline = require('readline');

//Route for sending patient data
app.get('/patientData', async (req, res) => {
    const patientData = {};

    const file = readline.createInterface({ 
        input: fs.createReadStream('.testnames'), 
        output: process.stdout, 
        terminal: false
    }); 

    //each time a line is read from the filestream, populate patientData with the testName and its values
    file.on('line', (line) => { 
        //'line' is a test name
        console.log(line); 
        patientData.line =  {"Result": null, "Units": null, "Reference Range": null};
    });

    try{
        res.status(200).send(JSON.stringify(patientData));
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
