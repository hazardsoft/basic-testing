import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -1, b: 1, action: Action.Add })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Multiply })).toBe(1);
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: 0, b: 1, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 2, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Exponentiate })).toBe(
      0,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: '' })).toBe(null);
    expect(simpleCalculator({ a: 1, b: 1, action: '**' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 1, b: '', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: '', b: 1, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: '', b: '', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: null, b: '', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: '', b: undefined, action: Action.Add })).toBe(
      null,
    );
  });
});
