package com.example.e_commerce_api.entity.product;

public enum ProductTypeEnum {
    LAPTOP, PHONE, TABLET, HEADPHONE,SMARTWATCH;

    public static boolean isValidType(String type) {
        for (ProductTypeEnum t : values()) {
            if (t.name().equalsIgnoreCase(type)) {
                return true;
            }
        }
        return false;
    }
}
