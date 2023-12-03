'use client';
import { createContext } from 'react';
import { INITIAL_GAME_STATE } from '../lib/constants';
import type { GameStateContextType } from '../lib/types';

const GameStateContext = createContext<GameStateContextType>(INITIAL_GAME_STATE);

export default GameStateContext