package com.example.e_commerce_api.entity.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_types")

public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_type_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type_name", unique = true, nullable = false)
    private ProductTypeEnum productTypeName;

    @ManyToOne
    @JoinColumn(name = "product_group_id")
    private ProductGroup productGroup;
}
