package com.example.e_commerce_api.seeder;

import com.example.e_commerce_api.dto.product.ProductTypeCreateDTO;
import com.example.e_commerce_api.dto.supply.SupplierCreateDTO;
import com.example.e_commerce_api.entity.order.OrderStatus;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.Role;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.repository.order.OrderStatusRepository;
import com.example.e_commerce_api.repository.product.ProductTypeRepository;
import com.example.e_commerce_api.repository.supply.SupplierRepository;
import com.example.e_commerce_api.repository.user.RoleRepository;
import com.example.e_commerce_api.repository.user.UserRepository;
import com.example.e_commerce_api.service.RoleService;
import com.example.e_commerce_api.service.product.ProductTypeService;
import com.example.e_commerce_api.service.supply.SupplyService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import com.example.e_commerce_api.service.AccountService;


@Component
public class StartupSeeder {
    private final UserRepository userRepository;

    private  final RoleService roleService;

    private  final ProductTypeService productTypeService;

    private  final ProductTypeRepository productTypeRepository;

    private  final SupplyService supplyService;

    private  final SupplierRepository supplierRepository;

    private final AccountService accountService;

    private RoleRepository repository;


    private final OrderStatusRepository orderStatusRepository;

    public StartupSeeder(UserRepository userRepository, RoleService roleService, AccountService accountService, RoleRepository repository, ProductTypeService productTypeService, ProductTypeRepository productTypeRepository, SupplyService supplyService, SupplierRepository supplierRepository, OrderStatusRepository orderStatusRepository) {
        this.userRepository = userRepository;

        this.roleService = roleService;
        this.accountService = accountService;

        this.repository = repository;

        this.productTypeService = productTypeService;
        this.productTypeRepository = productTypeRepository;

        this.supplyService = supplyService;
        this.supplierRepository = supplierRepository;

        this.orderStatusRepository = orderStatusRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedData() {

        if (repository.count() == 0) {
            roleService.createRole(new Role(1,"admin"));
            roleService.createRole(new Role(1, "user"));
            roleService.createRole(new Role(1, "Supply"));
        }

        if (userRepository.count() == 0) {
            Role role=repository.findByRole("admin").orElseThrow();
            Account account= Account.builder().role(role).email("admin@example.com").password("123456").locked(false).build();
            Account accountSave=accountService.registration(account);

            User user = new User();
            user.setAccount(accountSave);
            user.setFullName("Admin");
            user.setPhone("0123456789");

            userRepository.save(user);
        }

        if (productTypeRepository.count() == 0) {
            productTypeService.createProductType(new ProductTypeCreateDTO("LAPTOP"));
            productTypeService.createProductType(new ProductTypeCreateDTO("TABLET"));
            productTypeService.createProductType(new ProductTypeCreateDTO("PHONE"));
            productTypeService.createProductType(new ProductTypeCreateDTO("HEADPHONE"));
            productTypeService.createProductType(new ProductTypeCreateDTO("SMARTWATCH"));
        }

        if (supplierRepository.count() == 0) {
            supplyService.createSupplier(new SupplierCreateDTO(null, "APPLE", null, "USA", "apple@supplier.com", "apple123"));

            supplyService.createSupplier(new SupplierCreateDTO(null, "SAMSUNG", null, "KOREA", "samsung@supplier.com", "samsung123"));

            supplyService.createSupplier(new SupplierCreateDTO(null, "SONY", null, "USA", "sony@supplier.com", "sony123"));

            supplyService.createSupplier(new SupplierCreateDTO(null, "LG", null, "KOREA", "lg@supplier.com", "lg123"));

            supplyService.createSupplier(new SupplierCreateDTO(null, "DELL", null, "USA", "dell@supplier.com", "dell123"));

            supplyService.createSupplier(new SupplierCreateDTO(null, "XIAOMI", null, "CHINA", "xiaomi@supplier.com", "xiaomi123"));
        }

        if(orderStatusRepository.count() == 0) {
            orderStatusRepository.save(new OrderStatus(1, "PENDING"));
            orderStatusRepository.save(new OrderStatus(2, "PAID"));
            orderStatusRepository.save(new OrderStatus(3, "CANCELLED"));
        }
    }
}