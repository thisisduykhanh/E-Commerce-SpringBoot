package com.example.e_commerce_api.repository.supply;

import com.example.e_commerce_api.entity.supply.Delivery;
import com.example.e_commerce_api.entity.supply.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery,Integer> {
    List<Delivery> findBySupplier(Supplier supplier);
}
