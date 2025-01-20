declare module 'thai-bad-words' {
  export function addPrefixes(newPrefixes: string[]): void;
  export function addIgnoreList(newIgnoreWords: string[]): void;
  export function checkBadWords(input: string): void;
  export function addBadWords(newBadWords: string[]): void;
  export function removeBadWords(wordsToRemove: string[]): void;
  export function getBadWords(): string[];
}
