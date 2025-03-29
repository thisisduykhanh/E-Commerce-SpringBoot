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
@RequestMapping("/product-types")
public class ProductTypeController {

    @Autowired
    private ProductTypeService productTypeService;

    /**
     * API: Lấy danh sách ProductType theo ProductGroupId.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Nhận `productGroupId` từ query parameter thông qua `@RequestParam`.
     * 2. Gọi `productTypeService.getProductTypesByGroupId()` để lấy danh sách các ProductType tương ứng với `productGroupId`.
     * 3. Trả về phản hồi API:
     *    - Nếu thành công: Tạo một đối tượng `ApiResponse` với danh sách ProductType và trạng thái thành công (`success = true`).
     *    - Nếu xảy ra lỗi `EntityNotFoundException`: Tạo một đối tượng `ApiResponse` với thông báo lỗi và trạng thái thất bại (`success = false`).
     * 4. Sử dụng `ResponseEntity` để trả về phản hồi với mã trạng thái HTTP phù hợp:
     *    - 200 (OK) cho phản hồi thành công.
     *    - 404 (Not Found) nếu không tìm thấy nhóm sản phẩm với ID được cung cấp.
     *
     * @param productGroupId ID của ProductGroup, được truyền qua query parameter.
     * @return ResponseEntity<ApiResponse<List<ProductType>>>
     *         - Danh sách các loại sản phẩm (ProductType) hoặc thông báo lỗi nếu không tìm thấy.
     */
    @GetMapping()
    public ResponseEntity<ApiResponse<List<ProductType>>> getProductTypesByGroup(
            @RequestParam("productGroupId") Integer productGroupId) {
        try {
            // Gọi service để lấy danh sách ProductType
            List<ProductType> productTypes = productTypeService.getProductTypesByGroupId(productGroupId);

            // Tạo response thành công
            ApiResponse<List<ProductType>> response = new ApiResponse<>(

                    true, // Trạng thái thành công
                    "Product types retrieved successfully", // Thông báo
                    productTypes ,null// Dữ liệu trả về
            );
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException ex) {
            // Tạo response lỗi khi không tìm thấy nhóm sản phẩm
            ApiResponse<List<ProductType>> response = new ApiResponse<>(

                    false, // Trạng thái thất bại
                    ex.getMessage(), // Thông báo lỗi
                    null ,null// Không có dữ liệu
            );
            return ResponseEntity.status(404).body(response);
        }
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