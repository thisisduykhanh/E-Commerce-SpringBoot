package com.example.e_commerce_api.specification;

import com.example.e_commerce_api.entity.product.OfficialPrice;
import com.example.e_commerce_api.entity.product.Product;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class ProductSpecification {
    /**
     * Tạo điều kiện lọc sản phẩm (`Product`) theo loại sản phẩm (`ProductType`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `productTypeId`:
     *    - Nếu null, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `cb.equal()` để so sánh `productTypeId` trong bảng `Product` với giá trị được truyền vào.
     * 3. Ghi log thông tin bảng và cột liên quan (nếu cần).
     * 4. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param productTypeId ID của loại sản phẩm cần lọc (nullable).
     * @return `Specification<Product>` Điều kiện lọc theo loại sản phẩm.
     */
    public static Specification<Product> hasProductType(Integer productTypeId) {
        return (root, query, cb) -> {
            if (productTypeId == null) {
                return null;
            }
            System.out.println("Root Table: " + root.getModel().getName());
            System.out.println("ProductType ID Column: " + root.get("productType").get("id"));
            return cb.equal(root.get("productType").get("id"), productTypeId);
        };
    }


    /**
     * Tạo điều kiện lọc sản phẩm (`Product`) theo nhà cung cấp (`Supplier`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `supplierId`:
     *    - Nếu null, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `cb.equal()` để so sánh `supplierId` trong bảng `Product` với giá trị được truyền vào.
     * 3. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param supplierId ID của nhà cung cấp cần lọc (nullable).
     * @return `Specification<Product>` Điều kiện lọc theo nhà cung cấp.
     */
    public static Specification<Product> hasSupplier(Integer supplierId) {
        return (root, query, cb) -> {
            if (supplierId == null) {
                return null;
            }
            return cb.equal(root.get("supplier").get("id"), supplierId);
        };
    }


    /**
     * Tạo điều kiện lọc sản phẩm (`Product`) theo khoảng giá.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `minPrice` và `maxPrice`:
     *    - Nếu cả hai đều null, không áp dụng điều kiện lọc (trả về null).
     * 2. Tham gia bảng `OfficialPrice` để truy vấn giá:
     *    - Sử dụng `query.from(OfficialPrice.class)` để tham gia bảng `official_price`.
     *    - Tạo điều kiện join giữa bảng `Product` và `OfficialPrice`.
     * 3. Xây dựng điều kiện lọc giá:
     *    - Nếu cả `minPrice` và `maxPrice` không null, lọc giá trong khoảng.
     *    - Nếu chỉ có `minPrice`, lọc giá lớn hơn hoặc bằng `minPrice`.
     *    - Nếu chỉ có `maxPrice`, lọc giá nhỏ hơn hoặc bằng `maxPrice`.
     * 4. Kết hợp điều kiện join và điều kiện giá bằng `cb.and()`.
     *
     * @param minPrice Giá tối thiểu (nullable).
     * @param maxPrice Giá tối đa (nullable).
     * @return `Specification<Product>` Điều kiện lọc theo khoảng giá.
     */
    public static Specification<Product> hasPriceInRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return (root, query, cb) -> {
            if (minPrice == null && maxPrice == null) {
                return null;
            }

            Root<OfficialPrice> officialPriceRoot = query.from(OfficialPrice.class);
            Predicate joinCondition = cb.equal(officialPriceRoot.get("product").get("id"), root.get("id"));
            Predicate priceCondition;

            if (minPrice != null && maxPrice != null) {
                priceCondition = cb.between(officialPriceRoot.get("price"), minPrice, maxPrice);
            } else if (minPrice != null) {
                priceCondition = cb.greaterThanOrEqualTo(officialPriceRoot.get("price"), minPrice);
            } else {
                priceCondition = cb.lessThanOrEqualTo(officialPriceRoot.get("price"), maxPrice);
            }

            return cb.and(joinCondition, priceCondition);
        };
    }


    /**
     * Tạo điều kiện lọc sản phẩm (`Product`) theo trạng thái của nhà cung cấp (`Supplier`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `status`:
     *    - Nếu null, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `cb.equal()` để so sánh trạng thái của nhà cung cấp với giá trị được truyền vào.
     * 3. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param status Trạng thái của nhà cung cấp (nullable).
     * @return `Specification<Product>` Điều kiện lọc theo trạng thái nhà cung cấp.
     */
    public static Specification<Product> hasSupplierStatus(Boolean status) {
        return (root, query, cb) -> {
            if (status == null) {
                return null;
            }
            return cb.equal(root.get("supplier").get("status"), status);
        };
    }
    public static Specification<Product> hasSupplierStatusVerify() {
        return (root, query, cb) -> {

            return cb.isTrue(root.get("supplier").get("statusVerify"));
        };
    }


    /**
     * Tạo điều kiện lọc sản phẩm (`Product`) theo địa chỉ của nhà cung cấp (`Supplier`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `address`:
     *    - Nếu null hoặc rỗng, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `cb.like()` để tìm kiếm địa chỉ không phân biệt chữ hoa/chữ thường.
     * 3. Sử dụng `cb.lower()` để chuyển đổi địa chỉ thành chữ thường trước khi so sánh.
     * 4. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param address Địa chỉ của nhà cung cấp cần lọc (nullable).
     * @return `Specification<Product>` Điều kiện lọc theo địa chỉ nhà cung cấp.
     */
    public static Specification<Product> hasSupplierAddress(String address) {
        return (root, query, cb) -> {
            if (address == null || address.isEmpty()) {
                return null;
            }
            return cb.like(cb.lower(root.get("supplier").get("address")), "%" + address.toLowerCase() + "%");
        };
    }
    public static Specification<Product> hasStatusVerifyTrue() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("statusVerify"));
    }
    public static Specification<Product> hasStatusActivityTrue() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("statusActivity"));
    }
    public static Specification<Product> hasStatusVerifyEquals(Boolean statusVerify) {
        return (root, query, criteriaBuilder) -> {
            if (statusVerify == null) {
                return null;
            } return criteriaBuilder.equal(root.get("statusVerify"), statusVerify);
        };
    }


}