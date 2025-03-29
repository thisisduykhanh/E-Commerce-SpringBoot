package com.example.e_commerce_api.entity.order;

import com.example.e_commerce_api.entity.product.Product;
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
@Table(name = "orderDetails")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orderdetail")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id_order")
    private Order order;
    @Column(name = "quantity_item_cartdetail")
    private Integer quantity;
    @Column(name = "unitprice_cartdetail")
    private BigDecimal unitPrice;
    @Column(name = "totalprice_cartdetail")
    private BigDecimal totalPrice;
}
