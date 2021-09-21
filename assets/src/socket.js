import { Socket } from "phoenix"
import { createSignal } from "solid-js"

// Placeholder function
const f = () => {}

// Probably want to handle multiple channels
export const usePhoenix = () => {
  const socket = new Socket("/socket", { params: { token: window.userToken } })
  let channel

  const connect = () => socket.connect()

  const join = ({
    onError = f,
    onOk = f,
    payload = {},
    topic = "room:123",
  }) => {
    channel = socket.channel(topic, payload)

    channel.join().receive("error", onError).receive("ok", onOk)
  }

  const push = ({
    message,
    onError = f,
    onOk = f,
    onTimeout = f,
    payload,
    timeout,
  }) => {
    channel
      .push(message, payload, timeout)
      .receive("error", onError)
      .receive("ok", onOk)
      .receive("timeout", onTimeout)
  }

  return [connect, join, push]
}
