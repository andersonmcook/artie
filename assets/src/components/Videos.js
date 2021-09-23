export default (props) => (
  <article id="videos">
    <video
      id="self"
      autoplay
      muted
      playsinline
      poster="/images/placeholder.png"
      prop:srcObject={props.stream}
    ></video>
    <video
      id="peer"
      autoplay
      playsinline
      poster="/images/placeholder.png"
    ></video>
  </article>
)
