package com.example.e_commerce_api.repository.product;

import com.example.e_commerce_api.entity.product.ProductGroup;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.supply.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductTypeRepository extends JpaRepository<ProductType,Integer> {
    List<ProductType> findAllByProductGroup(ProductGroup productGroup);

    @Query("Select Distinct p.productType from Product p Where p.supplier = :supplier")
    List<ProductType> findProductTypeBySupplier(@Param("supplier") Supplier supplier);

}
