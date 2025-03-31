package com.example.e_commerce_api.pattern.strategy;

import com.example.e_commerce_api.dto.payment.PaymentRequest;
import com.example.e_commerce_api.dto.payment.PaymentResponse;
import com.example.e_commerce_api.entity.order.Order;

public interface PaymentStrategy {
    PaymentResponse processPayment(Order order);
}
