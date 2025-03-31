package com.example.e_commerce_api.service.cart;

import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.repository.cart.CartDetailRepository;
import com.example.e_commerce_api.repository.cart.CartRepository;
import com.example.e_commerce_api.repository.product.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartDetailService {

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private  CartService cartService;

    @Transactional
    public CartDetail createOrUpdateCartDetail( Integer productId, Integer quantity) {
        // Tìm Cart
        Cart cart = cartService.getCartForCurrentUser();

        // find product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with ID " + productId + " not found"));

        // check cartDetail is exist
        Optional<CartDetail> existingCartDetailOpt = cartDetailRepository.findByCartAndProduct(cart, product);

        if (existingCartDetailOpt.isPresent()) {
            // update quantity if cartDetail is exist
            CartDetail existingCartDetail = existingCartDetailOpt.get();
            existingCartDetail.setQuantity(existingCartDetail.getQuantity() + quantity);
            existingCartDetail.setDate(LocalDateTime.now());

            // remove cartDetail if quantity <= 0
            if (existingCartDetail.getQuantity() <= 0) {
                cartDetailRepository.delete(existingCartDetail);
                return null;
            }

            try {
                return cartDetailRepository.save(existingCartDetail);
            } catch (ObjectOptimisticLockingFailureException e) {
                throw new CustomException(Error.CART_UNABLE_TO_SAVE);
            }
        } else {
            // Tạo mới CartDetail nếu không tồn tại
            if (quantity <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than 0 for new CartDetail");
            }

            CartDetail newCartDetail = new CartDetail();
            newCartDetail.setDate(LocalDateTime.now());
            newCartDetail.setCart(cart);
            newCartDetail.setProduct(product);
            newCartDetail.setQuantity(quantity);
            return cartDetailRepository.save(newCartDetail);
        }
    }
    public void deleteCartDetail( Integer cartDetailId) {
        // Tìm Cart
        CartDetail cartDetail =cartDetailRepository.findById(cartDetailId).orElseThrow(()->new CustomException(Error.CARTDETAIL_NOT_FOUND));
        cartDetailRepository.delete(cartDetail);
    }
    public void deleteAllCartDetailsByCart() {
        // Tìm Cart
        Cart cart =cartService.getCartForCurrentUser();

        // Xóa tất cả CartDetail liên quan đến Cart
        cartDetailRepository.deleteByCart(cart);
    }
    public List<CartDetail> getCartDetailsForCurrentUser() {
        // Lấy username từ SecurityContext
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Lấy Cart từ Account
        Cart cart = cartService.getCartForCurrentUser();
        // Lấy danh sách CartDetail từ Cart
        return cartDetailRepository.findAllByCartOrderByDateDesc(cart);
    }
    public CartDetail updateCartDetail(Integer cartDetailId, Integer quantity) {
        // Tìm Cart của người dùng hiện tại
        CartDetail cartDetail=cartDetailRepository.findById(cartDetailId)
                .orElseThrow(()-> new CustomException(Error.CARTDETAIL_NOT_FOUND));
        cartDetail.setQuantity( quantity);

        return cartDetailRepository.save(cartDetail);
    }

}
