const prompt = require('prompt');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

// Create a new configuration object with the API key recieved from the https://openai.com/ website
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

function talk() {
    // Get the user's input
    prompt.get(['input'], function (err, result) {
        // Create a new completion request
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: result.input,
            max_tokens: 100,
        }).then((completion) => {
            // Log the completion
            console.log(completion.data.choices[0].text);

            // Check if the completion is done
            if (completion.data.choices[0].finish_reason === "length") {
                console.log("...")
            }

            // Ask the user for more input
            talk();
        })
        .catch((error) => {
            // Log the error
            console.log(error);
        });
    });
}

// Run the completion
talk();