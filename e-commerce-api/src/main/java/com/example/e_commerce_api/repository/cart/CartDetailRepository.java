package com.example.e_commerce_api.repository.cart;


import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    Optional<CartDetail> findByCartAndProduct(Cart cart, Product product);

    void deleteByCartAndProduct(Cart cart, Product product);

    List<CartDetail> findAllByCartOrderByDateDesc(Cart cart);

    void deleteByCart(Cart cart);
}
