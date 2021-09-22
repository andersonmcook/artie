import { createContext, onMount, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import { createWebSocket } from "./socket"

const StoreContext = createContext()

// Can't use initialState to reset state
const initialState = {
  inCall: false,
  room: null,
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
          on("peer_joined", console.log)
          setState({ inCall: true, room })
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

  onMount(connect)

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
