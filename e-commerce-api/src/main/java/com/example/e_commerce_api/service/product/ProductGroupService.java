package com.example.e_commerce_api.service.product;


import com.example.e_commerce_api.dto.product.ProductGroupCreateDTO;
import com.example.e_commerce_api.dto.product.ProductGroupUpdateDTO;
import com.example.e_commerce_api.entity.product.ProductGroup;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.repository.product.ProductGroupRepository;
import com.example.e_commerce_api.service.supply.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductGroupService {
    @Autowired
    private ProductGroupRepository productGroupRepository;
    @Autowired
    private ImageService imageService;

    /**
     * Lấy danh sách tất cả các nhóm sản phẩm (`ProductGroup`) từ cơ sở dữ liệu.
     * <p>
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `productGroupRepository.findAll()` để truy vấn tất cả các nhóm sản phẩm (`ProductGroup`) từ cơ sở dữ liệu.
     * - Truy vấn không có điều kiện, trả về toàn bộ dữ liệu trong bảng `ProductGroup`.
     * 2. Trả về danh sách các `ProductGroup` từ repository.
     * <p>
     * **Lưu ý:**
     * - Phương thức không thực hiện kiểm tra hoặc xử lý logic bổ sung, chỉ gọi repository để lấy dữ liệu.
     * - Repository (`productGroupRepository`) phải được định nghĩa và cung cấp phương thức `findAll()` phù hợp.
     *
     * @return Danh sách tất cả các nhóm sản phẩm (`ProductGroup`) trong cơ sở dữ liệu.
     */
    public List<ProductGroup> findAll() {
        return productGroupRepository.findAll();
    }

    public ProductGroup createProductGroup(ProductGroupCreateDTO productGroupDTO) {
        ProductGroup productGroup = new ProductGroup();
//        productGroup.setId(getGenerationId());
        productGroup.setName(productGroupDTO.name());
        productGroup.setUrl(imageService.saveImage(productGroupDTO.image()));

        return productGroupRepository.save(productGroup);
    }

    // Update ProductGroup
    public ProductGroup updateProductGroup(ProductGroupUpdateDTO productGroupUpdateDTO) {
        ProductGroup productGroup = productGroupRepository.findById(productGroupUpdateDTO.id())
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));
        if (productGroupUpdateDTO.image() != null) {
            productGroup.setUrl(imageService.saveImage(productGroupUpdateDTO.image()));
        }
        productGroup.setName(productGroupUpdateDTO.name());
        return productGroupRepository.save(productGroup);
    }

    // Delete ProductGroup
    public void deleteProductGroup(Integer id) {
        ProductGroup productGroup = productGroupRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));
        productGroupRepository.delete(productGroup);
    }


    public ProductGroup findProductGroupById(Integer id) {
        ProductGroup productGroup = productGroupRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.PRODUCT_GROUP_NOT_FOUND));
        return productGroup;
    }


//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }

}
