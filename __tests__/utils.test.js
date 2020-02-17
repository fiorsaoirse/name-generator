import { generateWords } from '../src/utils';

describe('Utils testing', () => {
  test('Generate words from an array', () => {
    const data1 = ['aaa', 'bbb', 'ccc'];
    const data2 = ['1a', '2b', '3c'];
    const expected1 = ['aaabbb', 'aaaccc', 'bbbaaa', 'bbbccc', 'cccaaa', 'cccbbb'];
    const expected2 = ['1a2b', '1a3c', '2b1a', '2b3c', '3c1a', '3c2b'];
    const result1 = generateWords(data1);
    const result2 = generateWords(data2);

    expect(result1).toEqual(expected1);
    expect(result2).toEqual(expected2);
  })
});