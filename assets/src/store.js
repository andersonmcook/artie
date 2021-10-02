import { createContext, onMount, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { createWebSocket } from "./socket"

const StoreContext = createContext()

// Can't use initialState to reset state
const initialState = {
  inCall: false,
  peer: {
    connection: null,
    stream: null,
  },
  room: null,
  rtcConfig: null,
  self: {
    isIgnoringOffer: false,
    isMakingOffer: false,
    isPolite: false,
    isSettingRemoteAnswerPending: false,
    mediaConstraints: {
      audio: false,
      video: true,
    },
    stream: null,
  },
}

export function Provider(props) {
  const [state, setState] = createStore(initialState)
  const [connect, join, leave, push, on] = createWebSocket()

  const actions = {
    joinRoom(room) {
      join({
        onError: console.error,
        onOk: () => {
          on("peer_left", console.log)
          on("peer_joined", () => setState("self", "isPolite", true))
          on("signal", console.log)
          setState({ inCall: true, room })
          setState("peer", "connection", (connection) => {
            connection.onnegotiationneeded = () => {
              setState("self", "isMakingOffer", true)
              console.log("Attempting to make an offer...")
              connection.setLocalDescription().then(() => {
                push({
                  message: "signal",
                  payload: { description: connection.localDescription },
                })
                // Could tie this to `onOk`
                setState("self", "isMakingOffer", false)
              })
            }

            connection.onicecandidate = ({ candidate }) => {
              console.log("Attempting to handle an ICE candidate...")
              push({ message: "signal", payload: { candidate } })
            }

            // Example also includes `track` in callback
            connection.ontrack = ({ streams: [stream] }) => {
              console.log("Attempting to add media for peer...")
              setState({ peer: { stream } })
            }

            return connection
          })
        },
        topic: `room:${room}`,
      })
    },
    leaveRoom() {
      leave({
        onError: console.error,
        onOk: () => setState({ inCall: false, room: null }),
      })
    },
  }
  const store = [state, actions]

  onMount(() => {
    connect()
    const stream = new MediaStream()

    navigator.mediaDevices
      .getUserMedia(state.self.mediaConstraints)
      .then((media) => {
        stream.addTrack(media.getTracks()[0])

        const connection = new RTCPeerConnection(state.rtcConfig)
        setState({ peer: { connection }, self: { stream } })
      })
  })

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
