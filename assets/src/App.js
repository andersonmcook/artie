import { onMount } from "solid-js"
import { usePhoenix } from "./socket"
import { useStore } from "./store"
import Header from "./components/Header"
import Videos from "./components/Videos"

export default () => {
  const [store, actions] = useStore()
  const [connect, join, push] = usePhoenix()

  onMount(() => {
    connect()
    join({ onError: console.error, onOk: console.log, topic: "room:123" })
    push({
      message: "add",
      onError: console.error,
      onOk: console.log,
      onTimeout: console.error,
      payload: { x: 1, y: 2 },
    })
  })

  return (
    <main id="interface">
      <Header inCall={store.inCall} toggleInCall={actions.toggleInCall} />
      <Videos />
    </main>
  )
}
