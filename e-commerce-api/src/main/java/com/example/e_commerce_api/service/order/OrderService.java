package com.example.e_commerce_api.service.order;



import com.example.e_commerce_api.dto.OrderDTO;
import com.example.e_commerce_api.dto.cart.OrderCreateDTO;
import com.example.e_commerce_api.dto.payment.PaymentResponse;
import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.entity.order.Order;
import com.example.e_commerce_api.entity.order.OrderDetail;
import com.example.e_commerce_api.entity.order.OrderStatus;
import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.pattern.strategy.PaymentContext;
import com.example.e_commerce_api.pattern.strategy.PaymentStrategy;
import com.example.e_commerce_api.repository.cart.CartDetailRepository;
import com.example.e_commerce_api.repository.order.OrderDetailRepository;
import com.example.e_commerce_api.repository.order.OrderRepository;
import com.example.e_commerce_api.repository.order.OrderStatusRepository;
import com.example.e_commerce_api.repository.product.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;


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

        // ✅ Kiểm tra số lượng tồn kho cho từng sản phẩm
        for (CartDetail cartDetail : cartDetails) {
            int orderedQuantity = cartDetail.getQuantity();
            int availableQuantity = cartDetail.getProduct().getQuantity();

            if (orderedQuantity > availableQuantity) {
                throw new CustomException(
                        Error.PRODUCT_OUT_OF_STOCK
                );
            }
        }


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
                        Product product = cartDetail.getProduct();

                        // Trừ số lượng tồn kho
                        int remaining = product.getQuantity() - cartDetail.getQuantity();
                        product.setQuantity(remaining);

                        // Lưu sản phẩm đã cập nhật số lượng
                        productRepository.save(product);

                        // Tạo OrderDetail
                        orderDetailService.createOrderDetail(cartDetail, savedOrder);
                    });
                    return savedOrder;
                }).collect(Collectors.toList());

        cartDetailRepository.deleteAllById(orderCreateDto.cartDetailIds());
        return orders.stream().map(OrderDTO::fromEntity).toList();

    }
    public void updateStatus(Integer idOrder,Integer idStatus){

        Order orders=orderRepository.findById(idOrder)
                .orElseThrow(()->new CustomException(Error.ORDERS_NOT_FOUND));
        OrderStatus orderStatus=orderStatusRepository.findById(idStatus).orElseThrow();

        if(orders.getOrderStatus().getName().equalsIgnoreCase("CANCELLED")){
            throw new CustomException(Error.ORDER_STATUS_ERRO_CANNCELED);
        }

        if(orders.getOrderStatus().getName().equalsIgnoreCase("PAID")){
            throw new CustomException(Error.ORDER_STATUS_ERRO_UPDATE);
        }


        if ("CANCELLED".equalsIgnoreCase(orderStatus.getName())) {
            List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(orders);

            for (OrderDetail detail : orderDetails) {
                Product product = detail.getProduct();
                int restoredQuantity = product.getQuantity() + detail.getQuantity();
                product.setQuantity(restoredQuantity);
                productRepository.save(product);
            }
        }

        orders.setOrderStatus(orderStatus);
        orderRepository.save(orders);

    }

    public Page<Order> getOrdersByStatus( Integer orderStatusId, Pageable pageable) {
        OrderStatus orderStatus=orderStatusRepository.findById(orderStatusId).orElseThrow();
        return orderRepository.findByOrderStatus(orderStatus, pageable);
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

    public Order getOrderById(Integer orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new CustomException(Error.ORDERS_NOT_FOUND));
    }
}
