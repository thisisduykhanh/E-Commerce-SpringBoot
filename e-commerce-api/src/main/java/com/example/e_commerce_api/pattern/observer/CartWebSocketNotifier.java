package com.example.e_commerce_api.pattern.observer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class CartWebSocketNotifier implements CartObserver {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    // inject WebSocket service, or use messagingTemplate if with STOMP
    @Override
    public void updateCart(Integer accountId) {
        String destination = "/topic/cart/" + accountId;
        messagingTemplate.convertAndSend(destination, "Cart updated");
    }
}