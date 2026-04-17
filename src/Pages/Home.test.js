import { getVotingTotalCost } from './Home';

jest.mock('react-router-dom', () => ({
  Link: () => <div />,
  useNavigate: () => jest.fn(),
}));

// This prevents Jest from actually trying to read Swiper inside EventSlide
jest.mock('../components/EventSlide', () => () => <div />);

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