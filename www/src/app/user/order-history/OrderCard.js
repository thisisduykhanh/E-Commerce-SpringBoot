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
  FormControlLabel,
  Checkbox,
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

const OrderCard = ({ orders, onCancelOrder, onPayment }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [orderIdViewed, setOrderIdViewed] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false); // State for payment modal
  const [paymentOrderId, setPaymentOrderId] = useState(null); // State for selected order ID for payment
  const [paymentMethod, setPaymentMethod] = useState(null); // State for payment method

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

  const handleOpenPaymentModal = (orderId) => {
    setPaymentOrderId(orderId);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setPaymentOrderId(null);
  };

  const handlePaymentMethod = (method) => {

    onPayment(paymentOrderId, method);
    handleClosePaymentModal();
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

                  {/* Show Cancel button for PENDING orders */}
                  {order.orderStatus.name === "PENDING" && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ mr: 3 }}
                        onClick={() => handleOpenPaymentModal(order.id)}
                      >
                        Thanh toán
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ mr: 3 }}
                        onClick={() => onCancelOrder(order.id)}
                      >
                        Hủy đơn
                      </Button>
                    </>
                  )}

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

      {/* Payment Modal */}
      <Dialog
        open={paymentModalOpen}
        onClose={handleClosePaymentModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
        <DialogContent>
          <Box mb={4}>
            <Box
              p={2}
              sx={{
                backgroundColor: "#D4EDDA",
                color: "#39615B",
                borderRadius: 1,
              }}
            >
              Mua sắm an toàn cùng{" "}
              <span style={{ color: "#4B5D26", fontWeight: "bold" }}>
                Asizon
              </span>
              .Số tiền bạn thanh toán sẽ được đảm bảo an toàn cho đến khi bạn
              nhận được sản phẩm đúng như mô tả từ Nhà Cung Cấp{" "}
              <a
                href="https://example.com"
                style={{
                  color: "#4B5D26",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Tìm hiểu thêm →
              </a>
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={<Checkbox />}
                value={"bankTransfer"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
                label={
                  <Box display="flex" alignItems="center">
                    <img
                      src="/payment/master-card.png"
                      alt="ngân hàng"
                      style={{
                        width: 60,
                        height: 40,
                        marginRight: 8,
                        objectFit: "contain",
                      }}
                    />
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                      Chuyển khoản ngân hàng
                    </span>
                  </Box>
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                  marginLeft: 0,
                }}
              />
              <FormControlLabel
                control={<Checkbox sx={{ padding: 0, marginRight: 1 }} />}
                value={"eWallet"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
                label={
                  <Box display="flex" alignItems="center">
                    <img
                      src="/payment/zalo.png"
                      alt="ZaloPay"
                      style={{
                        width: 60,
                        height: 40,
                        marginRight: 8,
                        objectFit: "contain",
                      }}
                    />
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                      Thanh toán qua ví ZaloPay (Miễn phí thanh toán)
                    </span>
                  </Box>
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                  marginLeft: 0,
                }}
              />

              <FormControlLabel
                control={<Checkbox />}
                value={"creditCard"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
                label={
                  <Box display="flex" alignItems="center">
                    <img
                      src="/payment/visa.png"
                      alt="ngân hàng"
                      style={{
                        width: 60,
                        height: 40,
                        marginRight: 8,
                        objectFit: "contain",
                      }}
                    />{" "}
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                      Thẻ tín dụng
                    </span>
                  </Box>
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            onClick={() => handlePaymentMethod(paymentMethod)}
            disabled={!paymentMethod}
          >
            Thanh toán
          </Button>

          <Button onClick={handleClosePaymentModal}>Đóng</Button>
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
