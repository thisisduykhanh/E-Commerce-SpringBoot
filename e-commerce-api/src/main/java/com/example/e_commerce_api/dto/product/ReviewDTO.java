package com.example.e_commerce_api.dto.product;

import java.util.Date;

public record ReviewDTO(
        Integer id,
        Integer productId,
        String fullName,

        Date date,

        Integer rating,
        String comment
) {
}
