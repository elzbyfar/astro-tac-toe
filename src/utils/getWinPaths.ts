import type { Board } from "../lib/types";

function getWinPaths(board: Board) {
  const directions = [
    [0, -1], // north
    [1, -1], // northEast
    [1, 0], // east
    [1, 1], // southEast
    [0, 1], // south
    [-1, 1], // southWest
    [-1, 0], // west
    [-1, -1], // northWest
  ];

  const seen: { [key: string]: {} } = {}; // trie to avoid duplicates

  const side = Math.sqrt(board.area);
  const match = board.matchToWin;

  const winningScenarios = [];

  const isInBounds = (newRow: number, newCol: number) => {
    return newRow < side && newRow >= 0 && newCol < side && newCol >= 0;
  };

  const makeIndex = (row: number, col: number) => row * side + col;

  let row = 0;
  let col = 0;

  while (row < side) {
    while (col < side) {
      for (const [x, y] of directions) {
        let combo = [makeIndex(row, col)];
        let newRow = row + x;
        let newCol = col + y;
        while (isInBounds(newRow, newCol) && combo.length < match) {
          combo.push(makeIndex(newRow, newCol));
          newRow += x;
          newCol += y;
        }

        if (combo.length === match) {
          combo = combo.sort((a, b) => (a > b ? 1 : -1));
          let node = seen;
          let notYetSeen = false;
          for (const value of combo) {
            if (!node[value]) {
              if (!notYetSeen) {
                notYetSeen = true;
              }
              node[value] = {};
            }
            node = node[value];
          }
          if (notYetSeen) {
            winningScenarios.push(combo);
          }
        }
      }
      col++;
    }
    col = 0;
    row++;
  }
  return winningScenarios;
}

export default getWinPaths;
