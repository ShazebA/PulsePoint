const { mode } = require('crypto-js');
const express = require('express');
const router = express.Router();


const generateRandomValue = () => Math.floor(Math.random() * 90) + 10;


router.get('/patientData', (req, res) => {
    const patientData = {
      "GLUCOSE": { "Result": generateRandomValue(), "Units": "mg/dL", "Reference Range": "74-106" },
      "SODIUM": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "135-145" },
      "POTASSIUM": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "3.5-5.2" },
      "CHLORIDE": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "96-106" },
      "CARBON DIOXIDE (BICARBONATE)": { "Result": generateRandomValue(), "Units": "mmol/L", "Reference Range": "23-29" },
      "BUN (BLOOD UREA NITROGEN)": { "Result": generateRandomValue(), "Units": "mg/dL", "Reference Range": "7-20" },
      "CREATININE": { "Result": generateRandomValue(), "Units": "mg/dL", "Reference Range": "0.5-1.2" },
      "BUN/CREATININE RATIO": { "Result": generateRandomValue(), "Units": "ratio", "Reference Range": "10-20" },
      "IRON": { "Result": generateRandomValue(), "Units": "µg/dL", "Reference Range": "60-170" },
    };
  
    res.json(patientData);
  });
  

module.exports = router;