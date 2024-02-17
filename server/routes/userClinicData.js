const express = require('express');
const User = require('../schemas/User');
const Clinic = require('../schemas/Clinic');
const app = express();

app.use(express.json());

//Route for retrieving user data
app.get('/userData', async (req, res) => {
    const userId = req.user.userId;

    try{
        const userData = await User.findOne({userId});
        if (!userData){
            return res.status(400).json({error: 'A user with this userID does not exist.'});
        }

        res.status(200).json(userData);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

// creating new users
app.post('/userData', async (req, res) => {
    const body = req.body;

    try {
        const user = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
        });
        const newUser = await user.save();
    
        if (newUser == null){
            return res.status(400).json({error: 'new user was not saved!'});
        }
        res.status(200).json(newUser);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Route for retrieving clinic data
app.get('/clinicData', async(req, res) => {

    const clinicId = req.body.clinicId;

    try{
        const clinicData = await Clinic.findOne({clinicId});
        if (!clinicData){
            return res.status(400).json({error: 'A clinic with this clinicID does not exist.'});
        }

        res.status(200).json(clinicData);

    }catch(err){

        console.log(err);
        res.status(500).json(err);
    }

})


// creating new clinics
app.post('/clinicData', async(req, res) => {
    const body = req.body;
    try {
        const clinic = new Clinic({
            clinicName: body.clinicName,
            clinicAddress: body.clinicAddress,
            clinicPhoneNumber: body.clinicPhoneNumber,
            clinicEmail: body.clinicEmail
        });
        const newClinic = await clinic.save();
    
        if (newClinic == null){
            return res.status(400).json({error: 'new clinic was not saved!'});
        }
        res.status(200).json(newClinic);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = app;