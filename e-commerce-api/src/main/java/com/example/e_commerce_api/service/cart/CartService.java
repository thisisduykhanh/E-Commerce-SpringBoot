package com.example.e_commerce_api.service.cart;

import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.repository.cart.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.UUID;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;





    public Cart getCartForCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return cartRepository.findByAccount(account)
                .orElseGet(() -> createCartForUser(account)); // Tạo mới giỏ hàng nếu chưa có
    }


    public Cart createCartForUser(Account account) {
        Cart cart = new Cart();
        cart.setId(getGenerationId());
        cart.setAccount(account);
        return cartRepository.save(cart);
    }
    public Integer getGenerationId() {
        UUID uuid = UUID.randomUUID();
        // Use most significant bits and ensure it's within the integer range
        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
    }

}
