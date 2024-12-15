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
  drawSize: number,
  roundNumber: number
): RoundType {
  const totalRounds = Math.ceil(Math.log2(drawSize));

  if (roundNumber > totalRounds || roundNumber < 1) {
    throw new Error(
      `Invalid roundNumber: ${roundNumber}. Must be between 1 and ${totalRounds} for a draw size of ${drawSize}.`
    );
  }

  const roundsFromEnd = totalRounds - roundNumber;

  if (roundsFromEnd === 0) return RoundType.FINAL;
  if (roundsFromEnd === 1) return RoundType.SEMI_FINAL;
  if (roundsFromEnd === 2) return RoundType.QUARTER_FINAL;

  const roundSize = Math.pow(2, roundsFromEnd);
  return `ROUND_OF_${roundSize}` as RoundType;
}
