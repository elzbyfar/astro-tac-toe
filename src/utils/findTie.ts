import type { Move } from "../lib/types";
import findEmptySpots from "./findEmptySpots";

const findTie = (moves: Move[]) => findEmptySpots(moves).length === 0;

export default findTie;
