import { createContext, onMount, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { configureCallbacks } from "./connection"
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
          on("peer_left", () => console.log("peer_left"))
          on("peer_joined", () => setState("self", "isPolite", true))
          on("signal", console.log)
          setState({ inCall: true, room })
          setState("peer", "connection", configureCallbacks({ push, setState }))
        },
        topic: `room:${room}`,
      })
    },
    leaveRoom() {
      leave({
        onError: console.error,
        // Could reset more
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
