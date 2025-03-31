package com.example.e_commerce_api.pattern.singleton;

import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.repository.cart.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CartSingletonService {
    private static CartSingletonService instance;

    @Autowired
    private CartRepository cartRepository;

    private CartSingletonService() {}

    public static synchronized CartSingletonService getInstance() {
        if (instance == null) {
            instance = new CartSingletonService();
        }
        return instance;
    }

    public Cart getCartForCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return cartRepository.findByAccount(account)
                .orElseGet(() -> createCartForUser(account));
    }

    private Cart createCartForUser(Account account) {
        Cart cart = new Cart();
        cart.setId(generateId());
        cart.setAccount(account);
        return cartRepository.save(cart);
    }

    private Integer generateId() {
        UUID uuid = UUID.randomUUID();
        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
    }
}
