import { createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import socket from "./socket"

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
