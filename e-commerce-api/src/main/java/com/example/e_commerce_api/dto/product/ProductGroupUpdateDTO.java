package com.example.e_commerce_api.dto.product;

import org.springframework.web.multipart.MultipartFile;

public record ProductGroupUpdateDTO(
        Integer id,
        String name,
        MultipartFile image
) {
}
