export function getVotingId(votingObj) {
  const id = votingObj?.value['_hex']
  if (id === undefined) {
    throw new Error(
      `Error getting voting id of voting: ${JSON.stringify(votingObj)}`,
    )
  }
  return id
}
