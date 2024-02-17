const express = require('express');
const app = express();

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

//Route for retrieving clinic data
app.get('/clinicData', async(req, res) => {

    const clinicId = req.user.clinicId;

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