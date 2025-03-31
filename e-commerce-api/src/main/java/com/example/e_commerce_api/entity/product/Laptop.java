package com.example.e_commerce_api.entity.product;

import com.example.e_commerce_api.entity.supply.Supplier;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;


@Entity
@DiscriminatorValue("Laptop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Laptop extends Product {
    private  String cpu;
    private  int ram;
    private  int storage;

    public Laptop(String productName, BigDecimal price, Integer quantity, String description, ProductType productType, Supplier supplier,
                  Boolean statusVerify, Boolean statusActivity, String cpu, int ram, int storage) {
        super(null, productName, price,quantity, description, productType, supplier,statusVerify, statusActivity);
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
    }
}
