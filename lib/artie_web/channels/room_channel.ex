defmodule ArtieWeb.RoomChannel do
  use Phoenix.Channel

  @impl true
  def join("room:" <> _room_id, _payload, socket) do
    broadcast!(socket, "connected", %{})
    {:ok, socket}
  end

  def handle_in("connected", _payload, socket) do
    {:noreply, socket}
  end

  def handle_in("signal", payload, socket) do
    broadcast!(socket, "signal", payload)
    {:noreply, socket}
  end

  def terminate({:shutdown, _}, socket) do
    broadcast!(socket, "disconnect", %{})
  end

  def terminate(_, _) do
    :ok
  end
end
