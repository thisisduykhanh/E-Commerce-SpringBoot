package com.example.e_commerce_api.service.order;


import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.entity.order.OrderDetail;
import com.example.e_commerce_api.repository.order.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public void createOrderDetail(CartDetail cartDetail, Order order) {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setProduct(cartDetail.getProduct());
        orderDetail.setQuantity(cartDetail.getQuantity());
        orderDetail.setUnitPrice(cartDetail.getProduct().getPrice());
        orderDetail.setTotalPrice(cartDetail.getProduct().getPrice().multiply(BigDecimal.valueOf(cartDetail.getQuantity())));
        orderDetail.setOrder(order);
        orderDetailRepository.save(orderDetail);
    }
}
