package com.example.e_commerce_api.pattern.observer;

import com.example.e_commerce_api.entity.product.Product;

public interface CartObserver {
    void update(int itemCount);
}