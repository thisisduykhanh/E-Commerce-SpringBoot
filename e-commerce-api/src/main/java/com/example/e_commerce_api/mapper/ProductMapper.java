package com.example.e_commerce_api.mapper;

import com.example.e_commerce_api.dto.product.ProductDTO;
import com.example.e_commerce_api.dto.product.ProductTypeDTO;
import com.example.e_commerce_api.dto.supply.ImageDTO;
import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.supply.Image;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    // Mapping Product to ProductDTO

    /**
     * Chuyển đổi `Product` (entity) sang `ProductDTO`.
     * <p>
     * Phương thức này thực hiện các bước sau:
     * 1. Tạo một đối tượng `ProductDTO`.
     * 2. Gán các thuộc tính cơ bản từ `Product` sang `ProductDTO`:
     * - `id`, `nameProduct`, `price`, `description`.
     * 3. Kiểm tra `ProductType` và `Supplier` của sản phẩm:
     * - Nếu tồn tại, thêm tên loại sản phẩm (`ProductType`) và nhà cung cấp (`Supplier`) vào DTO.
     * 4. Sử dụng `toImageDTO` để chuyển đổi danh sách `Image` sang danh sách `ImageDTO`.
     * 5. Sử dụng `toDTOList` để chuyển đổi danh sách `OfficialPrice` sang danh sách `OfficialPriceDTO`.
     * 6. Gán danh sách hình ảnh và giá chính thức vào `ProductDTO`.
     * 7. Trả về `ProductDTO` kết quả.
     *
     * @param product        Thực thể sản phẩm (`Product`).
     * @param images         Danh sách hình ảnh liên quan đến sản phẩm.
     * @return `ProductDTO` chứa thông tin của sản phẩm.
     */
    public ProductDTO toProductDTO(Product product, List<Image> images) {

        String nameProductType = product.getProductType() != null ? product.getProductType().getProductTypeName().name() : null;
        String nameSupplier = product.getSupplier() != null ? product.getSupplier().getNameSupply() : null;


        // Chuyển đổi danh sách Image sang ImageDTO
        List<ImageDTO> imageDTOS = images.stream()
                .map(this::toImageDTO)
                .collect(Collectors.toList());




        ProductDTO dto = new ProductDTO(
                product.getId(),
                product.getProductName(),
                product.getPrice(),
                product.getDescription(),
                nameProductType,
                nameSupplier,
                imageDTOS,
                product.getQuantity()
        );

        return dto;
    }

    // Mapping ProductDTO to Product

    /**
     * Chuyển đổi `Image` (entity) sang `ImageDTO`.
     * <p>
     * Phương thức này:
     * 1. Kiểm tra `Image` có null hay không.
     * 2. Nếu không null, tạo một đối tượng `ImageDTO` và gán `url` từ `Image` sang `ImageDTO`.
     * 3. Trả về `ImageDTO`.
     *
     * @param image Thực thể hình ảnh (`Image`).
     * @return `ImageDTO` chứa thông tin của hình ảnh.
     */
    public ImageDTO toImageDTO(Image image) {
        if (image == null) {
            return null;
        }

        ImageDTO dto = new ImageDTO(
                image.getId(),
                image.getUrl()
        );

        return dto;
    }




    /**
     * Chuyển đổi danh sách `ProductType` (entity) sang danh sách `ProductTypeDTO`.
     *
     * @param productTypes Danh sách loại sản phẩm (`ProductType`).
     * @return Danh sách `ProductTypeDTO`.
     */
    public List<ProductTypeDTO> toDTOProductTypeList(List<ProductType> productTypes) {
        return productTypes.stream().map(productType -> {
            ProductTypeDTO dto = new ProductTypeDTO(
                    productType.getId(),
                    productType.getProductTypeName().name()
            );
           
            return dto;
        }).collect(Collectors.toList());
    }

}