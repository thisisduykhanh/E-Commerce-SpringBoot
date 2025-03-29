package com.example.e_commerce_api.entity.product;


import com.example.e_commerce_api.entity.supply.Supplier;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Phone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Phone extends Product {
    private int batteryLife;
    private int cameraMP;
    private String screenSize;

    public Phone(String productName, BigDecimal price, String description, ProductType productType, Supplier supplier, Boolean statusVerify, Boolean statusActivity, int batteryLife, int cameraMP, String screenSize) {
        super(null,productName, price, description, productType, supplier, statusVerify, statusActivity);
        this.batteryLife = batteryLife;
        this.cameraMP = cameraMP;
        this.screenSize = screenSize;
    }
}
