package com.example.e_commerce_api.dto.product;

import com.example.e_commerce_api.dto.supply.ImageUpdateDTO;

import java.math.BigDecimal;
import java.util.List;

public record ProductUpdateDTO(
        Integer id,
        String productName,
        BigDecimal price,
        String description,
        Integer productTypeId,
        Integer supplierId,
        List<ImageUpdateDTO> images,
        Integer quantity,
        Boolean statusVerified,
        Boolean statusActive,

        String cpu,
        Integer ram,
        Integer storage,
        String screenSize,
        Integer batteryLife,
        Integer cameraMP,

        Boolean hasPenSupport,

        Boolean hasGPS,
        Boolean waterResistant,

        String noiseCanceling,

        Boolean wireless

) {
}
