package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.supply.SupplierCreateDTO;
import com.example.e_commerce_api.dto.supply.SupplierDTO;
import com.example.e_commerce_api.dto.supply.SupplierUpdateDTO;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.supply.Delivery;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.mapper.SupplierMapper;
import com.example.e_commerce_api.service.product.ProductTypeService;
import com.example.e_commerce_api.service.supply.DeliveryService;
import com.example.e_commerce_api.service.supply.SupplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier")
public class SupplierController {
    @Autowired
    private SupplyService supplyService;
    @Autowired
    private SupplierMapper supplierMapper;
    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private ProductTypeService productTypeService;

    @PostMapping()
    public ResponseEntity<ApiResponse<?>> create(@ModelAttribute SupplierCreateDTO supplierCreateDTO) {
        supplyService.createSupplier(supplierCreateDTO);
        ApiResponse<String> response = new ApiResponse<>(true, "Thêm nhà cung cấp thành công thành công", supplierCreateDTO.toString(), null);
        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<?>> get(@RequestParam Integer id) {
        Supplier supplier = supplyService.findById(id);
        List<Delivery> deliveries = deliveryService.findBySupplier(supplier);
        List<ProductType> productTypes = productTypeService.findBySupplier(supplier);
        SupplierDTO supplierDTO = supplierMapper.toDTO(supplier, deliveries, productTypes);
        ApiResponse<SupplierDTO> response = new ApiResponse<>(true, "lay nha cung cap thanh cong", supplierDTO, null);
        return ResponseEntity.ok(response);
    }

    @PatchMapping()
    public ResponseEntity<ApiResponse<?>> update(@ModelAttribute SupplierUpdateDTO supplierUpdateDTO) {
        supplyService.updateSupplier(supplierUpdateDTO);
        ApiResponse<String> response = new ApiResponse<>(true, "cập nhật nha cung cấp thành công thành công", "true", null);
        return ResponseEntity.ok(response);
    }
}
