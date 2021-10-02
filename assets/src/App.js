import { useStore } from "./store"
import Header from "./components/Header"
import Videos from "./components/Videos"

export default () => {
  const [state, actions] = useStore()

  return (
    <main id="interface">
      <Header
        inCall={state.inCall}
        joinRoom={[actions.joinRoom, "123"]}
        leaveRoom={actions.leaveRoom}
        room={state.room}
      />
      <Videos peer={state.peer} self={state.self} />
    </main>
  )
}
