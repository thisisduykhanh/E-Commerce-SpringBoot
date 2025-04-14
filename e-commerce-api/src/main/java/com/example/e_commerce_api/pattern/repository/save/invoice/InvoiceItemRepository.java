package com.example.e_commerce_api.pattern.repository.save.invoice;

import com.example.e_commerce_api.entity.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Integer> {
    List<InvoiceItem> findByInvoiceId(Integer invoiceId);
}
