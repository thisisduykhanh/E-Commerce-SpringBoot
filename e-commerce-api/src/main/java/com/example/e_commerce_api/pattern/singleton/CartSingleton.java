package com.example.e_commerce_api.pattern.singleton;

import com.example.e_commerce_api.entity.product.Product;

import java.util.ArrayList;
import java.util.List;

import java.util.ArrayList;
import java.util.List;

public class CartSingleton {
    private static CartSingleton instance;
    private final List<Product> cartItems;

    private CartSingleton() {
        cartItems = new ArrayList<>();
    }

    public static synchronized CartSingleton getInstance() {
        if (instance == null) {
            instance = new CartSingleton();
        }
        return instance;
    }

    public void addItem(Product product) {
        cartItems.add(product);
    }

    public List<Product> getItems() {
        return cartItems;
    }

    public void clearCart() {
        cartItems.clear();
    }

    public int getTotalItems() {
        return cartItems.size();
    }
}

