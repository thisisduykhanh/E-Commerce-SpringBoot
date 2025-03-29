package com.example.e_commerce_api.mapper;

import com.example.e_commerce_api.dto.supply.SupplierDTO;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.supply.Delivery;
import com.example.e_commerce_api.entity.supply.Supplier;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class SupplierMapper {
    // Chuyển đổi từ Entity -> DTO
    /**
     * Chuyển đổi `Supplier` (entity) cùng danh sách `Delivery` và `ProductType` sang `SupplierDTO`.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `supplier`:
     *    - Nếu null, trả về null (không tiếp tục xử lý).
     * 2. Tạo đối tượng `SupplierDTO`.
     * 3. Gán các thuộc tính cơ bản từ `Supplier` sang `SupplierDTO`:
     *    - `id`, `nameSupply`, `status`, `address`, `image`.
     * 4. Thiết lập danh sách `nameDelivery`:
     *    - Nếu `deliveries` không null, sử dụng Stream API để lấy `infor` từ từng đối tượng `Delivery` và gán vào danh sách `nameDelivery`.
     * 5. Thiết lập danh sách `nameProductType`:
     *    - Nếu `productTypes` không null, sử dụng Stream API để lấy `productTypeName` từ từng đối tượng `ProductType` và gán vào danh sách `nameProductType`.
     * 6. Trả về đối tượng `SupplierDTO` đã thiết lập đầy đủ thông tin.
     *
     * @param supplier Đối tượng nhà cung cấp (`Supplier`).
     * @param deliveries Danh sách các giao hàng liên quan đến nhà cung cấp (`Delivery`).
     * @param productTypes Danh sách các loại sản phẩm mà nhà cung cấp cung cấp (`ProductType`).
     * @return `SupplierDTO` chứa thông tin của nhà cung cấp, giao hàng và loại sản phẩm.
     */
    public SupplierDTO toDTO(Supplier supplier, List<Delivery> deliveries, List<ProductType> productTypes) {
        if (supplier == null) {
            return null;
        }

        return new SupplierDTO(
                supplier.getId(),
                supplier.getNameSupply(),
                supplier.getStatusVerify(),
                supplier.getAddress(),
                supplier.getImage(),
                deliveries != null ? deliveries.stream().map(Delivery::getInfo).collect(Collectors.toList()) : Collections.emptyList(),
                productTypes != null ? productTypes.stream()
                        .map(ProductType::getProductTypeName)
                        .collect(Collectors.toList()) : Collections.emptyList()
        );
    }



}