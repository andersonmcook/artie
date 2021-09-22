import { Socket } from "phoenix"

// Placeholder function
const f = () => {}

// Consider adding/handling timeout

// Probably want to handle multiple channels
export const createWebSocket = () => {
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

  const leave = ({ onError = f, onOk = f }) => {
    channel.leave().receive("error", onError).receive("ok", onOk)
  }

  const push = ({ message, onError = f, onOk = f, payload }) => {
    channel.push(message, payload).receive("error", onError).receive("ok", onOk)
  }

  const on = (message, callback) => {
    channel.on(message, callback)
  }

  return [connect, join, leave, push, on]
}
