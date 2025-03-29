package com.example.e_commerce_api.repository.order;

import com.example.e_commerce_api.entity.order.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {

}
