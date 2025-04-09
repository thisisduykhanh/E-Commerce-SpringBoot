package com.example.e_commerce_api.pattern.observer;


import java.util.ArrayList;
import java.util.List;

public class CartSubject {
    private final List<CartObserver> observers = new ArrayList<>();

    public void attach(CartObserver observer) {
        observers.add(observer);
    }

    public void detach(CartObserver observer) {
        observers.remove(observer);
    }

    public void notifyCartUpdated(Integer accountId) {
        for (CartObserver observer : observers) {
            observer.updateCart(accountId);
        }
    }
}

