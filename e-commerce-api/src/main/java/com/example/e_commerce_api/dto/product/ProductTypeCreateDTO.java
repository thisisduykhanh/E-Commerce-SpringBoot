package com.example.e_commerce_api.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductTypeCreateDTO(
        @NotBlank(message = "Product type name must not be blank")
        @Size(max = 255, message = "Product type name must not exceed 255 characters")
        String productTypeName
) {

}
