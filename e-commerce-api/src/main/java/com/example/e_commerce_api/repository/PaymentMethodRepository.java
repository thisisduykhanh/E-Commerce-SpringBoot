package com.example.e_commerce_api.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository {
    void processPayment(double amount);
}
