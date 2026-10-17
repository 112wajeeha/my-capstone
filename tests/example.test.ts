import { describe, it, expect } from 'vitest';

describe('Briefly basic tests', () => {
  it('recognizes an empty message', () => {
    const message = '   ';

    expect(message.trim()).toBe('');
  });

  it('recognizes a non-empty message', () => {
    const message = 'Summarize this meeting';

    expect(message.trim()).not.toBe('');
  });
});