package com.example.e_commerce_api.entity.product;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "official_prices",
        indexes = {
                @Index(name = "idx_official_price_price", columnList = "price_official_price"),

        }
)


public class OfficialPrice {
    @Id
    @Column(name = "id_official_price")
    private Integer id;
    @Column(name = "min_quantity_official_price")
    private Integer minQuantity;
    @Column(name = "max_quantity_official_price")
    private Integer maxQuantity;
    @Column(name = "price_official_price")
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
}
