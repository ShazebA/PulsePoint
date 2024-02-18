const express = require('express');
const User = require('../schemas/User');
const Clinic = require('../schemas/Clinic');
const router = express.Router();
const bcrypt = require('bcrypt');


router.use(express.json());
router.post('/updateHealthCard', async (req, res) => {
    const { healthCard } = req.body;
    const userEmail = "aleksbrsc@gmail.com"; // Assuming you have user session management
  
    if (!healthCard) {
      return res.status(400).json({ success: false, message: 'Health card number is required.' });
    }
  
    try {
      // Hash the health card number
      const saltRounds = 10;
      const healthCardHASH = await bcrypt.hash(healthCard, saltRounds);
  
      // Update the user's health card hash in the database
      await User.updateOne({ userEmail: userEmail }, { $set: { healthCardHASH } });
  
      res.json({ success: true, message: 'Health card updated successfully.' });
    } catch (error) {
      console.error('Error updating health card:', error);
      res.status(500).json({ success: false, message: 'Failed to update health card.' });
    }
  });

  
router.get('/verifyUser', async (req, res) => {
    const params = req.query;
    console.log("From /verifyUser");
    try {
        User.findOne({email: params.email}).then(result => {
            res.json(result);
        }).catch(error => {
            if(error){
                console.log(error);
                return res.json(error);
            }
        });
    } catch(err) {
        console.error("ERROR From /verifyUser: " + err);
        res.status(500).json(err);
    }
});

//Route for retrieving user data
router.get('/retrieveUser', async (req, res) => {
    const userId = req.query.userId;

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

router.post('/updateUser', async (req, res) => {
    const body = req.body;

    User.findOneAndUpdate({_id: body._id}, body, {new: true}).then(updated => {
        if (updated){
            console.log("From /updateUser: "+ updated);
            res.status(200).json(updated);
        } else {
            return null;
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

// creating new users
router.post('/createUser', async (req, res) => {
    const body = req.body;
    console.log("From /createUser: " + body);
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
        console.log("From /createUser: " + err);
        res.status(500).json(err);
    }
})

//Route for retrieving clinic data
router.get('/retrieveClinic', async(req, res) => {

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
router.post('/createClinic', async(req, res) => {
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

//send health card data
router.post('/healthCardData', async(req, res) => {

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
router.post('/addDependents', async(req, res) => {

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

module.exports = router;
