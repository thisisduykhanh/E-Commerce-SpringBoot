package com.example.e_commerce_api.dto.invoice;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceItemDTO {
    private Integer productId;
    private String productName;
    private Integer quantity;
    private Double price;
    
}
