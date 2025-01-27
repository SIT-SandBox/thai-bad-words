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
        throw new Error(`Bad words detected! Found: ${cleanedInput}`);
    }
}

export async function scanBadWords(input: Record<string,any> | string):Promise<void> {
    if (typeof input === 'string'){
        checkBadWords(input);
    }else{
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                const value = input[key];
    
                if (typeof value === 'object' && value !== null) {
                    if (Array.isArray(value)) {
                        for (const item of value) {
                            if (typeof item === 'string') {
                                checkBadWords(item);
                            } else if (typeof item === 'object' && item !== null) {
                                await scanBadWords(item);
                            }
                        }
                    } else {
                        await scanBadWords(value);
                    }
                } else if (typeof value === 'string') {
                    checkBadWords(value);
                }
            }
        }
    }
}

export function addBadWords(newBadWords: string[]): void {
    rootWords.push(...newBadWords);
    generateBadWords();
    newBadWords.forEach(word => trie.insert(word));
}

export function removeBadWords(wordsToRemove: string[]): void {
    const updatedRootWords = rootWords.filter(word => !wordsToRemove.includes(word));
    rootWords.length = 0;
    rootWords.push(...updatedRootWords);
    generateBadWords();
    const newTrie = new Trie();
    badWordsList.forEach(word => newTrie.insert(word));
    trie.root = newTrie.root;
}

export function addPrefixes(newPrefixes: string[]): void {
    prefixes.push(...newPrefixes);
    generateBadWords();
}

export function addIgnoreList(newIgnoreWords: string[]): void {
    ignoreList.push(...newIgnoreWords);
}

export function getBadWords(): string[] {
    return badWordsList;
}

// Init
generateBadWords();
badWordsList.forEach(word => trie.insert(word));
