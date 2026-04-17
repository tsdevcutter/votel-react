import { getVotingTotalCost } from '../utils/voting'; // Adjust path if needed

describe('Voting Calculation', () => {
  test('calculates 280 votes at 0.5 rate correctly', () => {
    expect(getVotingTotalCost(280)).toBe('140.00');
  });

  test('returns two decimal places for small amounts', () => {
    expect(getVotingTotalCost(1)).toBe('0.50');
  });
});