package com.example.e_commerce_api.entity.order;

import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_orderStatus")
    private OrderStatus orderStatus;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_supplier")
    private Supplier supplier;
    @Column(name = "quantity_item_order")
    private Integer quantity;
    @Column(name = "total_price_order")
    private BigDecimal totalPrice;
    @Column(name = "date_create_order")
    private LocalDateTime createDate;
    private String fullname;
    private String address;
    private String phone;


    private BigDecimal shippingFee;
    private BigDecimal taxFee;

    private String paymentMethod;

    private boolean isReviewed = false;
}
