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

const patientData = {
      "GLUCOSE": { "Result": generateRandomValue(), "Units": "mg/dL", "Reference Range": "74-106" },
      "SODIUM": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "135-145" },
      "POTASSIUM": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "3.5-5.2" },
      "CHLORIDE": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "96-106" },
      "CARBON DIOXIDE (BICARBONATE)": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "23-29" },
      "BUN (BLOOD UREA NITROGEN)": { "Result": generateRandomValue(), "Units": "mg/dL", "Reference Range": "7-20" },
      "CREATININE": { "Result": generateRandomValue(), "Units": "mg/dL", "Reference Range": "0.5-1.2" },
      "BUN/CREATININE RATIO": { "Result": generateRandomValue(), "Units": "ratio", "Reference Range": "10-20" },
      "IRON": { "Result": generateRandomValue(), "Units": "Âµg/dL", "Reference Range": "60-170" },
      "URIC ACID": {"Result": generateRandomValue(3.5, 7.2), "Units": "mg/dL", "Reference Range": "3.5-7.2"},
      "PHOSPHATE": {"Result": generateRandomValue(2.4, 4.1), "Units": "mg/dL", "Reference Range": "2.4-4.1"},
      "CALCIUM": {"Result": generateRandomValue(8.6, 10.2), "Units": "mg/dL", "Reference Range": "8.6-10.2"},
      "MAGNESIUM": {"Result": generateRandomValue(1.7, 2.2), "Units": "mg/dL", "Reference Range": "1.7-2.2"},
      "CHOLESTEROL": {"Result": generateRandomValue(125, 200), "Units": "mg/dL", "Reference Range": "125-200"},
      "HDL CHOLESTEROL": {"Result": generateRandomValue(40, 60), "Units": "mg/dL", "Reference Range": "> 40"},
      "LDL CHOL., CALCULATED": {"Result": generateRandomValue(100, 129), "Units": "mg/dL", "Reference Range": "100-129"},
      "TRIGLYCERIDES": {"Result": generateRandomValue(150, 199), "Units": "mg/dL", "Reference Range": "150-199"},
      "PROTEIN, TOTAL": {"Result": generateRandomValue(6.0, 8.3), "Units": "g/dL", "Reference Range": "6.0-8.3"},
      "ALBUMIN": {"Result": generateRandomValue(3.5, 5.0), "Units": "g/dL", "Reference Range": "3.5-5.0"},
      "GLOBULIN, CALCULATED": {"Result": generateRandomValue(2.0, 3.5), "Units": "g/dL", "Reference Range": "2.0-3.5"},
      "A/G RATIO": {"Result": generateRandomValue(1.1, 2.5), "Units": "ratio", "Reference Range": "1.1-2.5"},
      "BILIRUBIN, TOTAL": {"Result": generateRandomValue(0.1, 1.2), "Units": "mg/dL", "Reference Range": "0.1-1.2"},
      "BILIRUBIN, DIRECT": {"Result": generateRandomValue(0.0, 0.3), "Units": "mg/dL", "Reference Range": "0.0-0.3"},
    };
// Define a GET route for '/populateAddress'
rou.get('/populateAddress', (req, res) => {
    // Respond with the list of clinics in JSON format
    res.json(clinics);
});
module.exports = router;
