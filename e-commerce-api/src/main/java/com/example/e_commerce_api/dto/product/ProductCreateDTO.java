package com.example.e_commerce_api.dto.product;

import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public record ProductCreateDTO(
        @NotBlank(message = "Product name is required")
        @Size(max = 255, message = "Product name must be less than or equal to 255 characters")
        String productName,

        @NotNull(message = "Product price is required")
        @Positive(message = "Product price must be greater than 0")
        BigDecimal price,

        @NotBlank(message = "Description must not be blank")
        String description,

        @NotNull(message = "Product type is required")
        Integer productTypeId,

        @NotNull(message = "Supplier is required")
        Integer supplierId,

        @NotEmpty(message = "At least one image is required")
        List<MultipartFile> images,

        @NotEmpty(message = "quantity must not be blank")
        @Positive(message = "quantity must be greater than 0")
        Integer quantity,

        @NotBlank(message = "Attributes must not be blank")
                String[] attributes
) {
}
