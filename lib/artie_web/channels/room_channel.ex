defmodule ArtieWeb.RoomChannel do
  use Phoenix.Channel

  @impl true
  def join("room:" <> _room_id, _payload, socket) do
    send(self(), :joined)
    {:ok, socket}
  end

  @impl true
  def handle_info(:joined, socket) do
    broadcast_from!(socket, "peer_joined", %{message: "Peer joined"})
    {:noreply, socket}
  end

  @impl true
  def handle_in("peer_joined", _payload, socket) do
    {:noreply, socket}
  end

  def handle_in("signal", payload, socket) do
    broadcast_from!(socket, "signal", payload)
    {:noreply, socket}
  end

  def handle_in("add", %{"x" => x, "y" => y}, socket) do
    message = "You added #{x} and #{y} which equals #{x + y}"
    {:reply, {:ok, %{"message" => message}}, socket}
  end

  @impl true
  def terminate({:shutdown, _}, socket) do
    broadcast!(socket, "peer_left", %{"message" => "Peer left"})
  end

  def terminate(_, _) do
    :ok
  end
end
