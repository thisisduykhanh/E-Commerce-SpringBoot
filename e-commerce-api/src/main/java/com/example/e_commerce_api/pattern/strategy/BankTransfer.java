package com.example.e_commerce_api.pattern.strategy;

import com.example.e_commerce_api.dto.payment.PaymentResponse;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.pattern.strategy.PaymentStrategy;
import org.springframework.stereotype.Component;

@Component("bankTransfer")
public class BankTransfer implements PaymentStrategy {
    @Override
    public PaymentResponse processPayment(Order order) {
        order.setOrderStatus(order.getOrderStatus().builder().id(2).name("PAID").build());
        order.setPaymentMethod("Bank Transfer");
        return new PaymentResponse(true, "Thanh toán qua chuyển khoản ngân hàng thành công!");
    }
}
