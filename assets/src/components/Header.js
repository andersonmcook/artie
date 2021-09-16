export default () => (
  <header id="header">
    <h1>Welcome</h1>
    <button
      class="join"
      id="call-button"
      onClick={(_) => console.log("clicked")}
      type="button"
    >
      Join Call
    </button>
  </header>
)
