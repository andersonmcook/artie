export default (props) => (
  <header id="header">
    <h1>Welcome</h1>
    <button
      classList={{ join: !props.inCall, leave: props.inCall }}
      id="call-button"
      onClick={props.toggleInCall}
      type="button"
    >
      {props.inCall ? "Leave" : "Join"} Call
    </button>
  </header>
)
