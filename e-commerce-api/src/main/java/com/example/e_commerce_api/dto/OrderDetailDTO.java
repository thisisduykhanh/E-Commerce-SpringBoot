package com.example.e_commerce_api.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {
    private Integer id;                  // ID của OrderDetail
    private Integer productId;           // ID sản phẩm
    private String productName;          // Tên sản phẩm
    private BigDecimal productPrice;     // Giá sản phẩm
    private Integer quantity;            // Số lượng đặt
    private BigDecimal totalPrice;       // Tổng tiền
}
