package com.example.e_commerce_api.pattern.strategyExportInvoice;

import com.example.e_commerce_api.entity.Invoice;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JSONExport implements IExportStrategy {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public byte[] export(List<Invoice> invoices) throws Exception {
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(invoices);
    }

    @Override
    public String getContentType() {
        return "application/json";
    }

    @Override
    public String getFileName() {
        return "invoices.json";
    }
}
