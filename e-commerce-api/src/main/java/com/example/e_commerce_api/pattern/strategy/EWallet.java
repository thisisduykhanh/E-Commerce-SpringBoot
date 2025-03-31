package com.example.e_commerce_api.pattern.strategy;

import com.example.e_commerce_api.dto.payment.PaymentResponse;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.pattern.strategy.PaymentStrategy;
import org.springframework.stereotype.Component;

@Component("eWallet")
public class EWallet implements PaymentStrategy {
    @Override
    public PaymentResponse processPayment( Order order) {
        order.setOrderStatus(order.getOrderStatus().builder().id(2).name("PAID").build());
        order.setPaymentMethod("E-Wallet");
        return new PaymentResponse(true, "Thanh toán qua ví điện tử thành công!");
    }
}
