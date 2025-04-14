package com.example.e_commerce_api.pattern.repository.save.invoice;

import com.example.e_commerce_api.dto.invoice.InvoiceItemDTO;
import com.example.e_commerce_api.entity.Invoice;
import com.example.e_commerce_api.entity.InvoiceItem;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class InvoiceRepositoryImp {
    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    private UserService userService;

    @Autowired
    InvoiceItemRepository invoiceItemRepository;



    private Account getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();
        return account;
    }

    @Transactional
    public void createInvoice(Integer id, List<InvoiceItemDTO> items, Double totalPrice) {
        User user = userService.findUserByAccount(getCurrentUser());

        Invoice invoiceEntity = new Invoice();
        invoiceEntity.setId(id);
        invoiceEntity.setUserId(user.getId());
        invoiceEntity.setCreatedAt(new Date());
        invoiceEntity.setTotalPrice(totalPrice);

        invoiceRepository.save(invoiceEntity);

        for (InvoiceItemDTO item : items) {
            InvoiceItem invoiceItem = new InvoiceItem();
            invoiceItem.setInvoice(invoiceEntity);
            invoiceItem.setProductId(item.getProductId());
            invoiceItem.setProductName(item.getProductName());
            invoiceItem.setQuantity(item.getQuantity());
            invoiceItem.setPrice(item.getPrice());

            invoiceItemRepository.save(invoiceItem);
        }
    }


    @Transactional
    public List<Invoice> getAll(){
        return invoiceRepository.findAll();
    }

    @Transactional
    public Invoice findById(int id){
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @Transactional
    public void deleteInvoice( Integer id) {
        invoiceRepository.deleteById(id);
    }

}
