package com.example.e_commerce_api.dto.product;

import java.util.List;

public record ProductGroupDTO(
        Integer id,
        String name,
        List<ProductTypeDTO> productTypesDTO,
        String imageUrl
) {
}
