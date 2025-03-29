package com.example.e_commerce_api.entity.cart;

import com.example.e_commerce_api.entity.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cartDetails")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cart_detail")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @Column(name = "quantity_item_cartdetail")
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
    @Column(name = "date_cartDetail")
    private LocalDateTime date;
}
