package com.example.e_commerce_api.service.supply;


import com.example.e_commerce_api.dto.supply.DeliveryCreateDTO;
import com.example.e_commerce_api.dto.supply.SupplierCreateDTO;
import com.example.e_commerce_api.dto.supply.SupplierUpdateDTO;
import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.Role;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.repository.supply.SupplierRepository;
import com.example.e_commerce_api.repository.user.RoleRepository;
import com.example.e_commerce_api.service.AccountService;
import com.example.e_commerce_api.specification.SupplierSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SupplyService {
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private ImageService imageService;
    @Autowired
    private DeliveryService deliveryService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private RoleRepository repository;

    /**
     * Tìm kiếm nhà cung cấp (`Supplier`) theo nhiều điều kiện và hỗ trợ phân trang.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Tạo `Specification` để kết hợp các điều kiện tìm kiếm:
     *    - Lọc theo địa chỉ (`address`) bằng `SupplierSpecification.hasAddress(address)`.
     *    - Lọc theo trạng thái (`status`) bằng `SupplierSpecification.hasStatus(status)`.
     * 2. Kết hợp các điều kiện sử dụng `Specification.where()` và `and()` để tạo điều kiện tìm kiếm động.
     * 3. Sử dụng `PageRequest.of(page, size)` để tạo đối tượng `Pageable`, hỗ trợ phân trang.
     * 4. Gọi `supplierRepository.findAll(spec, pageable)` để truy vấn cơ sở dữ liệu:
     *    - Trả về danh sách các nhà cung cấp phù hợp với điều kiện tìm kiếm dưới dạng phân trang (`Page<Supplier>`).
     * 5. Trả về kết quả tìm kiếm.
     *
     * @param address Địa chỉ nhà cung cấp (nullable).
     * @param status Trạng thái nhà cung cấp (nullable).
     * @param page Số trang hiện tại (bắt đầu từ 0).
     * @param size Số lượng nhà cung cấp trên mỗi trang.
     * @return `Page<Supplier>` Kết quả tìm kiếm với thông tin phân trang.
     */
    public Page<Supplier> searchSuppliers(String address, Boolean status, int page, int size) {
        // Tạo Specification từ các điều kiện
        Specification<Supplier> spec = Specification.where(SupplierSpecification.hasAddress(address))
                .and(SupplierSpecification.hasStatus(status));

        // Tạo Pageable từ page và size để xử lý phân trang
        Pageable pageable = PageRequest.of(page, size);

        // Truy vấn cơ sở dữ liệu sử dụng Specification và Pageable
        return supplierRepository.findAll(spec, pageable);
    }
    public Page<Supplier> findAllByStatusVerify( Boolean status, int page, int size) {


        // Tạo Pageable từ page và size để xử lý phân trang
        Pageable pageable = PageRequest.of(page, size);

        // Truy vấn cơ sở dữ liệu sử dụng Specification và Pageable
        return supplierRepository.findAllByStatusVerify(status, pageable);
    }


    /**
     * Tìm kiếm nhà cung cấp (`Supplier`) theo ID.
     *
     * Phương thức này thực hiện các bước sau:
     * 1. Gọi `supplierRepository.findById(id)` để tìm kiếm nhà cung cấp trong cơ sở dữ liệu bằng ID.
     *    - Kết quả trả về là một `Optional<Supplier>`.
     * 2. Sử dụng `orElseThrow()` để:
     *    - Trả về nhà cung cấp nếu tìm thấy.
     *    - Ném ngoại lệ `EntityNotFoundException` với thông báo cụ thể nếu không tìm thấy nhà cung cấp.
     *
     * @param id ID của nhà cung cấp cần tìm.
     * @return `Supplier` Đối tượng nhà cung cấp tìm thấy.
     * @throws EntityNotFoundException nếu không tìm thấy nhà cung cấp với ID đã cho.
     */
    public Supplier findById(Integer id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Supplier not found with id " + id));
    }
    // Create Supplier
    public Supplier createSupplier(SupplierCreateDTO supplierDTO) {
        Supplier supplier = new Supplier();
//        supplier.setId(getGenerationId());
        supplier.setNameSupply(supplierDTO.supplyName());
        supplier.setStatusVerify(false);
        supplier.setAddress(supplierDTO.address());
        supplier.setImage(imageService.saveImage(supplierDTO.image()));
        Role role=repository.findByRole("Supply").orElseThrow();
        Account account= Account.builder().role(role).email(supplierDTO.email()).password(supplierDTO.password()).locked(false).build();
        Account accountSave=accountService.registration(account);
        supplier.setAccount(accountSave);
        supplier.setStatus(false);
        Supplier supplier1= supplierRepository.save(supplier);
        supplierDTO.deliveryCreateDTOs().forEach(delivery->{
            deliveryService.createDelivery(delivery,supplier);
        });


        return supplier1;
    }

    // Update Supplier
    public Supplier updateSupplier(SupplierUpdateDTO supplierUpdateDTO) {
        Supplier supplier = supplierRepository.findById(supplierUpdateDTO.id())
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));
        if (supplierUpdateDTO.supplyName() != null) {
            supplier.setNameSupply(supplierUpdateDTO.supplyName());
        }
        if (supplierUpdateDTO.status() != null) {
            supplier.setStatus(supplierUpdateDTO.status());
        }
        if (supplierUpdateDTO.statusVerified() != null) {
            supplier.setStatusVerify(supplierUpdateDTO.statusVerified());
        }

        // Cập nhật địa chỉ nếu có
        if (supplierUpdateDTO.address() != null) {
            supplier.setAddress(supplierUpdateDTO.address());
        }

        // Cập nhật ảnh nếu có
        if (supplierUpdateDTO.image() != null) {
            String imageUrl = imageService.saveImage(supplierUpdateDTO.image());
            supplier.setImage(imageUrl);
        }
        if (supplierUpdateDTO.deliveryUpdateDTOs()!=null){
            supplierUpdateDTO.deliveryUpdateDTOs().stream().forEach(delivery->{
                if (delivery.id()==null){
                    DeliveryCreateDTO dto = new DeliveryCreateDTO(delivery.info());

                    deliveryService.createDelivery(dto,supplier);
                }else {
                    deliveryService.updateDelivery(delivery);
                }
            });
        }
        if (supplierUpdateDTO.email() != null||supplierUpdateDTO.password() != null) {
            Account account = new Account();
            if (supplierUpdateDTO.email() != null) {
                account.setEmail(supplierUpdateDTO.email());
            }
            if (supplierUpdateDTO.password() != null) {
                account.setPassword(supplierUpdateDTO.password());
            }
            Account accountUpdate = accountService.updateAccount(supplier.getAccount().getId(), account);


        }


        return supplierRepository.save(supplier);
    }

    // Delete Supplier
    public void deleteSupplier(Integer id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.PRODUCT_NOT_FOUND));
        supplierRepository.delete(supplier);
    }
//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        // Use most significant bits and ensure it's within the integer range
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }
    public Supplier getCurrentSupplier() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return supplierRepository.findByAccount(account);
    }
}
