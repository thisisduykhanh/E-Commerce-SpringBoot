package com.example.e_commerce_api.entity.supply;

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
@Table(name = "deliveries")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long id;

   @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

   @Column(name = "info")
    private String info;
}
