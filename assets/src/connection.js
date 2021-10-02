const onICECandidate =
  (push) =>
  ({ candidate }) => {
    console.log("Attempting to handle an ICE candidate...")
    push({ message: "signal", payload: { candidate } })
  }

const onNegotiationNeeded =
  ({ connection, push, setState }) =>
  () => {
    setState("self", "isMakingOffer", true)
    console.log("Attempting to make an offer...")
    connection.setLocalDescription().then(() => {
      push({
        message: "signal",
        payload: { description: connection.localDescription },
      })
      // Could tie this to `onOk` of `push`
      setState("self", "isMakingOffer", false)
    })
  }

// Example also includes `track` in callback
const onTrack =
  (setState) =>
  ({ streams: [stream] }) => {
    console.log("Attempting to add media for peer...")
    setState({ peer: { stream } })
  }

export const configureCallbacks =
  ({ push, setState }) =>
  (connection) => {
    connection.onicecandidate = onICECandidate(push)

    connection.onnegotiationneeded = onNegotiationNeeded({
      connection,
      push,
      setState,
    })

    connection.ontrack = onTrack(setState)

    return connection
  }
