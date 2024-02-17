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

//send health card data
app.post('/healthCardData', async(req, res) => {

    const userId = req.user.userId;

    try{
        const userData = await User.findOne({userId});     
        if(!userData){
            return res.status(400).json({error: 'A user with this userId does not exist.'});
        }
        //add health card data to user's data
        await User.updateOne({ "userId" : userId }, {$set:{"healthcardHASH": req.healthCard}});
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//update dependents of the user, given user's healcardHASH
app.post('/addDependents', async(req, res) => {

    const healthcardHASH = req.healthcardHASH;

    try{
        const userData = await User.findOne({"healthcardHASH": healthcardHASH});     
        if(!userData){
            return res.status(400).json({error: 'A user with this healthcardHASH does not exist.'});
        }
        if (!dependent){
            return res.status(400).json({error: 'Dependent cannot be empty.'});
        }
        //add health card data to user's data
        await User.updateOne({ "healthcardHASH" : healthcardHASH }, {$push:{"dependents": req.dependent}});
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

