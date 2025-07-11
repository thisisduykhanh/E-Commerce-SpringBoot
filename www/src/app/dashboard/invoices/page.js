"use client";

import React, { useEffect, useState } from "react";
import {
  getInvoices,
  exportInvoiceById,
  exportInvoices,
} from "@/services/order";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

function Page() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await getInvoices();
        setInvoices(fetchedInvoices.data);
      } catch (error) {
        console.error("Failed to fetch invoices", error);
      }
    };

    fetchInvoices();
  }, []);

  const exportData = (format) => {
    const exportInvoiceAsync = async () => {
      const response = await exportInvoices(format);
      console.log("Exported data:", response);

      let blob;
      const fileType = format === "csvexport" ? "text/csv" : "application/json";

      if (fileType === "application/json") {
        blob = new Blob([JSON.stringify(response, null, 2)], {
          type: "application/json",
        });
      } else {
        blob = new Blob([response], { type: fileType });
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoices.${format.replace("export", "")}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    exportInvoiceAsync();
  };

  const exportInvoice = (invoiceId) => {
    const exportInvoiceAsync = async () => {
      const response = await exportInvoiceById(invoiceId);
      const blob = new Blob([response], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    exportInvoiceAsync();
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Danh sách hóa đơn
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Mã khách hàng</strong>
              </TableCell>
              <TableCell>
                <strong>Tạo lúc</strong>
              </TableCell>
              <TableCell>
                <strong>Tổng giá tiền</strong>
              </TableCell>
              <TableCell>
                <strong>Hành động</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.userId}</TableCell>
                <TableCell>
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{invoice.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    sx={{ backgroundColor: "#0000ff", color: "#fff", }}
                    variant="contained"
                    color="primary"
                    onClick={() => exportInvoice(invoice.id)}
                  >
                    Xuất hóa đơn này
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
          onClick={() => exportData("csvexport")}
        >
          Xuất dữ liệu (CSV)
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ backgroundColor: "#2196F3", color: "#fff", marginLeft: "10px" }}
          onClick={() => exportData("jsonexport")}
        >
          Xuất dữ liệu (JSON)
        </Button>
      </Box>
    </Box>
  );
}

export default Page;
