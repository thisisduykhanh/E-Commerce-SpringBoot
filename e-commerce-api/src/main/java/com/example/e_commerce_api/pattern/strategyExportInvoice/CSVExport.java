package com.example.e_commerce_api.pattern.strategyExportInvoice;

import com.example.e_commerce_api.entity.Invoice;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class CSVExport implements IExportStrategy {

    @Override
    public byte[] export(List<Invoice> invoices) {
        StringBuilder sb = new StringBuilder();
        sb.append("Invoice ID, User ID, Created At, Total Amount\n");
        for (Invoice invoice : invoices) {
            sb.append(invoice.getId()).append(",");
            sb.append(invoice.getUserId()).append(",");
            sb.append(invoice.getCreatedAt()).append(",");
            sb.append(invoice.getTotalPrice()).append("\n");
        }
        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public String getContentType() {
        return "text/csv";
    }

    @Override
    public String getFileName() {
        return "invoices.csv";
    }
}
