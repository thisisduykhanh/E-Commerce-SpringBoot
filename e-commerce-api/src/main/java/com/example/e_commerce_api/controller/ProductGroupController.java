package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.product.ProductGroupCreateDTO;
import com.example.e_commerce_api.dto.product.ProductGroupDTO;
import com.example.e_commerce_api.dto.product.ProductGroupUpdateDTO;
import com.example.e_commerce_api.entity.product.ProductGroup;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.mapper.ProductMapper;
import com.example.e_commerce_api.service.product.ProductGroupService;
import com.example.e_commerce_api.service.product.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/v1/product-group")
public class ProductGroupController {
    @Autowired
    private ProductTypeService productTypeService;
    @Autowired
    private ProductGroupService productGroupService;
    @Autowired
    private ProductMapper productMapper;

    /**
     * API Endpoint: Lấy danh sách tất cả các nhóm sản phẩm (ProductGroup) dưới dạng DTO.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `productGroupService.findAll()` để lấy danh sách tất cả các nhóm sản phẩm từ cơ sở dữ liệu.
     * 2. Với mỗi `ProductGroup` trong danh sách:
     *    - Gọi `productTypeService.getProductTypesByGroupId()` để lấy danh sách các loại sản phẩm (ProductType) thuộc nhóm sản phẩm đó.
     *    - Chuyển đổi từ `ProductGroup` và danh sách `ProductType` tương ứng sang `ProductGroupDTO` bằng `productMapper.toDTOProductGroup`.
     * 3. Tạo một danh sách `ProductGroupDTO` từ danh sách `ProductGroup`.
     * 4. Đóng gói danh sách `ProductGroupDTO` trong một đối tượng `ApiResponse` với trạng thái thành công và thông báo.
     * 5. Trả về `ResponseEntity` với dữ liệu `ApiResponse`.
     *
     * @return ResponseEntity<ApiResponse<List<ProductGroupDTO>>>
     *         - Danh sách các nhóm sản phẩm (kèm thông tin các loại sản phẩm) dưới dạng DTO.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductGroupDTO>>> getAllProductGroups() {
        // Lấy danh sách ProductGroup từ Service
        List<ProductGroup> productGroups = productGroupService.findAll();

        // Chuyển đổi từ Entity sang DTO
        List<ProductGroupDTO> productGroupDTOs = productGroups.stream()
                .map(productGroup -> {
                    // Lấy danh sách ProductType tương ứng với mỗi ProductGroup
                    List<ProductType> productTypes = productTypeService.getProductTypesByGroupId(productGroup.getId());

                    // Chuyển đổi ProductGroup và danh sách ProductType thành ProductGroupDTO
                    return productMapper.toDTOProductGroup(productGroup, productTypes);
                })
                .collect(Collectors.toList());

        // Tạo ApiResponse chứa danh sách ProductGroupDTO
        ApiResponse<List<ProductGroupDTO>> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "Fetched all product groups successfully", // Thông báo
                productGroupDTOs,null // Dữ liệu là danh sách ProductGroupDTO
        );

        // Trả về phản hồi API với trạng thái HTTP 200 (OK)
        return ResponseEntity.ok(response);
    }
    @GetMapping("/detail")
    public ResponseEntity<ApiResponse<ProductGroupDTO>> getDetail( @RequestParam("productGroupId") Integer productGroupId) {
        ProductGroup productGroup=productGroupService.findProductGroupById(productGroupId);
        List<ProductType> productTypes = productTypeService.getProductTypesByGroupId(productGroup.getId());
        ProductGroupDTO productGroupDTO=productMapper.toDTOProductGroup(productGroup,productTypes);


        // Tạo ApiResponse chứa danh sách ProductGroupDTO
        ApiResponse<ProductGroupDTO> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "Fetched detail product groups successfully", // Thông báo
                productGroupDTO ,null// Dữ liệu là danh sách ProductGroupDTO
        );

        // Trả về phản hồi API với trạng thái HTTP 200 (OK)
        return ResponseEntity.ok(response);
    }
    @PostMapping()
    public ResponseEntity<ApiResponse<?>> create(@RequestBody ProductGroupCreateDTO productGroupCreateDTO) {
        productGroupService.createProductGroup(productGroupCreateDTO);
        // Tạo ApiResponse chứa danh sách ProductGroupDTO
        ApiResponse<String> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "them danh muc san pham thanh cong", // Thông báo
                "true",null
        );
        return ResponseEntity.ok(response);
    }
    @PatchMapping()
    public ResponseEntity<ApiResponse<?>> update(@RequestBody ProductGroupUpdateDTO productUpdateCreateDTO) {
        productGroupService.updateProductGroup(productUpdateCreateDTO);
        // Tạo ApiResponse chứa danh sách ProductGroupDTO
        ApiResponse<String> response = new ApiResponse<>(

                true, // Trạng thái thành công
                "cập nhật danh muc san pham thanh cong", // Thông báo
                "true",null
        );
        return ResponseEntity.ok(response);
    }
}