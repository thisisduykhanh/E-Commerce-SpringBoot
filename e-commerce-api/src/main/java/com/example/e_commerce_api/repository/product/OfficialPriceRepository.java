package com.example.e_commerce_api.repository.product;

import com.example.e_commerce_api.entity.product.OfficialPrice;
import com.example.e_commerce_api.entity.product.Product;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface OfficialPriceRepository extends JpaRepository<OfficialPrice, Integer>, JpaSpecificationExecutor<OfficialPrice> {
    List<OfficialPrice> findAllByProduct(Product product);
}
