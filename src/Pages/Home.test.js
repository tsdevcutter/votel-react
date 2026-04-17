// 1. MOCK EVERYTHING FIRST
jest.mock('react-router-dom', () => ({
  Link: () => <div />,
  useNavigate: () => jest.fn(),
}));

jest.mock('../components/EventSlide', () => () => <div />);

// 2. REQUIRE THE FUNCTION MANUALLY (This avoids the declaration error)
const { getVotingTotalCost } = require('./Home');

describe('getVotingTotalCost Utility', () => {
  test('multiplies votes by 0.5 and returns string with 2 decimals', () => {
    expect(getVotingTotalCost(100)).toBe('50.00');
    expect(getVotingTotalCost(1)).toBe('0.50');
    expect(getVotingTotalCost(0)).toBe('0.00');
  });

  test('handles large numbers correctly', () => {
    expect(getVotingTotalCost(280)).toBe('140.00');
  });
});