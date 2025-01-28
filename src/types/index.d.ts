declare module '@sit-sandbox/thai-bad-words' {
  export function addPrefixes(newPrefixes: string[]): void;
  export function addIgnoreList(newIgnoreWords: string[]): void;
  export function addBadWords(newBadWords: string[]): void;
  export function scanBadWords(input: Record<string, any>): void;
  export function removeBadWords(wordsToRemove: string[]): void;
  export function getBadWords(): string[];
}
