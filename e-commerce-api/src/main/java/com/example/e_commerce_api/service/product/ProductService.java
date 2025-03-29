package com.example.e_commerce_api.service.product;


import com.example.e_commerce_api.dto.product.OfficialPriceCreateDTO;
import com.example.e_commerce_api.dto.product.ProductCreateDTO;
import com.example.e_commerce_api.dto.product.ProductUpdateDTO;
import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.entity.product.ProductType;
import com.example.e_commerce_api.entity.supply.Image;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.pattern.factory.ProductFactory;
import com.example.e_commerce_api.repository.product.ProductRepository;
import com.example.e_commerce_api.repository.product.ProductTypeRepository;
import com.example.e_commerce_api.repository.supply.ImageRepository;
import com.example.e_commerce_api.repository.supply.SupplierRepository;
import com.example.e_commerce_api.service.UserService;
import com.example.e_commerce_api.service.supply.ImageService;
import com.example.e_commerce_api.service.supply.SupplyService;
import com.example.e_commerce_api.specification.ProductSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductTypeService productTypeService;
    private final SupplyService supplyService;
    private final UserService userService;
    private final ProductTypeRepository productTypeRepository;
    private final SupplierRepository supplierRepository;
    private final ImageService imageService;
    private final OfficialPriceService officialPriceService;
    private final ImageRepository imageRepository;
    private final ProductFactory productFactory;


    /**
     * Tìm kiếm sản phẩm (`Product`) theo ID.
     * <p>
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `productRepository.findById(id)` để tìm kiếm sản phẩm trong cơ sở dữ liệu bằng ID.
     * - Kết quả trả về là một `Optional<Product>`.
     * 2. Sử dụng `orElseThrow()` để:
     * - Trả về sản phẩm nếu tìm thấy.
     * - Ném ngoại lệ `EntityNotFoundException` với thông báo rõ ràng nếu không tìm thấy sản phẩm.
     *
     * @param id ID của sản phẩm cần tìm.
     * @return `Product` Đối tượng sản phẩm tìm thấy.
     * @throws EntityNotFoundException nếu không tìm thấy sản phẩm với ID đã cho.
     */
    public Product findProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
    }


    /**
     * Tìm kiếm sản phẩm (`Product`) theo nhiều điều kiện và hỗ trợ phân trang.
     * <p>
     * Phương thức này thực hiện các bước sau:
     * 1. Khởi tạo `Specification` cơ bản:
     * - Lọc theo loại sản phẩm (`productTypeId`) và khoảng giá (`minPrice`, `maxPrice`).
     * 2. Kiểm tra các tham số khác:
     * - Nếu `supplierId` không null, thêm điều kiện lọc theo nhà cung cấp (`hasSupplier`).
     * - Nếu `supplierId` null, lọc thêm theo trạng thái (`hasSupplierStatus`) và địa chỉ nhà cung cấp (`hasSupplierAddress`).
     * 3. Cấu hình phân trang:
     * - Sử dụng `PageRequest.of(page, size)` để tạo đối tượng `Pageable`.
     * 4. Gọi `productRepository.findAll(spec, pageable)` để thực hiện truy vấn và trả về kết quả dạng phân trang (`Page<Product>`).
     *
     * @param productTypeId ID loại sản phẩm (nullable).
     * @param supplierId    ID nhà cung cấp (nullable).
     * @param minPrice      Giá tối thiểu (nullable).
     * @param maxPrice      Giá tối đa (nullable).
     * @param status        Trạng thái nhà cung cấp (nullable).
     * @param address       Địa chỉ nhà cung cấp (nullable).
     * @param page          Số trang hiện tại (bắt đầu từ 0).
     * @param size          Số lượng sản phẩm trên mỗi trang.
     * @return `Page<Product>` Kết quả tìm kiếm với thông tin phân trang.
     */
    public Page<Product> searchProducts(
            Integer productTypeId,
            Integer supplierId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean status,
            String address,
            int page,
            int size) {

        // Bắt đầu với Specification mặc định (lấy tất cả nếu không có điều kiện)
        Specification<Product> spec = Specification.where(null);

        // Lọc theo loại sản phẩm (nếu có)
        if (productTypeId != null) {
            spec = spec.and(ProductSpecification.hasProductType(productTypeId));
        }

        // Lọc theo khoảng giá (nếu có)
        if (minPrice != null || maxPrice != null) {
            spec = spec.and(ProductSpecification.hasPriceInRange(minPrice, maxPrice));
        }

        // Lọc theo trạng thái xác minh và hoạt động (luôn áp dụng)
        spec = spec.and(ProductSpecification.hasStatusVerifyTrue())
                .and(ProductSpecification.hasStatusActivityTrue());
//                .and(ProductSpecification.hasSupplierStatusVerify());

        // Lọc theo supplierId (nếu có)
        if (supplierId != null) {
            spec = spec.and(ProductSpecification.hasSupplier(supplierId));
        } else {
            // Nếu không có supplierId, lọc theo trạng thái và địa chỉ (nếu có)
            if (status != null) {
                spec = spec.and(ProductSpecification.hasSupplierStatus(status));
            }
            if (address != null && !address.isEmpty()) {
                spec = spec.and(ProductSpecification.hasSupplierAddress(address));
            }
        }

        // Cấu hình phân trang
        Pageable pageable = PageRequest.of(page, size);

        // Ghi log kiểm tra
        log.info("🔍 Đang tìm kiếm với các điều kiện: productTypeId={}, supplierId={}, minPrice={}, maxPrice={}, status={}, address={}",
                productTypeId, supplierId, minPrice, maxPrice, status, address);

        // Thực hiện truy vấn
        Page<Product> products = productRepository.findAll(spec, pageable);

        log.info("📊 Tổng số sản phẩm tìm thấy: {}", products.getTotalElements());
        return products;
    }

    @Cacheable("productTypes")
    public ProductType findProductTypeById(Integer id) {
        return productTypeRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.PRODUCT_TYPE_NOT_FOUND));
    }

    private void saveProductImages(Product product, List<MultipartFile> images) {
        images.forEach(image -> {
            Image imageEntity = new Image();
            imageEntity.setUrl(imageService.saveImage(image));
            imageEntity.setProduct(product);
            imageRepository.save(imageEntity);
        });
    }



    // Create Product
    @Transactional
    public Product createProduct(ProductCreateDTO productDTO) {

        ProductType productType = findProductTypeById(productDTO.productTypeId());


        Supplier supplier = supplierRepository.findById(productDTO.supplierId())
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));


        Product product = productFactory.createProduct(productDTO.productName(), productDTO.price(), productDTO.description(), productType, supplier, productDTO.attributes());

        saveProductImages(product, productDTO.images());

        productDTO.officialPriceDTOS().forEach(officialPriceDTO -> {
            officialPriceService.save(officialPriceDTO, product);
        });

        return product;
    }

    // Update Product
    @Transactional
    public Product updateProduct(ProductUpdateDTO productUpdateDTO) {
        Product existingProduct = productRepository.findById(productUpdateDTO.id())
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));

        // Cập nhật product (không gán lại product)
        ProductFactory.updateProduct(existingProduct, productUpdateDTO, productTypeRepository, supplierRepository);

        // Cập nhật ảnh
        if (productUpdateDTO.images() != null) {
            productUpdateDTO.images().stream().forEach(imageUpdateDTO -> {
                if (imageUpdateDTO.id() == null) {
                    Image image = new Image();
//                    image1.setId(getGenerationId());
                    image.setUrl(imageService.saveImage(imageUpdateDTO.file()));
                    image.setProduct(existingProduct);
                    imageRepository.save(image);
                } else {
                    String url = imageService.saveImage(imageUpdateDTO.file());
                    Image image = imageRepository.findById(imageUpdateDTO.id()).orElseThrow();
                    image.setUrl(url);
                    imageRepository.save(image);
                }

            });
        }
        if (productUpdateDTO.officialPriceUpdateDTOs() != null) {
            productUpdateDTO.officialPriceUpdateDTOs().forEach(officialPriceUpdateDTO -> {
                if (officialPriceUpdateDTO.id() != null) {
                    officialPriceService.update(officialPriceUpdateDTO);
                } else {
                    OfficialPriceCreateDTO officialPriceCreateDTO = new OfficialPriceCreateDTO(
                            officialPriceUpdateDTO.minQuantity(),
                            officialPriceUpdateDTO.maxQuantity(),
                            officialPriceUpdateDTO.price()
                    );

                    officialPriceService.save(officialPriceCreateDTO, existingProduct);
                }
            });
        }


        return existingProduct;
    }

    // Delete Product
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));
        productRepository.delete(product);
    }

    private Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return account;
    }

    public Page<Product> getProductsBySupplierAndStatus(Boolean statusVerify, Pageable pageable) {
        Supplier supplier = supplyService.getCurrentSupplier();
        Specification<Product> spec = Specification.where(ProductSpecification.hasSupplier(supplier.getId()));
        if (statusVerify != null) {
            spec = spec.and(ProductSpecification.hasStatusVerifyEquals(statusVerify));
        }
        return productRepository.findAll(spec, pageable);
    }


//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }

}
