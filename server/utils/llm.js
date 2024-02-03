/**
 * This module leverages the OpenAI API to generate chatbot responses based on user input, specifically designed 
 * to analyze emotions conveyed in user-submitted text and offer affirmations or encouragement. It utilizes the 
 * GPT-3.5 model to process the input and generate responses that are both relevant and supportive, enhancing 
 * the user experience by providing empathetic and insightful feedback.
 */
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
});

module.exports = {
    llmGetFriendResponse: async function (input) {
        const completion = await openai.chat.completions.create({
            messages: [{
                role: "system",
            
                content: `You are a helpful friend that gives affirmations to their emotions. You will look at the paragraph given to you and detect the emotion conveyed in the paragraph and offer words of encouragement.
            You must format your output as a JSON value that adheres to a given "JSON Schema" instance.
            
            "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.
            
            For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
            would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
            Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.
            
            Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!
            
            Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
            \`\`\`json
            {"type":"object","properties":{"emotion":{"type":"string","description":"The emotion conveyed by the user's question"},"affirmation":{"type":"string","description":"A similar story and an affirmation of the user's feelings"}},"required":["emotion","affirmation"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}
            \`\`\`
            
            This is the paragraph you need to work on:\n`
                    + input,
            }],
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            max_tokens: 128,
            top_p: 1
        });

        console.log("Utils openai call return: ", completion.choices[0]);
        return completion.choices[0];
    },
};

// Example LLM output:
// Utils openai call return:  {
//   index: 0,
//   message: {
//     role: 'assistant',
//     content: `{"emotion": "amusement", "affirmation": "That sounds like a fun and interesting experience! It's always fascinating to observe unusual phenomena like 
// zing bubbles. As for getting on the teacher's bad side, we all have our moments. Don't worry, it happens to everyone. Just keep being yourself and things will get better!"}`
//   },
//   logprobs: null,
//   finish_reason: 'stop'
// }
