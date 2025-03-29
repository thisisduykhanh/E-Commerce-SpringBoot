package com.example.e_commerce_api.entity.product;

import com.example.e_commerce_api.entity.supply.Supplier;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Headphone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Headphone extends Product {
    private boolean isWireless;
    private int batteryLife;
    private String noiseCancellation;

    public Headphone(String productName, BigDecimal price, String description, ProductType productType, Supplier supplier, boolean statusActivity, boolean statusVerify, boolean isWireless, int batteryLife, String noiseCancellation) {
        super(null, productName, price, description, productType, supplier, statusActivity, statusVerify);
        this.isWireless = isWireless;
        this.batteryLife = batteryLife;
        this.noiseCancellation = noiseCancellation;
    }
}