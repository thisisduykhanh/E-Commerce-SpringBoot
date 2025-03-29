package com.example.e_commerce_api.pattern.strategy;

import java.math.BigDecimal;

public class PaymentContext {
    private PaymentStrategy paymentStrategy;

    public PaymentContext(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void pay(BigDecimal amount) {
        paymentStrategy.pay(amount);
    }
}

