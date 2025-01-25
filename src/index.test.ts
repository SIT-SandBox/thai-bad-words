import { checkBadWords, addBadWords, removeBadWords, addPrefixes, getBadWords, addIgnoreList, scanBadWords } from './index';

describe('Thai Bad Words Detector', () => {
  test('should detect basic bad words', () => {
    expect(() => checkBadWords('ไอ้ควาย')).toThrow('Bad words detected!');
    expect(() => checkBadWords('มึงโง่')).toThrow('Bad words detected!');
  });

  test('should handle clean text without throwing', () => {
    expect(() => checkBadWords('สวัสดีครับ')).not.toThrow();
    expect(() => checkBadWords('ความดี')).not.toThrow();
  });

  test('should handle ignored words in checkBadWords', () => {
    addIgnoreList(['ควาย์']); // Add a word to the ignore list
    expect(() => checkBadWords('ควาย์')).not.toThrow();
  });

  test('should allow adding new bad words', () => {
    addBadWords(['Hello']);
    expect(() => checkBadWords('Hello')).toThrow('Bad words detected!');
  });

  test('should allow removing bad words', () => {
    const newBadWord = 'testbad';
    addBadWords([newBadWord]);
    expect(() => checkBadWords(newBadWord)).toThrow('Bad words detected!');
    
    removeBadWords([newBadWord]);
    expect(() => checkBadWords(newBadWord)).not.toThrow();
  });

  test('should handle new prefixes', () => {
    addPrefixes(['super']);
    const badWords = getBadWords();
    expect(badWords.some(word => word.startsWith('super'))).toBeTruthy();
  });

  test('should handle special characters in bad words', () => {
    expect(() => checkBadWords('ไ*อ้*ค*ว*า*ย')).toThrow('Bad words detected!');
    expect(() => checkBadWords('มึ_ง_โ_ง่')).toThrow('Bad words detected!');
  });

  test('should scan deeply nested objects for bad words', async () => {
    const nestedObj = {
      someKey: {
        nestedKey: 'ไอ้ควาย',
        anotherKey: ['มึงโง่']
      }
    };
    await expect(scanBadWords(nestedObj)).rejects.toThrow('Bad words detected!');

    const cleanObj = { key: 'สวัสดีครับ' };
    await expect(scanBadWords(cleanObj)).resolves.toBeUndefined();
  });

  test('should scan arrays for bad words', async () => {
    const badWordsArray = ['ไอ้ควาย', 'มึงโง่'];
    await expect(scanBadWords(badWordsArray)).rejects.toThrow('Bad words detected!');
  });

  test('should handle empty inputs gracefully', async () => {
    await expect(scanBadWords('')).resolves.toBeUndefined();
    await expect(scanBadWords([])).resolves.toBeUndefined();
    await expect(scanBadWords({})).resolves.toBeUndefined();
  });
});
