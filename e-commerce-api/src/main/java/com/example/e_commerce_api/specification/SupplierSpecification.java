package com.example.e_commerce_api.specification;

import com.example.e_commerce_api.entity.supply.Supplier;
import org.springframework.data.jpa.domain.Specification;

public class SupplierSpecification {

    /**
     * Tạo điều kiện lọc nhà cung cấp (`Supplier`) theo địa chỉ (`address`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `address`:
     *    - Nếu `address` là null hoặc rỗng, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `criteriaBuilder.like()` để tìm kiếm địa chỉ theo mẫu:
     *    - Sử dụng `%` ở đầu và cuối để thực hiện tìm kiếm chuỗi con (wildcard search).
     *    - Sử dụng `criteriaBuilder.lower()` để so sánh không phân biệt chữ hoa/chữ thường.
     * 3. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param address Địa chỉ cần lọc (nullable).
     * @return `Specification<Supplier>` Điều kiện lọc theo địa chỉ nhà cung cấp.
     */
    public static Specification<Supplier> hasAddress(String address) {
        return (root, query, criteriaBuilder) -> {
            if (address == null || address.isEmpty()) {
                return null; // Không thêm điều kiện nếu address null hoặc rỗng
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("address")), "%" + address.toLowerCase() + "%");
        };
    }


    /**
     * Tạo điều kiện lọc nhà cung cấp (`Supplier`) theo trạng thái (`status`).
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `status`:
     *    - Nếu `status` là null, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `criteriaBuilder.equal()` để so sánh trạng thái (`status`) trong bảng `Supplier` với giá trị được truyền vào.
     * 3. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param status Trạng thái của nhà cung cấp cần lọc (nullable).
     * @return `Specification<Supplier>` Điều kiện lọc theo trạng thái nhà cung cấp.
     */
    public static Specification<Supplier> hasStatus(Boolean status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) {
                return null; // Không thêm điều kiện nếu status null
            }
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }


    /**
     * Tạo điều kiện lọc nhà cung cấp (`Supplier`) theo tên (`name`), tìm kiếm theo chuỗi con.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Kiểm tra `name`:
     *    - Nếu `name` là null hoặc rỗng, không áp dụng điều kiện lọc (trả về null).
     * 2. Sử dụng `criteriaBuilder.like()` để thực hiện tìm kiếm theo chuỗi con:
     *    - Sử dụng `%` ở đầu và cuối để tìm kiếm không phân biệt chữ hoa/chữ thường.
     *    - Sử dụng `criteriaBuilder.lower()` để chuyển đổi tên thành chữ thường trước khi so sánh.
     * 3. Trả về một `Predicate` đại diện cho điều kiện lọc.
     *
     * @param name Tên nhà cung cấp cần lọc (nullable).
     * @return `Specification<Supplier>` Điều kiện lọc theo tên nhà cung cấp.
     */
    public static Specification<Supplier> hasNameContaining(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return null; // Không thêm điều kiện nếu name null hoặc rỗng
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

}