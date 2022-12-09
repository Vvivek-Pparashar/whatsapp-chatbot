const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.data);
  const answer = response.data.choices[0].text.split("\n\n")[1];
  console.log(answer);
  return answer;
}
//Ask an example question
module.exports = {
  ask,
};
