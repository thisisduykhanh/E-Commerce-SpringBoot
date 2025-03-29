package com.example.e_commerce_api.repository.supply;

import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.entity.supply.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findAllByProduct(Product product);
}
