package com.example.e_commerce_api.repository.order;

import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.entity.order.OrderDetail;
import com.example.e_commerce_api.entity.order.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    @Query("SELECT od FROM OrderDetail od WHERE od.order.id = :orderId")
    Page<OrderDetail> getOrderDetailByOrderId(@Param("orderId") Integer orderId, Pageable pageable);

    List<OrderDetail> findByOrder(Order order);
}
