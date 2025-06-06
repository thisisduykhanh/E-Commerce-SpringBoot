package com.example.e_commerce_api.service.product;

import com.example.e_commerce_api.entity.product.ProductTypeEnum;

import com.example.e_commerce_api.dto.product.ProductTypeCreateDTO;
import com.example.e_commerce_api.dto.product.ProductTypeUpdateDTO;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.repository.product.ProductTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeService {

    @Autowired
    private ProductTypeRepository productTypeRepository;


    /**
     * Tìm kiếm loại sản phẩm (`ProductType`) theo ID.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `productTypeRepository.findById(id)` để tìm kiếm loại sản phẩm trong cơ sở dữ liệu bằng ID.
     *    - Kết quả trả về là một `Optional<ProductType>`.
     * 2. Sử dụng `orElseThrow()` để:
     *    - Trả về loại sản phẩm nếu tìm thấy.
     *    - Ném ngoại lệ `EntityNotFoundException` với thông báo cụ thể nếu không tìm thấy loại sản phẩm.
     *
     * @param id ID của loại sản phẩm cần tìm.
     * @return `ProductType` Đối tượng loại sản phẩm tìm thấy.
     * @throws EntityNotFoundException nếu không tìm thấy loại sản phẩm với ID đã cho.
     */
    public ProductType findById(Integer id) {
        return productTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id " + id));
    }


    public List<ProductType> findAll(){
        return productTypeRepository.findAll();
    }


    /**
     * Tìm danh sách các loại sản phẩm (`ProductType`) liên quan đến nhà cung cấp (`Supplier`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra đầu vào:
     *    - Nếu tham số `supplier` là null, ném ngoại lệ `IllegalArgumentException` với thông báo cụ thể.
     * 2. Gọi `productTypeRepository.findBySupplier(supplier)` để truy vấn danh sách `ProductType` từ cơ sở dữ liệu.
     *    - Truy vấn dựa trên nhà cung cấp (`Supplier`) được cung cấp.
     * 3. Trả về danh sách `ProductType`.
     *
     * @param supplier Nhà cung cấp (`Supplier`) cần tìm danh sách loại sản phẩm.
     * @return `List<ProductType>` Danh sách các loại sản phẩm liên quan đến nhà cung cấp.
     * @throws IllegalArgumentException nếu tham số `supplier` là null.
     */
    public List<ProductType> findBySupplier(Supplier supplier) {
        if (supplier == null) {
            throw new IllegalArgumentException("Supplier cannot be null");
        }
        return productTypeRepository.findProductTypeBySupplier(supplier);
    }

    public ProductType createProductType(ProductTypeCreateDTO productTypeDTO) {
        Optional<ProductType> existingProductType = productTypeRepository.findByProductTypeName(ProductTypeEnum.valueOf(productTypeDTO.productTypeName()));

        if (existingProductType.isPresent()) {
            throw new CustomException(Error.CATEGORY_ALREADY_EXISTS);
        }

        ProductType productType = new ProductType();
        productType.setProductTypeName(ProductTypeEnum.valueOf(productTypeDTO.productTypeName()));

        return productTypeRepository.save(productType);
    }

    // Update ProductType
    public ProductType updateProductType(ProductTypeUpdateDTO productTypeUpdateDTO) {
        ProductType productType = productTypeRepository.findById(productTypeUpdateDTO.id())
                .orElseThrow(() -> new CustomException(Error.PRODUCT_TYPE_NOT_FOUND));


        productType.setProductTypeName(ProductTypeEnum.valueOf(productTypeUpdateDTO.productTypeName()));


        return productTypeRepository.save(productType);
    }

    // Delete ProductType
    public void deleteProductType(Integer id) {
        ProductType productType = productTypeRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));
        productTypeRepository.delete(productType);
    }
//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }
}
