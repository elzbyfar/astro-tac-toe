import React, { useState } from 'react';
import type { ReactNode } from 'react';
import GameStateContext from './GameStateContext';
import { INITIAL_RESULT, INITIAL_METADATA } from '../lib/constants';
import type { Move, Result, Metadata} from '../lib/types';

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [moveStack, setMoveStack] = useState<Move[]>([]);
  const [humanTurn, setHumanTurn] = useState(true);
  const [result, setResult] = useState<Result>(INITIAL_RESULT);
  const [metadata, setMetadata] = useState<Metadata>(INITIAL_METADATA);
  return (
    <GameStateContext.Provider value={{ 
      moveStack,
      setMoveStack,
      humanTurn,
      setHumanTurn,
      result,
      setResult,
      metadata,
      setMetadata,
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

