package com.example.e_commerce_api.entity.product;

import com.example.e_commerce_api.entity.supply.Supplier;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;


@Entity
@DiscriminatorValue("SmartWatch")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SmartWatch extends Product {
    private boolean hasGPS;
    private boolean waterResistant;
    private int batteryLife;

    public SmartWatch(String productName, BigDecimal price, String description, ProductType productType, Supplier supplier, Boolean statusVerify, Boolean statusActivity, boolean hasGPS, boolean waterResistant, int batteryLife) {
        super(null, productName, price, description, productType, supplier, statusVerify, statusActivity);
        this.hasGPS = hasGPS;
        this.waterResistant = waterResistant;
        this.batteryLife = batteryLife;
    }
}