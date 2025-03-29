package com.example.e_commerce_api.dto.cart;

import java.math.BigDecimal;
import java.util.List;

public record CartSupplierDTO(
        Integer id,
        String supplierName,
        String image,
        List<CartDetailDTO> cartDetailDTOs,

        Integer quantity,
        BigDecimal totalPrice
) {
}
