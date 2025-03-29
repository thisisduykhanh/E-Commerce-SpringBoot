package com.example.e_commerce_api.pattern.strategy;

import java.math.BigDecimal;

public class CreditCard implements PaymentStrategy {
    @Override
    public void pay(BigDecimal amount) {
        System.out.println("Paid " + amount + " via Credit Card");
    }
}
