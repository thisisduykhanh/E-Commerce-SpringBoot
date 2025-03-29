package com.example.e_commerce_api.repository.user;

import com.example.e_commerce_api.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRole(String name);
}
