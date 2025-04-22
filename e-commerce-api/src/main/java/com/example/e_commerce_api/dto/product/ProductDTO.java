package com.example.e_commerce_api.dto.product;

import com.example.e_commerce_api.dto.supply.ImageDTO;

import java.math.BigDecimal;
import java.util.List;

public record ProductDTO(
        Integer id,
        String productName,

        BigDecimal price,
        String description,
        String productTypeName,
        String supplierName,
        List<ImageDTO> images,
        Integer quantity,
        Integer batteryLife,  // Chỉ có ở Headphone
        Boolean isWireless,   // Chỉ có ở Headphone
        String noiseCancellation, // Chỉ có ở Headphone
        String cpu,           // Chỉ có ở Laptop
        Integer ram,          // Chỉ có ở Laptop
        Integer storage
) {
}
