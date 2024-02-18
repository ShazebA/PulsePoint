const express = require('express');
const OpenAI = require('openai');
const router = express.Router();


async function send(prompt) {
    return new Promise(async (resolve, reject) => {
    const openai = new OpenAI({
      // apiKey: "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",
      organization: "org-",
      apiKey: "sk-"
    });

    let final;

    console.log('Sending message to openAI...');
    const thread = await openai.beta.threads.create();
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: prompt
      }
    );
    console.log(JSON.stringify(message));

    const run = await openai.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: "asst_RjCesu6HoMsIQofE4ZF1ZOXF", // asst_L1M9sbwhGxa5k47ap4Ed4kx9
      }
    );

    const checkStatusAndPrintMessages = async (threadId, runId) => {
      let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      console.log(runStatus.status);
      if (runStatus.status === 'completed') {
        const replies = await openai.beta.threads.messages.list(threadId);
        const assistantObject = replies.body.data.find(message => message.role === "assistant");
        const assistantContent = assistantObject.content[0].text.value;
        
        console.log(assistantContent);
        resolve(assistantContent); // Resolve the promise with assistantContent
      } else {
        // Continue checking until the status is completed
        setTimeout(checkStatusAndPrintMessages, 10000, threadId, runId);
      }
    };

    // Start checking the status
    checkStatusAndPrintMessages(thread.id, run.id);
  });
};


//Route for retrieving gpt text, given user input
router.get('/assistant', async (req, res) => {
	const userPrompt = req.prompt;

    try{ 
    	if (userPrompt==""){
        	return res.status(400).json({error: 'Prompt cannot be empty.'});
		}

		const assistantText = send(userPrompt);
		if (assistantText==""){
			return res.status(400).json({error: 'Assistant response not found.'});
		}
		res.status(200).json(assistantText);

    }catch(err){
      console.log(err);
      res.status(500).json(err);
	}


});


module.exports = router;