package com.example.e_commerce_api.dto.product;

import java.math.BigDecimal;

public record OfficialPriceUpdateDTO(
        Integer id,
        Integer minQuantity,
        Integer maxQuantity,
        BigDecimal price
) {
}
