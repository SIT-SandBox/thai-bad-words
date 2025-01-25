import { addBadWords, removeBadWords, addPrefixes, getBadWords, addIgnoreList, scanBadWords } from './index';

describe('Thai Bad Words Detector using scanBadWords', () => {
  test('should detect basic bad words in a string', async () => {
    await expect(scanBadWords('ไอ้ควาย')).rejects.toThrow('Bad words detected!');
    await expect(scanBadWords('มึงโง่')).rejects.toThrow('Bad words detected!');
  });

  test('should handle clean text without throwing in a string', async () => {
    await expect(scanBadWords('สวัสดีครับ')).resolves.toBeUndefined();
    await expect(scanBadWords('ความดี')).resolves.toBeUndefined();
  });

  test('should handle ignored words in scanBadWords', async () => {
    addIgnoreList(['ควาย์']); // Add a word to the ignore list
    await expect(scanBadWords('ควาย์')).resolves.toBeUndefined(); // should not throw
  });

  test('should allow adding new bad words and detect them', async () => {
    addBadWords(['Hello']);
    await expect(scanBadWords('Hello')).rejects.toThrow('Bad words detected!');
  });

  test('should allow removing bad words and stop detecting them', async () => {
    const newBadWord = 'testbad';
    addBadWords([newBadWord]);
    await expect(scanBadWords(newBadWord)).rejects.toThrow('Bad words detected!');
    
    removeBadWords([newBadWord]);
    await expect(scanBadWords(newBadWord)).resolves.toBeUndefined(); // should not throw
  });

  test('should handle new prefixes and detect bad words with prefixes', async () => {
    addPrefixes(['super']);
    const badWords = getBadWords();
    expect(badWords.some(word => word.startsWith('super'))).toBeTruthy();

    // Test if a word with the prefix "super" gets detected
    await expect(scanBadWords('superbadword')).rejects.toThrow('Bad words detected!');
  });

  test('should handle special characters in bad words', async () => {
    await expect(scanBadWords('ไ*อ้*ค*ว*า*ย')).rejects.toThrow('Bad words detected!');
    await expect(scanBadWords('มึ_ง_โ_ง่')).rejects.toThrow('Bad words detected!');
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
