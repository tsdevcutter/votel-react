export const SMS_RATE = 0.5;

export const getVotingTotalCost = (voteCount) => {
  return (voteCount * SMS_RATE).toFixed(2);
};