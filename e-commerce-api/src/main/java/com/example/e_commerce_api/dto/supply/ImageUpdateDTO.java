package com.example.e_commerce_api.dto.supply;

import org.springframework.web.multipart.MultipartFile;

public record ImageUpdateDTO(
        Integer id,
        MultipartFile file
) {
}
