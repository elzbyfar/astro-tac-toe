import { atom } from "nanostores";
import { BOARDS, INITIAL_RESULT, INITIAL_STATS } from "./constants";
import type { Result, Move, Stats, Board, ChatEntry } from "./types";

export const activeGameStore = atom<boolean>(false);
export const activeRoundStore = atom<boolean>(false);
export const moveStackStore = atom<Move[]>([]);
export const isHumanTurnStore = atom<boolean>(true);
export const undidPrevMoveStore = atom<boolean>(false);
export const resultStore = atom<Result>(INITIAL_RESULT);
export const statsStore = atom<Stats>(INITIAL_STATS);
export const hintStore = atom<number | null>(null);
export const boardStore = atom<Board>(BOARDS[0]);
export const chatLogStore = atom<ChatEntry[]>([]);
export const isChatOpenStore = atom<boolean>(false);
export const chatInputStore = atom<string>("");

// actions to update the stores
export const setActiveGame = (value: boolean) => activeGameStore.set(value);
export const setActiveRound = (value: boolean) => activeRoundStore.set(value);
export const setMoveStack = (stack: Move[]) => moveStackStore.set(stack);
export const setIsHumanTurn = (value: boolean) => isHumanTurnStore.set(value);
export const setUndidPrevMove = (value: boolean) =>
  undidPrevMoveStore.set(value);
export const setResult = (result: Result) => resultStore.set(result);
export const setStats = (stats: Stats) => statsStore.set(stats);
export const setHint = (hint: number | null) => hintStore.set(hint);
export const setBoard = (board: Board) => boardStore.set(board);
export const setChatLog = (chat: ChatEntry[]) => chatLogStore.set(chat);
export const setIsChatOpen = (value: boolean) => isChatOpenStore.set(value);
export const setChatInput = (value: string) => chatInputStore.set(value);
