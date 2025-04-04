package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.product.ProductTypeCreateDTO;
import com.example.e_commerce_api.dto.product.ProductTypeUpdateDTO;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.service.product.ProductTypeService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("${api.prefix}/product-types")
public class ProductTypeController {

    @Autowired
    private ProductTypeService productTypeService;

    @GetMapping()
    public ResponseEntity<ApiResponse<?>> getAllProductType(){
        ApiResponse<List<ProductType>> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "ProductTypes retrieved successfully", // Thông báo
                productTypeService.findAll(),null
        );
        return ResponseEntity.ok(response);
    }


    @PostMapping()
    public ResponseEntity<ApiResponse<?>> create(@RequestBody ProductTypeCreateDTO productTypeCreateDTO) {
        productTypeService.createProductType(productTypeCreateDTO);
        // Tạo ApiResponse chứa danh sách ProductGroupDTO
        ApiResponse<String> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "add product type success", // Thông báo
                "true",null
        );
        return ResponseEntity.ok(response);
    }
    @PatchMapping()
    public ResponseEntity<ApiResponse<?>> update(@RequestBody ProductTypeUpdateDTO productTypeUpdateDTO) {
        productTypeService.updateProductType(productTypeUpdateDTO);
        // Tạo ApiResponse chứa danh sách ProductGroupDTO
        ApiResponse<String> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "update product type success", // Thông báo
                "true",null
        );
        return ResponseEntity.ok(response);
    }
}