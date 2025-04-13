"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";

import { paths } from "@/paths";

import { useSearchParams } from "next/navigation";

import { getOrderDetail } from "@/services/order";

// Fix the import for Grid
import Grid from "@mui/material/Grid";

export function OrderModal({ open }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("previewId");

  const [orderDetail, setOrderDetail] = React.useState([]);

  const fetchOrderDetail = React.useCallback(async () => {
    try {
      const response = await getOrderDetail(id);
      console.log("data", response);
      setOrderDetail(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }, [id]);

  React.useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [fetchOrderDetail, id]);

  const handleClose = React.useCallback(() => {
    router.push(paths.dashboard.orders.list);
  }, [router]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Order Detail</DialogTitle>
      <DialogContent dividers>
        {orderDetail ? (
          orderDetail.map((item, index) => (
            <Box
              key={index}
              sx={{ mb: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold">
                    Product Details
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ID:</strong> {item.id}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Product ID:</strong> {item.productId}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Product Name:</strong> {item.productName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.productPrice)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Quantity:</strong> {item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Total Price:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.totalPrice)}
                  </Typography>
                </Grid>
              </Grid>
              {index < orderDetail.length - 1 && (
                <Divider sx={{ mt: 3, mb: 3 }} />
              )}
            </Box>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
