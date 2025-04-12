package com.example.e_commerce_api.dto.product;

import java.util.Date;

public record ReviewCreateDTO(
        Integer productId,
        Integer rating,
        String comment

) {
}
