package com.example.e_commerce_api.dto.product;

import java.util.Date;

public record ReviewUpdateDTO(
        Integer rating,
        String comment
) {
}
