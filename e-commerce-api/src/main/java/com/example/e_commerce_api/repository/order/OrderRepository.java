package com.example.e_commerce_api.repository.order;

import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.entity.order.OrderStatus;
import com.example.e_commerce_api.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    Page<Order> findByOrderStatus(OrderStatus orderStatus, Pageable pageable);
    Page<Order> findByUserOrderByCreateDateDesc(User user, Pageable pageable);
}
