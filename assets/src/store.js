import { createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import socket from "./socket"

// We'll actually join a channel later
const channel = socket.channel("room:123", {})

channel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp)
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp)
  })
//

const StoreContext = createContext()

const initialState = {
  inCall: false,
}

export function Provider(props) {
  const [state, setState] = createStore(initialState)
  const actions = {
    toggleInCall() {
      setState("inCall", (inCall) => !inCall)
    },
  }
  const store = [state, actions]
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
