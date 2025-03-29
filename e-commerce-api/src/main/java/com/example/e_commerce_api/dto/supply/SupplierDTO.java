package com.example.e_commerce_api.dto.supply;

import java.util.List;

public record SupplierDTO(
        Integer id,
        String supplyName,
        Boolean status,
        String address,
        String image,
        List<String> deliveryNames,
        List<String> productTypeNames
) {
}
