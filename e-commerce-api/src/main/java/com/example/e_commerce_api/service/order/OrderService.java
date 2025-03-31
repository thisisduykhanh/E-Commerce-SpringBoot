package com.example.e_commerce_api.service.order;



import com.example.e_commerce_api.dto.OrderDTO;
import com.example.e_commerce_api.dto.cart.OrderCreateDTO;
import com.example.e_commerce_api.dto.payment.PaymentRequest;
import com.example.e_commerce_api.dto.payment.PaymentResponse;
import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.entity.order.OrderStatus;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.pattern.strategy.PaymentContext;
import com.example.e_commerce_api.pattern.strategy.PaymentStrategy;
import com.example.e_commerce_api.repository.cart.CartDetailRepository;
import com.example.e_commerce_api.repository.order.OrderRepository;
import com.example.e_commerce_api.repository.order.OrderStatusRepository;
import com.example.e_commerce_api.service.UserService;
import com.example.e_commerce_api.service.supply.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.SQLOutput;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class OrderService {
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private  OrderDetailService orderDetailService;

    @Autowired
    private UserService userService;

    @Autowired
    private SupplyService supplyService;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private PaymentContext paymentContext;

    @Transactional
    public PaymentResponse processPayment(Integer orderId, String method) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new CustomException(Error.ORDERS_NOT_FOUND));

        if (!order.getOrderStatus().getName().equals("PENDING")) {
            throw new CustomException(Error.INVALID_ORDER_STATUS);
        }

        PaymentStrategy strategy = paymentContext.getPaymentStrategy(method);
        if (strategy == null) {
            throw new CustomException(Error.PAYMENT_METHOD_NOT_FOUND);
        }

        PaymentResponse response = strategy.processPayment(order);
        orderRepository.save(order);
        return response;
    }


    @Transactional
    public List<OrderDTO> createOrdersFromCartDetails(OrderCreateDTO orderCreateDto){

        List<CartDetail> cartDetails = orderCreateDto.cartDetailIds().stream()
                .map(integer -> cartDetailRepository.findById(integer)
                        .orElseThrow(() -> new CustomException(Error.CARTDETAIL_NOT_FOUND)))
                .toList();


        Map<Supplier, List<CartDetail>> cartDetailsBySupplier = cartDetails.stream()
                .collect(Collectors.groupingBy(
                        cartDetail -> cartDetail.getProduct().getSupplier()));


        List<Order> orders = cartDetailsBySupplier.entrySet().stream()
                .map(entry ->{
                    Supplier supplier = entry.getKey();
                    List<CartDetail> details = entry.getValue();
                    Order order = new Order();
                    OrderStatus orderStatus=orderStatusRepository.findById(1).orElseThrow();
                    order.setOrderStatus(orderStatus);
                    order.setAddress(orderCreateDto.address());
                    order.setFullname(orderCreateDto.fullName());
                    order.setPhone(orderCreateDto.phone());
                    order.setSupplier(supplier);
                    order.setUser(userService.findUserByAccount(getCurrentUser()));
                    int totalQuantity = details.stream().mapToInt(CartDetail::getQuantity).sum();
                    BigDecimal totalPrice = details.stream()
                            .map(cd -> BigDecimal.valueOf(cd.getQuantity()).multiply(cd.getProduct().getPrice()))
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    order.setQuantity(totalQuantity);
                    order.setTotalPrice(totalPrice);
                    order.setCreateDate(LocalDateTime.now());
                    Order savedOrder = orderRepository.save(order);
                    details.forEach(cartDetail -> {
                        orderDetailService.createOrderDetail(cartDetail,savedOrder);
                    });
                    return savedOrder;
                }).collect(Collectors.toList());

        cartDetailRepository.deleteAllById(orderCreateDto.cartDetailIds());
        return orders.stream().map(OrderDTO::fromEntity).toList();

    }
    public  void updateStatus(Integer idOrder,Integer idStatus){
        Order orders=orderRepository.findById(idOrder)
                .orElseThrow(()->new CustomException(Error.ORDERS_NOT_FOUND));
        OrderStatus orderStatus=orderStatusRepository.findById(idStatus).orElseThrow();
        orders.setOrderStatus(orderStatus);
        orderRepository.save(orders);

    }

    public Page<Order> getOrdersBySupplierAndStatus( Integer orderStatusId, Pageable pageable) {
        OrderStatus orderStatus=orderStatusRepository.findById(orderStatusId).orElseThrow();
        Supplier supplier = supplyService.getCurrentSupplier();
        return orderRepository.findBySupplierAndOrderStatusOrderByCreateDateDesc(supplier, orderStatus, pageable);
    }
    public Page<Order> getOrdersByUser(Pageable pageable) {
        User user=userService.findUserByAccount(getCurrentUser());
        return orderRepository.findByUserOrderByCreateDateDesc(user, pageable);
    }
    private Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return account;
    }
}
