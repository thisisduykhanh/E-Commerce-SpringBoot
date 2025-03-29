package com.example.e_commerce_api.pattern.factory;

import com.example.e_commerce_api.dto.product.ProductUpdateDTO;
import com.example.e_commerce_api.entity.product.*;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.repository.product.ProductTypeRepository;
import com.example.e_commerce_api.repository.supply.SupplierRepository;

import java.math.BigDecimal;

public class ProductFactory {
    public Product createProduct(String name, BigDecimal price, String description, ProductType productType, Supplier supplier, String... attributes) {

        if (productType == null) {
            throw new IllegalArgumentException("Product type is required");
        }

        if (supplier == null) {
            throw new IllegalArgumentException("Supplier is required");
        }

        return switch (productType.getProductTypeName().name().toLowerCase()) {
            case "laptop" -> new Laptop(name, price, description, productType, supplier, true, true, attributes[0], Integer.parseInt(attributes[1]), Integer.parseInt(attributes[2]));
//                return new Laptop(null, name, price, description, productType, supplier, true, true, attributes[0], Integer.parseInt(attributes[1]), Integer.parseInt(attributes[2]));

            case "phone" -> new Phone(name, price, description, productType, supplier, true, true, Integer.parseInt(attributes[0]), Integer.parseInt(attributes[1]), attributes[2]);
            case "tablet" -> new Tablet(name, price, description, productType, supplier, true, true, attributes[0], Integer.parseInt(attributes[1]), Boolean.parseBoolean(attributes[2]));
            case "smartwatch" -> new SmartWatch(name, price, description, productType, supplier, true, true, Boolean.parseBoolean(attributes[0]), Boolean.parseBoolean(attributes[1]), Integer.parseInt(attributes[2]));
            case "headphone" -> new Headphone(name, price, description, productType, supplier, true, true, Boolean.parseBoolean(attributes[0]), Integer.parseInt(attributes[1]), attributes[2]);
            default -> throw new IllegalArgumentException("Invalid product type: " + productType.getProductTypeName().name());
        };
    }


    public static Product updateProduct(Product existingProduct, ProductUpdateDTO productUpdateDTO,
                                        ProductTypeRepository productTypeRepository,
                                        SupplierRepository supplierRepository) {
        // Cập nhật từng thuộc tính nếu không null
        if (productUpdateDTO.productName() != null) {
            existingProduct.setProductName(productUpdateDTO.productName());
        }
        if (productUpdateDTO.price() != null) {
            existingProduct.setPrice(productUpdateDTO.price());
        }
        if (productUpdateDTO.description() != null) {
            existingProduct.setDescription(productUpdateDTO.description());
        }
        if (productUpdateDTO.statusVerified() != null) {
            existingProduct.setStatusVerify(productUpdateDTO.statusVerified());
        }
        if (productUpdateDTO.statusActive() != null) {
            existingProduct.setStatusActivity(productUpdateDTO.statusActive());
        }
        if (productUpdateDTO.productTypeId() != null) {
            ProductType productType = productTypeRepository.findById(productUpdateDTO.productTypeId())
                    .orElseThrow(() -> new CustomException(Error.PRODUCT_TYPE_NOT_FOUND));
            existingProduct.setProductType(productType);
        }
        if (productUpdateDTO.supplierId() != null) {
            Supplier supplier = supplierRepository.findById(productUpdateDTO.supplierId())
                    .orElseThrow(() -> new CustomException(Error.SUPPLIER_NOT_FOUND));
            existingProduct.setSupplier(supplier);
        }


        if (existingProduct instanceof Laptop laptop) {
            if (productUpdateDTO.cpu() != null) {
                laptop.setCpu(productUpdateDTO.cpu());
            }

            if (productUpdateDTO.ram() != null) {
                laptop.setRam(productUpdateDTO.ram());
            }

            if (productUpdateDTO.storage() != null) {
                laptop.setStorage(productUpdateDTO.storage());
            }
        }


        else if (existingProduct instanceof Phone phone) {
            if (productUpdateDTO.ram() != null) {
                phone.setBatteryLife(productUpdateDTO.ram());
            }

            if (productUpdateDTO.storage() != null) {
                phone.setScreenSize(productUpdateDTO.screenSize());
            }

            if (productUpdateDTO.cameraMP() != null) {
                phone.setCameraMP(productUpdateDTO.cameraMP());
            }
        }


        else if (existingProduct instanceof Tablet tablet) {
            if (productUpdateDTO.screenSize() != null) {
                tablet.setScreenSize(productUpdateDTO.screenSize());
            }

            if (productUpdateDTO.storage() != null) {
                tablet.setBatteryLife(productUpdateDTO.storage());
            }

            if (productUpdateDTO.hasPenSupport() != null) {
                tablet.setHasPenSupport(productUpdateDTO.hasPenSupport());
            }
        }


        else if (existingProduct instanceof SmartWatch smartWatch) {
            if (productUpdateDTO.hasGPS() != null) {
                smartWatch.setHasGPS(productUpdateDTO.hasGPS());
            }

            if (productUpdateDTO.waterResistant() != null) {
                smartWatch.setWaterResistant(productUpdateDTO.waterResistant());
            }

            if (productUpdateDTO.batteryLife() != null) {
                smartWatch.setBatteryLife(productUpdateDTO.batteryLife());
            }
        }


        else if (existingProduct instanceof Headphone headphone) {
            if (productUpdateDTO.noiseCanceling() != null) {
                headphone.setNoiseCancellation(productUpdateDTO.noiseCanceling());
            }

            if (productUpdateDTO.batteryLife() != null) {
                headphone.setBatteryLife(productUpdateDTO.batteryLife());
            }

            if (productUpdateDTO.wireless() != null) {
                headphone.setWireless(productUpdateDTO.wireless());
            }
        }


        return existingProduct;
    }
}