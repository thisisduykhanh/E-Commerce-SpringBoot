package com.example.e_commerce_api.mapper;

import com.example.e_commerce_api.dto.cart.CartDTO;
import com.example.e_commerce_api.dto.cart.CartDetailDTO;
import com.example.e_commerce_api.dto.cart.CartSupplierDTO;
import com.example.e_commerce_api.entity.cart.Cart;
import com.example.e_commerce_api.entity.cart.CartDetail;
import com.example.e_commerce_api.entity.supply.Image;
import com.example.e_commerce_api.service.supply.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.e_commerce_api.entity.product.Product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Component
public class CartMapper {

    @Autowired
    private ImageService imageService;


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
        return cartDetails.stream().map(cartDetail -> {
            Product product = cartDetail.getProduct();
            List<Image> images = imageService.getImageByProduct(product);
            String imageUrl = null;

            if (images != null && !images.isEmpty() && images.getFirst() != null) {
                imageUrl = images.getFirst().getUrl();
            }

            System.out.println("Image URL: " + imageUrl);

            return new CartDetailDTO(
                    cartDetail.getId(),
                    product.getId(),
                    cartDetail.getQuantity(),
                    product.getPrice(),
                    BigDecimal.valueOf(cartDetail.getQuantity()).multiply(product.getPrice()),
                    product.getProductName(),
                    imageUrl,
                    product.getSupplier() != null ? product.getSupplier().getId() : null
            );
        }).collect(Collectors.toList());
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

        Product product = cartDetail.getProduct();
        List<Image> images = imageService.getImageByProduct(product);
        String imageUrl = null;

        if (images != null && !images.isEmpty() && images.getFirst() != null) {
            imageUrl = images.getFirst().getUrl();
        }



        return new CartDetailDTO(
                cartDetail.getId(),
                cartDetail.getProduct().getId(),
                cartDetail.getQuantity(),
                cartDetail.getProduct().getPrice(),
                BigDecimal.valueOf(cartDetail.getQuantity()).multiply(cartDetail.getProduct().getPrice()),
                cartDetail.getProduct().getProductName(),
                imageUrl,
                cartDetail.getProduct().getSupplier().getId()
        );
    }
}
