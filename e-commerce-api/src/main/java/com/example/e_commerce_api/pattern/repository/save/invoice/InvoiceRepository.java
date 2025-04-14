package com.example.e_commerce_api.pattern.repository.save.invoice;

import com.example.e_commerce_api.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

}