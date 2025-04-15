package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.invoice.InvoiceCreateDTO;
import com.example.e_commerce_api.entity.Invoice;
import com.example.e_commerce_api.pattern.repository.save.invoice.InvoiceRepository;
import com.example.e_commerce_api.pattern.repository.save.invoice.InvoiceRepositoryImp;
import com.example.e_commerce_api.pattern.strategyExportInvoice.ExportContext;
import com.example.e_commerce_api.pattern.strategyExportInvoice.IExportStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;


@RestController
@RequestMapping("/api/v1/invoice")
public class InvoiceController {

    @Autowired
    InvoiceRepositoryImp invoiceRepositoryImp;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    ExportContext exportContext;

    @PostMapping()
    public ResponseEntity<ApiResponse> createInvoice(@RequestBody InvoiceCreateDTO dto) {

        if(dto == null)
            throw new IllegalArgumentException("Invoice cannot be null");

        if(dto.getId() == null )
            throw new IllegalArgumentException(dto.toString() + "Invoice ID cannot be null");

        if ( dto.getItems() == null ||  dto.getItems().isEmpty()) {
            throw new IllegalArgumentException("Invoice items cannot be null or empty");
        }



        invoiceRepositoryImp.createInvoice(dto.getId(), dto.getItems(), dto.getTotalPrice());

        ApiResponse response = new ApiResponse<>(

                true,
                "Create invoice success.",
                null,
                null
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping()
    public ResponseEntity<ApiResponse> getAllInvoice(){
        ApiResponse response = new ApiResponse<>(
                true,
                "Get all invoice success.",
                invoiceRepositoryImp.getAll(),
                null
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getInvoiceById(@PathVariable int id){
        ApiResponse response = new ApiResponse<>(
                true,
                "Get invoice success.",
                invoiceRepositoryImp.findById(id),
                null
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping("/export")
    public ResponseEntity<byte[]> exportInvoices(@RequestParam String format) {
        try {
            List<Invoice> invoices = invoiceRepository.findAll();
            IExportStrategy strategy = exportContext.getStrategy(format);

            byte[] content = strategy.export(invoices);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(strategy.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + strategy.getFileName())
                    .body(content);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Export failed: " + e.getMessage()).getBytes());
        }
    }

    @GetMapping("/export/{invoiceId}")
    public ResponseEntity<byte[]> exportInvoiceById(@PathVariable Integer invoiceId) {
        try {
            Optional<Invoice> invoiceOpt = invoiceRepository.findById(invoiceId);
            if (invoiceOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(("Invoice not found with ID: " + invoiceId).getBytes());
            }

            IExportStrategy strategy = exportContext.getStrategy("pdfexport");

            byte[] content = strategy.export(List.of(invoiceOpt.get()));

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(strategy.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + strategy.getFileName())
                    .body(content);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Export failed: " + e.getMessage()).getBytes());
        }
    }

}
