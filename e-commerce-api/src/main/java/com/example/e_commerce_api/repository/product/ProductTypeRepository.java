package com.example.e_commerce_api.repository.product;

import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.product.ProductTypeEnum;
import com.example.e_commerce_api.entity.supply.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductTypeRepository extends JpaRepository<ProductType,Integer> {

    @Query("Select Distinct p.productType from Product p Where p.supplier = :supplier")
    List<ProductType> findProductTypeBySupplier(@Param("supplier") Supplier supplier);

    Optional<ProductType> findByProductTypeName(ProductTypeEnum productTypeEnum);
}
