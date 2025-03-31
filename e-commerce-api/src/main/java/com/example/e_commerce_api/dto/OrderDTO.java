package com.example.e_commerce_api.dto;

import com.example.e_commerce_api.entity.order.Order;

import java.math.BigDecimal;

public record OrderDTO(Integer id, String fullName, String phone, BigDecimal totalPrice, Integer supplierId, Long userId) {
    public static OrderDTO fromEntity(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getFullname(),
                order.getPhone(),
                order.getTotalPrice(),
                order.getSupplier().getId(), // Chỉ lấy ID
                order.getUser().getId() // Chỉ lấy ID
        );
    }
}

