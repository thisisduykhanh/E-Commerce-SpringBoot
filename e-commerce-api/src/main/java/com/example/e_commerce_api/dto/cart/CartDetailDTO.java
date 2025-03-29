package com.example.e_commerce_api.dto.cart;

import java.math.BigDecimal;

public record CartDetailDTO(
        Integer id,
        Integer productId,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal totalPrice,
        String productName,
        String image,
        Integer supplierId
) {
}
