package com.example.e_commerce_api.repository.user;

import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Page<User> findAll(Pageable pageable);
    User findByAccount(Account account);
}