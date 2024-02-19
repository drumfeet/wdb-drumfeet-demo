export function handle(state, action) {
  const input = action.input

  switch (input.function) {
    case "postMessage":
      return postMessage(state, action)
    case "upvoteMessage":
      return upvoteMessage(state, action)
    case "downvoteMessage":
      return downvoteMessage(state, action)
    case "readMessage":
      return readMessage(state, action)
    default:
      throw new ContractError(
        `No function supplied or function not recognised: "${input.function}"`
      )
  }
}
