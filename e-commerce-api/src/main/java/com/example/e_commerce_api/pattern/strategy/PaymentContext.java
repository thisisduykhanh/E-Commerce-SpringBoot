package com.example.e_commerce_api.pattern.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PaymentContext {
    private final Map<String, PaymentStrategy> paymentStrategies;

    @Autowired
    public PaymentContext(Map<String, PaymentStrategy> paymentStrategies) {
        this.paymentStrategies = paymentStrategies;
    }

    public PaymentStrategy getPaymentStrategy(String method) {
        return paymentStrategies.get(method);
    }
}
