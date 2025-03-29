package com.example.e_commerce_api.repository.user;

import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByEmail(String userName);

    Page<Account> findAllByRole(Role role, Pageable pageable);

    Optional<Account> findById(Integer id);

    void deleteById(Integer id);
}
