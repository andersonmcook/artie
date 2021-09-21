import { useStore } from "../store"
export default () => {
  // When I was destructuring inCall out of store, it was not re-rendering the component
  const [store, { toggleInCall }] = useStore()

  return (
    <header id="header">
      <h1>Welcome</h1>
      <button
        classList={{ join: !store.inCall, leave: store.inCall }}
        id="call-button"
        onClick={toggleInCall}
        type="button"
      >
        {store.inCall ? "Leave" : "Join"} Call
      </button>
    </header>
  )
}
