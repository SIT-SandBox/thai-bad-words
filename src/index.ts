import { Trie } from './trie/Trie';
import { 
    prefixes, 
    ignoreList, 
    rootWords, 
    badWordsList, 
    generateBadWords 
} from './words/wordLists';

const trie = new Trie();

function checkBadWords(input: string): void {
    const cleanedInput = input.replace(/[^a-zA-Z0-9\u0E00-\u0E7F]/g, '');

    for (let ignore of ignoreList) {
        if (cleanedInput.includes(ignore)) {
            return;
        }
    }

    if (trie.search(cleanedInput)) {
        throw new Error(`Bad words detected! Found: ${trie.search(cleanedInput)}`);
    }
}

export async function scanBadWords(input: Record<string,any> | string):Promise<void> {
    if (typeof input === 'string'){
        checkBadWords(input.toLowerCase());
    }else{
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                const value = input[key];
    
                if (typeof value === 'object' && value !== null) {
                    if (Array.isArray(value)) {
                        for (const item of value) {
                            if (typeof item === 'string') {
                                checkBadWords(item.toLowerCase());
                            } else if (typeof item === 'object' && item !== null) {
                                await scanBadWords(item);
                            }
                        }
                    } else {
                        await scanBadWords(value);
                    }
                } else if (typeof value === 'string') {
                    checkBadWords(value.toLowerCase());
                }
            }
        }
    }
}

export function addBadWords(newBadWords: string[]): void {
    const lowerCaseWords = newBadWords.map(word => word.toLowerCase());
    rootWords.push(...lowerCaseWords);
    generateBadWords();
    lowerCaseWords.forEach(word => trie.insert(word));
}

export function removeBadWords(wordsToRemove: string[]): void {
    const lowerCaseWordsToRemove = wordsToRemove.map(word => word.toLowerCase());
    const updatedRootWords = rootWords.filter(word => !lowerCaseWordsToRemove.includes(word.toLowerCase()));
    rootWords.length = 0;
    rootWords.push(...updatedRootWords);
    generateBadWords();
    const newTrie = new Trie();
    badWordsList.forEach(word => newTrie.insert(word.toLowerCase()));
    trie.root = newTrie.root;
}

export function addPrefixes(newPrefixes: string[]): void {
    const lowerCasePrefixes = newPrefixes.map(prefix => prefix.toLowerCase());
    prefixes.push(...lowerCasePrefixes);
    generateBadWords();
}

export function addIgnoreList(newIgnoreWords: string[]): void {
    const lowerCaseIgnoreWords = newIgnoreWords.map(word => word.toLowerCase());
    ignoreList.push(...lowerCaseIgnoreWords);
}

export function getBadWords(): string[] {
    return badWordsList;
}

// Init
generateBadWords();
badWordsList.forEach(word => trie.insert(word));
