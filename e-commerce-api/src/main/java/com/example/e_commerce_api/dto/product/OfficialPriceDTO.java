package com.example.e_commerce_api.dto.product;

import java.math.BigDecimal;

public record OfficialPriceDTO (
        Integer id,
        Integer minQuantity,
        Integer maxQuantity,

        BigDecimal price
){

}
