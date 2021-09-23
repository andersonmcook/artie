import { useStore } from "./store"
import Header from "./components/Header"
import Videos from "./components/Videos"

export default (props) => {
  const [store, actions] = useStore()

  return (
    <main id="interface">
      <Header
        inCall={store.inCall}
        joinRoom={[actions.joinRoom, "123"]}
        leaveRoom={actions.leaveRoom}
        room={store.room}
      />
      <Videos stream={props.stream} />
    </main>
  )
}
