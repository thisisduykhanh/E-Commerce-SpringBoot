package com.example.e_commerce_api.dto.invoice;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceCreateDTO {
    private Integer id;
    private Double totalPrice;
    private List<InvoiceItemDTO> items;

}
