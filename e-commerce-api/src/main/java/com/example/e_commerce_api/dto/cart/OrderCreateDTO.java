package com.example.e_commerce_api.dto.cart;

import java.util.List;

public record OrderCreateDTO(
        String fullName,
        String address,
        String phone,
        List<Integer> cartDetailIds
) {
}
