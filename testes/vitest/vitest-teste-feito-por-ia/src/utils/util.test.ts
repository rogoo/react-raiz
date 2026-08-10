import { describe, expect, it } from 'vitest';
import { isBlank, isValidEmail } from './util';

describe('isValidEmail', () => {
  it.each([
    'user@example.com',
    'first.last@sub.domain.org',
    'a@b.co',
    "o'brien+tag@mail.example.com",
    'UPPER@EXAMPLE.COM',
  ])('accepts %s', (value) => {
    expect(isValidEmail(value)).toBe(true);
  });

  it.each([
    ['empty string', ''],
    ['only whitespace', '   '],
    ['no at sign', 'userexample.com'],
    ['no domain', 'user@'],
    ['no local part', '@example.com'],
    ['no dot in domain', 'user@example'],
    ['single character tld', 'user@example.c'],
    ['trailing dot', 'user@example.'],
    ['inner space', 'user name@example.com'],
    ['two at signs', 'user@@example.com'],
  ])('rejects %s', (_label, value) => {
    expect(isValidEmail(value)).toBe(false);
  });

  it('ignores surrounding whitespace', () => {
    expect(isValidEmail('  user@example.com  ')).toBe(true);
    expect(isValidEmail('\tuser@example.com\n')).toBe(true);
  });
});

describe('isBlank', () => {
  it.each(['', ' ', '   ', '\t', '\n', ' \t\n '])(
    'treats %j as blank',
    (value) => {
      expect(isBlank(value)).toBe(true);
    },
  );

  it.each(['a', ' a ', 'Ada Lovelace', '0'])(
    'treats %j as filled in',
    (value) => {
      expect(isBlank(value)).toBe(false);
    },
  );
});
