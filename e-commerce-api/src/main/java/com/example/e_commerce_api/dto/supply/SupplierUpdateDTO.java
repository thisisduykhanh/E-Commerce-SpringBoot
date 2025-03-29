package com.example.e_commerce_api.dto.supply;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record SupplierUpdateDTO(
        Integer id,
        MultipartFile image,
        String supplyName,
        List<DeliveryUpdateDTO> deliveryUpdateDTOs,
        String address,
        String email,
        String password,
        Boolean status,
        Boolean statusVerified
) {
}
