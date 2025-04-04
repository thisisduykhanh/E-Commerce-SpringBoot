package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.product.ProductCreateDTO;
import com.example.e_commerce_api.dto.product.ProductDTO;
import com.example.e_commerce_api.dto.product.ProductUpdateDTO;
import com.example.e_commerce_api.entity.product.Product;
import com.example.e_commerce_api.entity.supply.Image;
import com.example.e_commerce_api.mapper.ProductMapper;
import com.example.e_commerce_api.mapper.SupplierMapper;
import com.example.e_commerce_api.service.product.ProductService;
import com.example.e_commerce_api.service.product.ProductTypeService;
import com.example.e_commerce_api.service.supply.DeliveryService;
import com.example.e_commerce_api.service.supply.ImageService;
import com.example.e_commerce_api.service.supply.SupplyService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private SupplyService supplyService;
    @Autowired
    private SupplierMapper supplierMapper;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private ProductTypeService productTypeService;



    /**
     * API: Lấy thông tin chi tiết sản phẩm theo ID.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Nhận `id` của sản phẩm từ đường dẫn API thông qua `@PathVariable`.
     * 2. Gọi `productService.findById()` để lấy thông tin chi tiết của sản phẩm từ cơ sở dữ liệu.
     * 3. Gọi thêm các service phụ để lấy:
     *    - Danh sách hình ảnh liên quan đến sản phẩm (`imageService.getImageByProduct`).
     *    - Danh sách giá chính thức của sản phẩm (`officialPriceService.findByProduct`).
     * 4. Sử dụng `productMapper.toProductDTO()` để chuyển đổi thông tin sản phẩm, hình ảnh, và giá chính thức thành `ProductDTO`.
     * 5. Trả về phản hồi API:
     *    - Nếu thành công: Tạo một đối tượng `ApiResponse` với trạng thái thành công (`success = true`) và thông tin chi tiết sản phẩm.
     *    - Nếu xảy ra lỗi `EntityNotFoundException`: Tạo một đối tượng `ApiResponse` với thông báo lỗi và trạng thái thất bại (`success = false`).
     * 6. Sử dụng `ResponseEntity` để trả về phản hồi với mã trạng thái HTTP phù hợp:
     *    - 200 (OK) cho phản hồi thành công.
     *    - 404 (Not Found) nếu sản phẩm không tồn tại.
     *
     * @param id ID của sản phẩm, được truyền qua đường dẫn API.
     * @return ResponseEntity<ApiResponse<ProductDTO>>
     *         - Thông tin chi tiết của sản phẩm hoặc thông báo lỗi nếu không tìm thấy.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> findProductById(@PathVariable Integer id) {
        try {
            // Lấy sản phẩm từ service
            Product product = productService.findProductById(id);

            // Lấy danh sách hình ảnh và giá chính thức của sản phẩm
            List<Image> images = imageService.getImageByProduct(product);

            // Chuyển đổi sang ProductDTO
            ProductDTO productDTO = productMapper.toProductDTO(product, images);

            // Tạo response thành công
            ApiResponse<ProductDTO> response = new ApiResponse<>(true, "Product found", productDTO,null);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException ex) {
            // Tạo response lỗi khi không tìm thấy sản phẩm
            ApiResponse<ProductDTO> response = new ApiResponse<>(false, ex.getMessage(), null,null);
            return ResponseEntity.status(404).body(response);
        }
    }


    /**
     * API: Tìm kiếm chung cho sản phẩm (`Product`) và nhà cung cấp (`Supplier`).
     *
     * Phương thức này hỗ trợ tìm kiếm dựa trên các tham số đầu vào và trả về kết quả tương ứng:
     * 1. Phân loại tìm kiếm dựa trên tham số `isProduct`:
     *    - Nếu `isProduct = true`: Tìm kiếm các sản phẩm (`Product`).
     *    - Nếu `isProduct = false`: Tìm kiếm các nhà cung cấp (`Supplier`).
     * 2. Nhận các tham số tìm kiếm qua query parameters:
     *    - `productTypeId`: ID loại sản phẩm (nullable).
     *    - `supplierId`: ID nhà cung cấp (nullable).
     *    - `minPrice`, `maxPrice`: Khoảng giá (nullable).
     *    - `status`: Trạng thái nhà cung cấp (nullable).
     *    - `address`: Địa chỉ nhà cung cấp (nullable).
     *    - `page`: Số trang, mặc định = 0.
     *    - `size`: Số kết quả mỗi trang, mặc định = 10.
     * 3. Với mỗi loại tìm kiếm:
     *    - **Sản phẩm (`Product`)**:
     *      - Gọi `productService.searchProducts()` để lấy danh sách sản phẩm theo điều kiện.
     *      - Chuyển đổi danh sách sản phẩm sang `ProductDTO` bằng cách:
     *        - Lấy hình ảnh (`imageService.getImageByProduct`).
     *        - Lấy giá chính thức (`officialPriceService.findByProduct`).
     *        - Sử dụng `productMapper.toProductDTO()` để chuyển đổi.
     *    - **Nhà cung cấp (`Supplier`)**:
     *      - Gọi `supplyService.searchSuppliers()` để lấy danh sách nhà cung cấp theo điều kiện.
     *      - Chuyển đổi danh sách nhà cung cấp sang `SupplierDTO` bằng cách:
     *        - Lấy danh sách giao hàng (`deliveryService.findBySupplier`).
     *        - Lấy danh sách loại sản phẩm (`productTypeService.findBySupplier`).
     *        - Sử dụng `supplierMapper.toDTO()` để chuyển đổi.
     * 4. Trả về phản hồi API:
     *    - Tạo đối tượng `ApiResponse` chứa danh sách kết quả và trạng thái thành công.
     *    - Sử dụng `ResponseEntity` để trả về HTTP 200 (OK).
     *
     * @param productTypeId   ID loại sản phẩm (nullable).
     * @param supplierId      ID nhà cung cấp (nullable).
     * @param minPrice        Giá tối thiểu (nullable).
     * @param maxPrice        Giá tối đa (nullable).
     * @param status          Trạng thái nhà cung cấp (nullable).
     * @param address         Địa chỉ nhà cung cấp (nullable).
     * @param page            Số trang (default = 0).
     * @param size            Số lượng kết quả mỗi trang (default = 10).
     * @return ResponseEntity<ApiResponse<?>>
     *         - Danh sách sản phẩm hoặc nhà cung cấp tương ứng với điều kiện tìm kiếm.
     */
    @GetMapping()
    public ResponseEntity<ApiResponse<?>> search(
            @RequestParam(required = false) Integer productTypeId,
            @RequestParam(required = false) Integer supplierId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) String address,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

            // Tìm kiếm Product
            Page<Product> products = productService.searchProducts(
                    productTypeId, supplierId, minPrice, maxPrice, status, address, page, size);

            // Chuyển đổi Product sang ProductDTO
            Page<ProductDTO> productDTOs = products.map(product -> {
                List<Image> images = imageService.getImageByProduct(product);

                return productMapper.toProductDTO(product, images);
            });

            System.out.printf("productDTOs: %s\n", productDTOs);


            // Tạo response cho Product
            ApiResponse<List<ProductDTO>> response = new ApiResponse<>(true, "Products retrieved successfully", productDTOs.getContent(),null);
            return ResponseEntity.ok(response);
    }
//    @PostMapping()
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ApiResponse<?>>  createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("price") BigDecimal price,
            @RequestParam("description") String description,
            @RequestParam("productTypeId") Integer productTypeId,
            @RequestParam("supplierId") Integer supplierId,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("attributes") String [] attributes,
            @RequestPart("images") List<MultipartFile> images) {


        System.out.println("Received productName: " + productName);
        System.out.println("Received price: " + price);
        System.out.println("Received description: " + description);
        System.out.println("Received productTypeId: " + productTypeId);
        System.out.println("Received supplierId: " + supplierId);
        System.out.println("Received quantity: " + quantity);
        System.out.println("Received attributes: " + Arrays.toString(attributes));
        System.out.println("Received images count: " + images.size());

        ProductCreateDTO productDTO = new ProductCreateDTO(
                productName, price, description, productTypeId, supplierId, images, quantity, attributes);


        Product product = productService.createProduct(productDTO);

        ApiResponse<String> response = new ApiResponse<>(true, "Thêm sản phẩm thành công", product.toString(),null);

        return ResponseEntity.ok(response);
    }


    @PatchMapping()
    public ResponseEntity<ApiResponse<?>> update(@ModelAttribute ProductUpdateDTO productUpdateDTO){
        productService.updateProduct(productUpdateDTO);
        ApiResponse<String> response = new ApiResponse<>(true, "cập nhật sản phẩm thành công", "true",null);
        return ResponseEntity.ok(response);
    }
//    @GetMapping("/supplier")
//    public ResponseEntity<ApiResponse<?>> search(
//
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(required = false) Boolean statusVerify
//    ) {
//        Pageable pageable = PageRequest.of(page, size);
//
//        // Tìm kiếm Product
//        Page<Product> products = productService.getProductsBySupplierAndStatus(statusVerify,pageable);
//
//        // Chuyển đổi Product sang ProductDTO
//        Page<ProductDTO> productDTOs = products.map(product -> {
//            List<Image> images = imageService.getImageByProduct(product);
//
//            return productMapper.toProductDTO(product, images);
//        });
//
//        // Tạo response cho Product
//        ApiResponse<Page<ProductDTO>> response = new ApiResponse<>(true, "Products retrieved successfully", productDTOs,null);
//        return ResponseEntity.ok(response);
//
//    }

}