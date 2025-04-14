// CartSocketListener.jsx
import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function CartSocketListener({ accountId, onCartUpdate }) {
  useEffect(() => {
    const socket = new SockJS("http://localhost:8085/ws"); // Đổi lại đúng endpoint backend của bạn
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/cart/${accountId}`, (message) => {
          console.log("Cart update received:", message.body);
          onCartUpdate();
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [accountId, onCartUpdate]);

  return null;
}

export default CartSocketListener;
