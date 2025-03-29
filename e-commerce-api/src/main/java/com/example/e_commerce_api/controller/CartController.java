package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.cart.CartDTO;
import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.mapper.CartMapper;
import com.example.e_commerce_api.service.cart.CartDetailService;
import com.example.e_commerce_api.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")

public class CartController {
    @Autowired
    private CartService cartService; // Dịch vụ xử lý giỏ hàng
    @Autowired
    private CartDetailService cartDetailService; // Dịch vụ xử lý chi tiết giỏ hàng
    @Autowired
    private CartMapper cartMapper;

    // 1. Lấy danh sách chi tiết giỏ hàng
    @GetMapping()
    public ResponseEntity<ApiResponse<CartDTO>> getAllCartDetails() {
        // Lấy giỏ hàng của người dùng hiện tại từ CartService
        Cart cart = cartService.getCartForCurrentUser();

        // Lấy danh sách CartDetail từ Cart
        List<CartDetail> cartDetails = cartDetailService.getCartDetailsForCurrentUser();
        CartDTO cartDTO=cartMapper.toDTO(cart,cartDetails);

        // Tạo ApiResponse chứa danh sách CartDetailDTO
        ApiResponse<CartDTO> response = new ApiResponse<>(

                true,
                "Fetched all cart details successfully",
                cartDTO,null
        );

        return ResponseEntity.ok(response);
    }

    // 2. Thêm sản phẩm hoặc cập nhật số lượng nếu đã tồn tại
    @PostMapping()
    public ResponseEntity<ApiResponse<Boolean>> createOrUpdateCartDetail(@RequestParam Integer productId, @RequestParam Integer quantity) {
        CartDetail cartDetail = cartDetailService.createOrUpdateCartDetail(productId, quantity);


        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Cart detail added or updated successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }

    // 3. Cập nhật chi tiết giỏ hàng
    @PatchMapping("/details")
    public ResponseEntity<ApiResponse<Boolean>> updateCartDetail(@RequestParam Integer cartDetailId, @RequestParam Integer quantity) {
        CartDetail updatedCartDetail = cartDetailService.updateCartDetail(cartDetailId, quantity);


        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Cart detail updated successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }

    // 4. Xóa một chi tiết giỏ hàng
    @DeleteMapping("/details")
    public ResponseEntity<ApiResponse<Boolean>> deleteCartDetail(@RequestParam Integer cartDetailId) {
        cartDetailService.deleteCartDetail(cartDetailId);

        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Cart detail deleted successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }

    // 5. Xóa toàn bộ giỏ hàng
    @DeleteMapping
    public ResponseEntity<ApiResponse<Boolean>> clearCart() {
        cartDetailService.deleteAllCartDetailsByCart();

        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Cart cleared successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }
}