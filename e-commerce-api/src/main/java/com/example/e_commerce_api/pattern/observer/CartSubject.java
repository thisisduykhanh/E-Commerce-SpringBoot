package com.example.e_commerce_api.pattern.observer;

import com.example.e_commerce_api.entity.product.Product;

import java.util.ArrayList;
import java.util.List;

public class CartSubject {
    private final List<CartObserver> observers = new ArrayList<>();
    private int itemCount = 0;

    public void addObserver(CartObserver observer) {
        observers.add(observer);
    }

    public void setItemCount(int count) {
        this.itemCount = count;
        notifyObservers();
    }

    private void notifyObservers() {
        for (CartObserver observer : observers) {
            observer.update(itemCount);
        }
    }
}
