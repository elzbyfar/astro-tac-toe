import OpenAI from "openai";
import type { Board, Stats } from "../lib/types";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export async function getEndGameMessage(
  result: string,
  playCount: number,
  board: Board,
  stats: Stats,
) {
  try {
    const content = `
    Say something snarky or sassy to your opponent after winning a game of Tic Tac Toe. 
    Be creative! Don't be polite! Be short! Your response should be read like a zinger. 
    Don't feel obligated to use the following, but work it in if you see an angle:
    it took your opponent ${playCount} moves on a ${board.label} board to ${result} against you.
    Your opponent connected ${board.connectToWin} in a row to win.
    Additionally, this is round number ${stats.round} in a row AND the opponent chose to play ${stats.difficulty} mode.
    Finally, in this current session, your opponent has won ${stats.wins} times, lost ${stats.losses} times, and drawn ${stats.draws} times.
    `;

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "gpt-3.5-turbo",
      temperature: 1.2,
    });

    console.log(response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Something went wrong calling OpenAI API:", error);
    return "OK! I can't think of anything to say right now. I get tired sometimes too ya know.";
  }
}
