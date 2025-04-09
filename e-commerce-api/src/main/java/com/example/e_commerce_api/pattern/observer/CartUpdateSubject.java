package com.example.e_commerce_api.pattern.observer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class CartUpdateSubject extends CartSubject {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public void notifyCartUpdated(Integer accountId) {
        String destination = "/topic/cart/" + accountId;
        messagingTemplate.convertAndSend(destination, "Cart updated");
    }
}