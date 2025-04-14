package com.example.e_commerce_api.pattern.strategyExportInvoice;

import com.example.e_commerce_api.entity.Invoice;

import java.util.List;

public interface IExportStrategy {
    byte[] export(List<Invoice> invoices) throws Exception;
    String getContentType();
    String getFileName();
}
