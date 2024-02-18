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

const clinics = [
    {"name": "Hernandez-Simpson Clinic", "address": "742 Johnson Mall\nEast Kaylastad, AR 07938", "email": "warrenmark@taylor-lopez.net"},
    {"name": "Martin Inc Clinic", "address": "38724 Kyle Alley\nKimberlyville, MT 52976", "email": "jasonbarnett@hotmail.com"},
    {"name": "Kane-Lee Clinic", "address": "9791 Kristopher Underpass\nTimbury, CA 91457", "email": "katherinewilson@jackson.biz"},
    {"name": "Strickland LLC Clinic", "address": "638 Jeremy Camp\nLisaport, MS 19245", "email": "kevinsparks@hotmail.com"},
    {"name": "Atkinson PLC Clinic", "address": "291 Floyd Flats\nPorterstad, IA 65728", "email": "elizabeth99@yahoo.com"},
    {"name": "Shaw-Gomez Clinic", "address": "8774 Harris Pines Suite 358\nSouth Elizabethmouth, KS 64247", "email": "warrenbianca@berg.com"},
    {"name": "Peterson-Walters Clinic", "address": "336 Davis Street Apt. 998\nOrtizview, TX 35158", "email": "thomasdesiree@sullivan-jones.com"},
    {"name": "Hughes, Mckinney and Warner Clinic", "address": "655 Paul Turnpike Suite 471\nHarveymouth, MD 95249", "email": "stacey46@yahoo.com"},
    {"name": "Woodward, Vargas and Howell Clinic", "address": "980 Brown Grove Apt. 479\nRobertfurt, SC 81445", "email": "wdavis@gmail.com"},
    {"name": "Johnson Group Clinic", "address": "63761 Mcintyre Extension Suite 825\nWallhaven, CT 86111", "email": "michelle83@yahoo.com"}
];

// Define a GET route for '/populateAddress'
router.get('/populateClinic', (req, res) => {
    // Respond with the list of clinics in JSON format
    res.json(clinics);
});

module.exports = router;
