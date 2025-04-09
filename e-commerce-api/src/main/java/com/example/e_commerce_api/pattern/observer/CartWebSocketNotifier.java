package com.example.e_commerce_api.pattern.observer;

import org.springframework.stereotype.Component;

@Component
public class CartWebSocketNotifier implements CartObserver {

    // inject WebSocket service, or use messagingTemplate if with STOMP
    @Override
    public void updateCart(Integer accountId) {
        // Notify the WebSocket clients about the cart update
        // For example, you can use SimpMessagingTemplate to send a message to a specific topic
        // messagingTemplate.convertAndSend("/topic/cart/" + accountId, "Cart updated for account ID: " + accountId);
        System.out.println("WebSocket notification: Cart updated for account ID: " + accountId);
    }
}