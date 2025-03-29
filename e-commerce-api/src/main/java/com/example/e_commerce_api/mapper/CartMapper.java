package com.example.e_commerce_api.mapper;

import com.example.e_commerce_api.dto.cart.CartDTO;
import com.example.e_commerce_api.dto.cart.CartDetailDTO;
import com.example.e_commerce_api.dto.cart.CartSupplierDTO;
import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.cart.CartDetail;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapper {
    public CartDTO toDTO(Cart cart, List<CartDetail> cartDetails) {
        List<CartSupplierDTO> cartSupplierDTOS = mapCartDetailsToCartSupplierDTOs(cartDetails);

        int totalQuantity = cartSupplierDTOS.stream()
                .mapToInt(CartSupplierDTO::quantity)
                .sum();

        BigDecimal totalPrice = cartSupplierDTOS.stream()
                .map(CartSupplierDTO::totalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartDTO(
                cart.getId(),
                cart.getAccount().getUsername(),
                cartSupplierDTOS,
                totalQuantity,
                totalPrice
        );
    }

    public List<CartDetailDTO> toCartDetailDTOList(List<CartDetail> cartDetails) {
        return cartDetails.stream().map(cartDetail ->
                new CartDetailDTO(
                        cartDetail.getId(),
                        cartDetail.getProduct().getId(),

                        cartDetail.getQuantity(),
                        cartDetail.getProduct().getPrice(),
                        BigDecimal.valueOf(cartDetail.getQuantity()).multiply(cartDetail.getProduct().getPrice()),

                        cartDetail.getProduct().getProductName(),
                        cartDetail.getProduct().getSupplier().getImage(),

                        cartDetail.getProduct().getSupplier().getId()
                )
        ).collect(Collectors.toList());
    }

    public List<CartSupplierDTO> mapCartDetailsToCartSupplierDTOs(List<CartDetail> cartDetails) {
        return cartDetails.stream()
                .collect(Collectors.groupingBy(
                        cartDetail -> cartDetail.getProduct().getSupplier(),
                        Collectors.mapping(cartDetail -> mapCartDetailToCartDetailDTO(cartDetail), Collectors.toList())
                ))
                .entrySet().stream()
                .map(entry -> {
                    return new CartSupplierDTO(
                            entry.getKey().getId(),
                            entry.getKey().getNameSupply(),
                            entry.getKey().getImage(),
                            entry.getValue(),

                            // Calculate total quantity and price for the supplier
                            entry.getValue().stream().mapToInt(CartDetailDTO::quantity).sum(),
                            entry.getValue().stream()
                                    .map(cartDetailDTO -> cartDetailDTO.unitPrice().multiply(BigDecimal.valueOf(cartDetailDTO.quantity())))
                                    .reduce(BigDecimal.ZERO, BigDecimal::add)

                    );


                })
                .collect(Collectors.toList());
    }

    private CartDetailDTO mapCartDetailToCartDetailDTO(CartDetail cartDetail) {

        return new CartDetailDTO(
                cartDetail.getId(),
                cartDetail.getProduct().getId(),
                cartDetail.getQuantity(),
                cartDetail.getProduct().getPrice(),
                BigDecimal.valueOf(cartDetail.getQuantity()).multiply(cartDetail.getProduct().getPrice()),
                cartDetail.getProduct().getProductName(),
                cartDetail.getProduct().getSupplier().getImage(),
                cartDetail.getProduct().getSupplier().getId()
        );
    }
}
