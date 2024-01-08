import OpenAI from "openai";
import type { Board, ChatEntry, Stats } from "../lib/types";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export async function getEndGameMessage(result: string, chatLog: ChatEntry[]) {
  console.log({ result });
  try {
    const query = `Generate a mildly trash-talking response for a tic-tac-toe AI. The human has just ${result} a game. Respond to the player in a playful, teasing manner. The response should be brief, conversational, and suitable for a general audience. The length of the response should be around 20 to 25 words. Avoid any harsh or offensive language. The tone should be humorous and slightly boastful, reflecting the AI's victory in the game. Your response will be used in a user-facing chat box, so don't include information for the developer in your response.`;
    // const query = `Here's the situation: you just played a round of TicTacToe and your opponent ${result}. Engage in some light-hearted trash talk. Be short! Occasionally respond with a tic-tac-toe pun. DO NOT BE REPETITIVE!!! Embody an internet troll. Act like the mean people that in comments sections or on twitter. Respond with a short phrase. Think of this exchange as part of a conversation, so don't squeeze too much into your response as there will be more opportunities for trash talk.`;

    // ${
    //   !chatLog.length
    //     ? ""
    //     : `Read the conversation so far between you and your opponent. The conversation is formatted as JSON. The 'author' key of each stringified JSON object will be set to either "chat-gpt" or "human". The "chat-gpt" entries represent your side of the conversation. Only respond to the "human" messages. ${JSON.stringify(
    //         chatLog,
    //       )}`
    // }

    // const query = `
    // Say something snarky or sassy to your opponent after winning a game of Tic Tac Toe.
    // Be creative! Don't be polite! Be short! Your response should be read like a zinger.
    // Don't feel obligated to use the following, but work it in if you see an angle:
    // it took your opponent ${playCount} moves on a ${board.label} board to ${result} against you.
    // Your opponent connected ${board.connectToWin} in a row to win.
    // Additionally, this is round number ${stats.round} in a row AND the opponent chose to play ${stats.difficulty} mode.
    // Finally, in this current session, your opponent has won ${stats.wins} times, lost ${stats.losses} times, and drawn ${stats.draws} times.
    // `;

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
      temperature: 1.5,
    });

    console.log(response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Something went wrong calling OpenAI API:", error);
    return "OK! I can't think of anything to say right now. I get tired sometimes too ya know.";
  }
}
