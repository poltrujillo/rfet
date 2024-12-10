export enum RoundType {
  FINAL = 'Final',
  SEMI_FINAL = 'Semi Final',
  QUARTER_FINAL = 'Quarter Final',
  ROUND_OF_16 = 'Round of 16',
  ROUND_OF_32 = 'Round of 32',
  ROUND_OF_64 = 'Round of 64',
  ROUND_OF_128 = 'Round of 128',
}

export function determineRoundType(
  totalPlayers: number,
  roundNumber: number
): RoundType {
  const totalRounds = Math.ceil(Math.log2(totalPlayers));
  const roundsFromEnd = totalRounds - roundNumber;

  if (roundNumber > totalRounds) {
    throw new Error(
      `Invalid roundNumber: ${roundNumber} exceeds totalRounds: ${totalRounds}`
    );
  }

  switch (roundsFromEnd) {
    case 0:
      return RoundType.FINAL;
    case 1:
      return RoundType.SEMI_FINAL;
    case 2:
      return RoundType.QUARTER_FINAL;
    case 3:
      return RoundType.ROUND_OF_16;
    case 4:
      return RoundType.ROUND_OF_32;
    case 5:
      return RoundType.ROUND_OF_64;
    case 6:
      return RoundType.ROUND_OF_128;
    default:
      throw new Error(`Unsupported roundNumber: ${roundNumber}`);
  }
}
