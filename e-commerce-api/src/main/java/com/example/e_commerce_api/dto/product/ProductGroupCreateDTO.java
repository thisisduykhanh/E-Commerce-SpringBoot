package com.example.e_commerce_api.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record ProductGroupCreateDTO (
        @NotBlank(message = "Product group name must not be blank")
        @Size(max = 255, message = "Product group name must not exceed 255 characters")
        String name,
        MultipartFile image
){
}
