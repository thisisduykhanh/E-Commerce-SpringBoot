package com.example.e_commerce_api.repository.order;

import com.example.e_commerce_api.entity.order.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
}
