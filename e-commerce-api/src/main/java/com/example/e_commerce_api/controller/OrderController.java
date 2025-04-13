package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.OrderDTO;
import com.example.e_commerce_api.dto.OrderDetailDTO;
import com.example.e_commerce_api.dto.cart.OrderCreateDTO;
import com.example.e_commerce_api.dto.payment.PaymentRequest;
import com.example.e_commerce_api.dto.payment.PaymentResponse;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.entity.order.OrderDetail;
import com.example.e_commerce_api.service.order.OrderDetailService;
import com.example.e_commerce_api.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;


    @PostMapping("/{orderId}/pay")
    public ResponseEntity<ApiResponse<PaymentResponse>> payOrder(
            @PathVariable Integer orderId,
            @RequestParam String method) {

        PaymentResponse response = orderService.processPayment(orderId, method);
        ApiResponse<PaymentResponse> apiResponse = new ApiResponse<>(true, "Thanh toán thành công", response, null);
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<List<OrderDTO>>> createOrdersFromCartDetails(@RequestBody OrderCreateDTO orderCreateDto) {
        List<OrderDTO> orders = orderService.createOrdersFromCartDetails(orderCreateDto);
        ApiResponse<List<OrderDTO>> response = new ApiResponse<>( true, "Tạo đơn hàng từ giỏ hàng thành công", orders, null);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<String>> updateOrderStatus(@RequestParam Integer idOrder, @RequestParam Integer idStatus) {
        orderService.updateStatus(idOrder, idStatus);
        ApiResponse<String> response = new ApiResponse<>(true, "Cập nhật trạng thái đơn hàng thành công", "true", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<Order>>> getOrders() {
        List<Order> ordersPage = orderService.getAllOrders();
        ApiResponse<List<Order>> response = new ApiResponse<>(true, "Lấy danh sách đơn hàng thành công", ordersPage, null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/myOrders")
    public ResponseEntity<ApiResponse<List<Order>>> getOrdersByUser() {
        Pageable pageable = PageRequest.of(0, 10);
        // hoặc thay đổi theo nhu cầu của bạn
        Page<Order> ordersPage = orderService.getOrdersByUser(pageable);
        ApiResponse<List<Order>> response = new ApiResponse<>(true, "Lấy danh sách đơn hàng thành công", ordersPage.getContent(), null);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<List<OrderDetailDTO>>> getOrderById(@PathVariable Integer orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            ApiResponse<List<OrderDetailDTO>> notFoundResponse = new ApiResponse<>(
                    false,
                    "Không tìm thấy đơn hàng với ID: " + orderId,
                    null,
                    null
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundResponse);
        }

        Pageable pageable = PageRequest.of(0, 10);
        Page<OrderDetail> orderDetailsPage = orderDetailService.getOrderDetailByOrderId(orderId, pageable);

        // Mapping OrderDetail -> OrderDetailDTO
        List<OrderDetailDTO> orderDetailDTOs = orderDetailsPage.getContent().stream()
                .map(od -> OrderDetailDTO.builder()
                        .id(od.getId())
                        .productId(od.getProduct().getId())
                        .productName(od.getProduct().getProductName())
                        .productPrice(od.getProduct().getPrice())
                        .quantity(od.getQuantity())
                        .totalPrice(od.getTotalPrice())
                        .build())
                .collect(Collectors.toList());

        ApiResponse<List<OrderDetailDTO>> successResponse = new ApiResponse<>(
                true,
                "Lấy thông tin đơn hàng thành công",
                orderDetailDTOs,
                null
        );

        return ResponseEntity.ok(successResponse);
    }


    @PatchMapping("/viewed/{orderId}")
    public ResponseEntity<ApiResponse<String>> updateOrderViewed(@PathVariable Integer orderId) {
            orderService.updateOrderViewed(orderId);
        ApiResponse<String> response = new ApiResponse<>(true, "Cập nhật đơn hàng thành công", "true", null);
        return ResponseEntity.ok(response);
    }


}