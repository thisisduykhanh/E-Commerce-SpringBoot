package com.example.e_commerce_api.seeder;

import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.Role;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.repository.product.ProductRepository;
import com.example.e_commerce_api.repository.product.ProductTypeRepository;
import com.example.e_commerce_api.repository.user.RoleRepository;
import com.example.e_commerce_api.repository.user.UserRepository;
import com.example.e_commerce_api.service.RoleService;
import com.example.e_commerce_api.service.product.ProductTypeService;
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

    private final AccountService accountService;

    private RoleRepository repository;

    public StartupSeeder(UserRepository userRepository, RoleService roleService, AccountService accountService, RoleRepository repository, ProductTypeService productTypeService, ProductTypeRepository productTypeRepository) {
        this.userRepository = userRepository;

        this.roleService = roleService;
        this.accountService = accountService;

        this.repository = repository;

        this.productTypeService = productTypeService;
        this.productTypeRepository = productTypeRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedData() {

        if (repository.count() == 0) {
            roleService.createRole(new Role(1,"admin"));
            roleService.createRole(new Role(1, "user"));
            roleService.createRole(new Role(1, "supplier"));

            System.out.println("Seed data completed!");
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


    }
}