package com.example.e_commerce_api.pattern.strategyExportInvoice;

import com.example.e_commerce_api.entity.Invoice;
import com.example.e_commerce_api.entity.InvoiceItem;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.LineSeparator;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.List;

public class PDFExport implements IExportStrategy {

    @Override
    public byte[] export(List<Invoice> invoices) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, baos);
        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

        Paragraph title = new Paragraph("Invoice Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph(" "));

        for (Invoice inv : invoices) {
            // Thông tin Hóa đơn
            document.add(new Paragraph("Invoice ID: " + inv.getId(), headerFont));
            document.add(new Paragraph("User ID: " + inv.getUserId(), normalFont));
            document.add(new Paragraph("Created At: " + inv.getCreatedAt(), normalFont));
            document.add(new Paragraph("Total Amount: $" + inv.getTotalPrice(), normalFont));
            document.add(new Paragraph(" "));

            // Bảng chi tiết sản phẩm
            PdfPTable itemTable = new PdfPTable(4);
            itemTable.setWidthPercentage(95);
            itemTable.setSpacingBefore(5);
            itemTable.setSpacingAfter(10);

            addHeader(itemTable, "Product Name");
            addHeader(itemTable, "Quantity");
            addHeader(itemTable, "Unit Price");
            addHeader(itemTable, "Subtotal");

//            for (InvoiceItem item : inv.getItems()) {
//                itemTable.addCell(new PdfPCell(new Phrase(item.getProductName(), normalFont)));
//                itemTable.addCell(item.getQuantity() + "");
//                itemTable.addCell("$" + item.getPrice());
//                itemTable.addCell("$" + item.getTotal());
//            }

            document.add(itemTable);

            // Ngăn cách giữa các hóa đơn
            document.add(new LineSeparator());
            document.add(new Paragraph(" "));
        }

        document.close();
        return baos.toByteArray();
    }

    private void addHeader(PdfPTable table, String title) {
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        PdfPCell cell = new PdfPCell(new Phrase(title, headerFont));
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(cell);
    }

    @Override
    public String getContentType() {
        return "application/pdf";
    }

    @Override
    public String getFileName() {
        return "invoices.pdf";
    }
}

