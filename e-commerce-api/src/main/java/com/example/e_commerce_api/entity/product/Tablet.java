package com.example.e_commerce_api.entity.product;

import com.example.e_commerce_api.entity.supply.Supplier;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Tablet")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tablet extends Product {
    private String screenSize;
    private int batteryLife;
    private boolean hasPenSupport;

    public Tablet(String productName, BigDecimal price, Integer quantity, String description, ProductType productType, Supplier supplier, Boolean statusVerify, Boolean statusActivity, String screenSize, int batteryLife, boolean hasPenSupport) {
        super(null, productName, price, quantity, description, productType, supplier, statusVerify, statusActivity);
        this.screenSize = screenSize;
        this.batteryLife = batteryLife;
        this.hasPenSupport = hasPenSupport;
    }
}