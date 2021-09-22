import { Match, Show, Switch } from "solid-js"

export default (props) => (
  <header id="header">
    <Show fallback={<h1>Welcome</h1>} when={props.room}>
      <h1>Welcome to Room #{props.room}</h1>
    </Show>
    <Switch>
      <Match when={props.inCall}>
        <button
          class="join"
          id="call-button"
          onClick={props.leaveRoom}
          type="button"
        >
          Leave Call
        </button>
      </Match>
      <Match when={!props.inCall}>
        <button
          class="leave"
          id="call-button"
          onClick={props.joinRoom}
          type="button"
        >
          Join Call
        </button>
      </Match>
    </Switch>
  </header>
)
