package com.example.e_commerce_api.dto.supply;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record SupplierCreateDTO(
        MultipartFile image,
        String supplyName,
        List<DeliveryCreateDTO> deliveryCreateDTOs,
        String address,
        String email,
        String password
) {
}
