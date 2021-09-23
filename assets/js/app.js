// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

import App from "../src/App"
import { Provider } from "../src/store"
import { render } from "solid-js/web"

// Truly cursed
var STREAM = new MediaStream()
function createTrack() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then(function (media) {
      STREAM.addTrack(media.getTracks()[0])

      return render(
        () => (
          <Provider>
            <App stream={STREAM} />
          </Provider>
        ),
        document.getElementById("app")
      )
    })
}

createTrack()

// render(
//   () => (
//     <Provider>
//       <App stream={STREAM} />
//     </Provider>
//   ),
//   document.getElementById("app")
// )
