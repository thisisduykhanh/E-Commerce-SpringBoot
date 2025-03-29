package com.example.e_commerce_api.repository.supply;

import com.example.e_commerce_api.entity.supply.Supplier;
import com.example.e_commerce_api.entity.user.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SupplierRepository extends JpaRepository<Supplier, Integer>, JpaSpecificationExecutor<Supplier> {
    Page<Supplier> findAllByStatusVerify(Boolean verify, Pageable pageable);
    Supplier findByAccount(Account account);

}
