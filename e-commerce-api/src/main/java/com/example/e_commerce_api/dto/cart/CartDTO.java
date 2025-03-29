package com.example.e_commerce_api.dto.cart;

import java.math.BigDecimal;
import java.util.List;
public record CartDTO(
        Integer id,
        String userName,
        List<CartSupplierDTO> cartSupplierDTOs,

        Integer quantity,
        BigDecimal totalPrice
) {
    public CartDTO {
    }
}
