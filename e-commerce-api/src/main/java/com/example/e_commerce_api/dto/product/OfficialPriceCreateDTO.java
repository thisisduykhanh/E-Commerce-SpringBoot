package com.example.e_commerce_api.dto.product;

import java.math.BigDecimal;

public record OfficialPriceCreateDTO (
        Integer minQuantity,
        Integer maxQuantity,
        BigDecimal price
){
}
