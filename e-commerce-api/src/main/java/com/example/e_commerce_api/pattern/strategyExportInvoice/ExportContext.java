package com.example.e_commerce_api.pattern.strategyExportInvoice;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ExportContext {
    private final Map<String, IExportStrategy> strategies;

    public ExportContext() {
        strategies = new HashMap<>();
        strategies.put("json", new JSONExport());
        strategies.put("csv", new CSVExport());
         strategies.put("pdf", new PDFExport());
    }

    public IExportStrategy getStrategy(String format) {
        return strategies.getOrDefault(format.toLowerCase(), new CSVExport());
    }
}

