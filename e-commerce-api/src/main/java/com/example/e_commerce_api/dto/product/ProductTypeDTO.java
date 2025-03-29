package com.example.e_commerce_api.dto.product;

import com.example.e_commerce_api.entity.product.ProductTypeEnum;
public record ProductTypeDTO(
        Integer id,
        String  productTypeName
) {
}
