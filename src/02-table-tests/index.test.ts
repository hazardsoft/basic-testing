import { simpleCalculator, Action } from './index';

const testCases = [
  // Action.Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Action.Subtract
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  // Action.Multiply
  { a: 0, b: 0, action: Action.Multiply, expected: 0 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 0, b: 1, action: Action.Multiply, expected: 0 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  // Action.Divide
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 0, b: 1, action: Action.Divide, expected: 0 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  // Action.Exponentiate
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  // null for invalid action
  { a: 1, b: 1, action: '', expected: null },
  { a: 1, b: 1, action: '**', expected: null },
  // null for invalid args
  { a: 1, b: '', action: Action.Add, expected: null },
  { a: '', b: 1, action: Action.Add, expected: null },
  { a: '', b: '', action: Action.Add, expected: null },
  { a: null, b: '', action: Action.Add, expected: null },
  { a: '', b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator($a, $b, $action) = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
