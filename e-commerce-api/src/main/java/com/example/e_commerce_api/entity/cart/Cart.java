package com.example.e_commerce_api.entity.cart;


import com.example.e_commerce_api.entity.user.Account;
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
@Table(name = "carts")
public class Cart {
    @Id
    @Column(name = "id_cart")
    private Integer id;
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
