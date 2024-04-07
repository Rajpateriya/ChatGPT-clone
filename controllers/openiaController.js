const dotenv = require("dotenv");
dotenv.config();
const { OpenAiApi } = require("openai");

// Assuming process.env.OPENAI_API_KEY is correctly configured with your API key

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    const openai = new OpenAiApi(process.env.OPENAI_API_KEY);

    const response = await openai.createCompletion({
      engine: "davinci", // Use "davinci" as the model name
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      const generatedText = response.data.choices[0].text.trim(); // Trim whitespace
      return res.status(200).json({ summary: generatedText });
    } else {
      console.log("Incomplete or invalid response from OpenAI API");
      return res.status(500).json({ message: "Incomplete or invalid response from OpenAI API" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;

    const openai = new OpenAiApi(process.env.OPENAI_API_KEY);

    const response = await openai.createCompletion({
      engine: "text-davinci-003", // Use "text-davinci-003" as the model name
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      const generatedText = response.data.choices[0].text.trim(); // Trim whitespace
      return res.status(200).json({ paragraph: generatedText });
    } else {
      console.log("Incomplete or invalid response from OpenAI API");
      return res.status(500).json({ message: "Incomplete or invalid response from OpenAI API" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how yoda from star war would.
      Me: 'what is your name?'
      yoda: 'yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
