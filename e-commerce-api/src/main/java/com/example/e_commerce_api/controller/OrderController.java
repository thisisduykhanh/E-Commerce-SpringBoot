package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.cart.OrderCreateDTO;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping()
    public ResponseEntity<ApiResponse<List<Order>>> createOrdersFromCartDetails(@RequestBody OrderCreateDTO orderCreateDto) {
        List<Order> orders = orderService.createOrdersFromCartDetails(orderCreateDto);
        ApiResponse<List<Order>> response = new ApiResponse<>( true, "Tạo đơn hàng từ giỏ hàng thành công", orders, null);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<String>> updateOrderStatus(@RequestParam Integer idOrder, @RequestParam Integer idStatus) {
        orderService.updateStatus(idOrder, idStatus);
        ApiResponse<String> response = new ApiResponse<>(true, "Cập nhật trạng thái đơn hàng thành công", "true", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<Page<Order>>> getOrders(@RequestParam("idOrderStatuts") Integer idOrderStatuts, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> ordersPage = orderService.getOrdersBySupplierAndStatus(idOrderStatuts, pageable);
        ApiResponse<Page<Order>> response = new ApiResponse<>(true, "Lấy danh sách đơn hàng thành công", ordersPage, null);
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
}