import type { Board, Move, Result, StyleObject } from "./types";
import { WINNING_SCENARIOS } from "./constants";

// export function stylesReducer(styleObject: StyleObject) {
//   // this function takes a style object and returns a function that
//   // trades a base string for a string containing tailwind classes for all breakpoints

//   return (input: string | string[]) => {
//     let classes: string = "";

//     const bases: string[] = Array.isArray(input) ? input : [input];
//     for (const base of bases) {
//       for (const [key, styles] of Object.entries(styleObject)) {
//         if (key.startsWith(base)) {
//           classes += styles + " ";
//         }
//       }
//     }
//     return classes;
//   };
// }
