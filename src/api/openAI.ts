import { OpenAI } from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

export async function getWinMessage(boardSize, playCount) {
  try {
    const response = await openai.createCompletions({
      model: "text-davinci-003",
      prompt:
        "say something snarky or sassy to your opponent after winning a game of tic tac toe. Don't be afraid to let them know how you really feel.",
      max_tokens: 60,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Something went wrong calling OpenAI API: ", error);
    return "Oops, I'm stumped. You have stumped me, human.";
  }
}
