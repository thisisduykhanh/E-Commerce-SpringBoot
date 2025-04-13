package com.example.e_commerce_api.dto.cart;

import java.math.BigDecimal;
import java.util.List;

public record OrderCreateDTO(
        String fullName,
        String address,
        String phone,

        BigDecimal shippingFee,

        BigDecimal taxFee,

        List<Integer> cartDetailIds
) {
}
