package com.example.e_commerce_api.pattern.strategyExportInvoice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ExportContext {
    private final Map<String, IExportStrategy> strategies;

    @Autowired
    public ExportContext(List<IExportStrategy> strategyList) {
        strategies = new HashMap<>();
        for (IExportStrategy strategy : strategyList) {
            strategies.put(strategy.getClass().getSimpleName().toLowerCase(), strategy); // Ví dụ: "json", "csv", "pdf"
        }
    }

    public IExportStrategy getStrategy(String format) {
        return strategies.getOrDefault(format.toLowerCase(), new CSVExport());
    }
}

