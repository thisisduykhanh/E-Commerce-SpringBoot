package com.example.e_commerce_api.repository.cart;

import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.user.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByAccount(Account account);
}
