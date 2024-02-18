const express = require('express');
const router = express.Router();
const {  default: OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have set your API key in your environment variables
});

async function send(userPrompt) {
  try {
      const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // or any other available model you wish to use
          messages: [{role: 'system', content: ```Use the following user to answer my question at the bottom
          GLUCOSE
Result: 84

Units: mg/dL

Reference Range: 74-106

SODIUM
Result: 67

Units: mmol/L

Reference Range: 135-145

POTASSIUM
Result: 21

Units: mmol/L

Reference Range: 3.5-5.2

CHLORIDE
Result: 94

Units: mmol/L

Reference Range: 96-106

CARBON DIOXIDE (BICARBONATE)
Result: 79

Units: mmol/L

Reference Range: 23-29

BUN (BLOOD UREA NITROGEN)
Result: 41

Units: mg/dL

Reference Range: 7-20

CREATININE
Result: 84

Units: mg/dL

Reference Range: 0.5-1.2

BUN/CREATININE RATIO
Result: 44

Units: ratio

Reference Range: 10-20

IRON
Result: 59

Units: µg/dL

Reference Range: 60-170``` + userPrompt}]
      
      });
      return response.choices[0].text.trim(); // Returns the text response
  } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error; // Rethrow the error to be caught by the calling function
  }
}

// async function send(prompt) {
//     return new Promise(async (resolve, reject) => {
//     const openai = new OpenAI({
//       // apiKey: "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",
//       organization: "org-",
//       apiKey: "sk-"
//     });

//     let final;

//     console.log('Sending message to openAI...');
//     const thread = await openai.beta.threads.create();
//     const message = await openai.beta.threads.messages.create(
//       thread.id,
//       {
//         role: "user",
//         content: prompt
//       }
//     );
//     console.log(JSON.stringify(message));

//     const run = await openai.beta.threads.runs.create(
//       thread.id,
//       { 
//         assistant_id: "asst_RjCesu6HoMsIQofE4ZF1ZOXF", // asst_L1M9sbwhGxa5k47ap4Ed4kx9
//       }
//     );

//     const checkStatusAndPrintMessages = async (threadId, runId) => {
//       let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
//       console.log(runStatus.status);
//       if (runStatus.status === 'completed') {
//         const replies = await openai.beta.threads.messages.list(threadId);
//         const assistantObject = replies.body.data.find(message => message.role === "assistant");
//         const assistantContent = assistantObject.content[0].text.value;
        
//         console.log(assistantContent);
//         resolve(assistantContent); // Resolve the promise with assistantContent
//       } else {
//         // Continue checking until the status is completed
//         setTimeout(checkStatusAndPrintMessages, 10000, threadId, runId);
//       }
//     };

//     // Start checking the status
//     checkStatusAndPrintMessages(thread.id, run.id);
//   });
// };


//Route for retrieving gpt text, given user input
router.get('/assistant', async (req, res) => {
	const userPrompt = req.query.prompt;

    try{ 
		const assistantText = await send(userPrompt);
		res.status(200).json(assistantText);

    }catch(err){
      console.log(err);
      res.status(500).json(err);
	}


});


module.exports = router;