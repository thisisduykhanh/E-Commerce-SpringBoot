import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { getOrderDetail } from "@/services/order";
import { logger } from "@/lib/default-logger";
import ReviewForm from "@/components/review/ReviewForm";

const statusColorMap = {
  PENDING: "#FFA000", // amber
  CANCELLED: "#FF0000", // red
  PAID: "#388E3C", // green
};

const OrderCard = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [orderIdViewed, setOrderIdViewed] = useState(null);

  const handleViewDetail = async (id) => {
    try {
      const res = await getOrderDetail(id);
      setSelectedOrder(res.data);
      logger.debug("Order detail:", res.data);
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch order detail:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenReviewForm = async (orderId) => {
    try {
      setOrderIdViewed(orderId);
      const res = await getOrderDetail(orderId);

      setReviewOrderId(res.data); // Pass the entire order details
    } catch (error) {
      console.error("Failed to fetch order detail for review:", error);
    }
  };

  const handleCloseReviewForm = () => {
    setReviewOrderId(null);
  };

  return (
    <>
      {orders.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Không có đơn hàng nào
        </Typography>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Bạn có {orders.length} đơn hàng
        </Typography>
      )}

      {orders.map((order, index) => (
        <Card
          key={index}
          sx={{ bgcolor: "#fff", mb: 2, boxShadow: 1, color: "#000" }}
        >
          <CardContent>
            <Grid
              container
              spacing={2}
              flexDirection="column"
              alignItems="left"
              sx={{ maxWidth: 1200 }}
            >
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ color: "#000" }}
                >
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Typography variant="body2" color="text.secondary">
                          đặt lúc{" "}
                          {Intl.DateTimeFormat("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(order.createDate))}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Box
                          component="img"
                          src={
                            order.supplier.image ||
                            "https://via.placeholder.com/24"
                          }
                          alt="Avatar"
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "100%",
                            border: "1px solid #e0e0e0",
                          }}
                        />
                      </Grid>
                      <Grid item sx={{ maxWidth: 120 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "text.dark",
                          }}
                        >
                          {order.supplier.nameSupply}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color:
                          statusColorMap[order.orderStatus.name] ||
                          "text.primary",
                      }}
                    >
                      {order.orderStatus.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="body1">Order No #{order.id}</Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                container
                alignItems="flex-end"
                flexDirection="column"
              >
                <Grid item>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.dark"
                  >
                    Tổng số tiền:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order?.totalPrice)}
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                  {order.orderStatus.name === "PAID" && !order.reviewed ? (
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      sx={{ mr: 3 }}
                      onClick={() => handleOpenReviewForm(order.id)}
                    >
                      Review
                    </Button>
                  ) : order.orderStatus.name === "PAID" && order.reviewed ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mr: 3 }}
                    >
                      Đã đánh giá
                    </Typography>
                  ) : null}

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDetail(order.id)}
                  >
                    View detail
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Detail Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Order Detail</DialogTitle>
        <DialogContent dividers>
          {selectedOrder ? (
            selectedOrder.map((item, index) => (
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
                {index < selectedOrder.length - 1 && (
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

      {/* Review Form Modal */}
      {reviewOrderId && (
        <Dialog
          open={Boolean(reviewOrderId)}
          onClose={handleCloseReviewForm}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Write a Review</DialogTitle>
          <DialogContent>
            <ReviewForm order={reviewOrderId} orderIdViewed={orderIdViewed} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReviewForm}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default OrderCard;
