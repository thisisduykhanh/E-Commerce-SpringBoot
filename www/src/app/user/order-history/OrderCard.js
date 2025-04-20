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
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { getOrderDetail, exportInvoiceById } from "@/services/order";
import { logger } from "@/lib/default-logger";
import ReviewForm from "@/components/review/ReviewForm";

const statusColorMap = {
  PENDING: "#FFA000", // amber
  CANCELLED: "#FF0000", // red
  PAID: "#388E3C", // green
};

function OrderCard({ orders, onCancelOrder, onPayment }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [orderIdViewed, setOrderIdViewed] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentOrderId, setPaymentOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [idOrderSelected, setIdOrderSelected] = useState(null);
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [successDialogOpen, setSuccessDialogOpen] = useState(false); // Success dialog state

  const handleViewDetail = async (id) => {
    try {
      const res = await getOrderDetail(id);
      setSelectedOrder(res.data);
      setIdOrderSelected(id);
      logger.debug("Order detail:", res.data);
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch order detail:", error);
    }
  };

  const handleExportInvoice = async (orderId) => {
    try {
      const res = await exportInvoiceById(orderId);
      const url = window.URL.createObjectURL(res);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      handleClose();
    } catch (error) {
      console.error("Failed to export invoice:", error);
      alert("Đơn hàng chưa được thanh toán hoặc đã hủy, không thể xuất hóa đơn");
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    setIdOrderSelected(null);
  };

  const handleOpenPaymentModal = async (orderId) => {
    try {
      const res = await getOrderDetail(orderId);
      setSelectedOrder(res.data);
      setPaymentOrderId(orderId);
      setPaymentModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch order detail for payment:", error);
    }
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setPaymentOrderId(null);
    setPaymentMethod(null);
    setCreditCardDetails({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    });
    setLoading(false);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCreditCardInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const items = selectedOrder.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.productPrice,
    }));

    const order = orders.find((order) => order.id === paymentOrderId);

    if (paymentMethod === "creditCard") {
      if (
        !creditCardDetails.cardNumber ||
        !creditCardDetails.cardHolder ||
        !creditCardDetails.expiryDate ||
        !creditCardDetails.cvv
      ) {
        alert("Vui lòng điền đầy đủ thông tin thẻ tín dụng.");
        return;
      }
    }

    setLoading(true); // Show loading indicator

    // Simulate payment processing with a 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await onPayment(paymentOrderId, paymentMethod, items, order.totalPrice, creditCardDetails);
      setLoading(false);
      handleClosePaymentModal();
      setSuccessDialogOpen(true); // Show success dialog
    } catch (error) {
      setLoading(false);
      console.error("Payment failed:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleOpenReviewForm = async (orderId) => {
    try {
      setOrderIdViewed(orderId);
      const res = await getOrderDetail(orderId);
      setReviewOrderId(res.data);
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
        <Typography variant="h6" color="black" mb={2}>
          Bạn có {orders.length} đơn hàng
        </Typography>
      )}

      {orders.map((order, index) => (
        <Card
          key={index}
          sx={{
            bgcolor: "#f9f9f9",
            mb: 2,
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
          }}
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
                        <Typography variant="body2" color="black">
                          Đặt lúc{" "}
                          {Intl.DateTimeFormat("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(order.createDate))}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ maxWidth: 120 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "black",
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
                        color: statusColorMap[order.orderStatus.name] || "text.primary",
                      }}
                    >
                      {order.orderStatus.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="body1" color="black">Order No #{order.id}</Typography>
                </Grid>
              </Grid>

              {order.orderStatus.name === "PAID" && (
                <Grid item xs={12} container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="body1" color="black">
                      Đã thanh toán bằng: {order.paymentMethod}
                    </Typography>
                  </Grid>
                </Grid>
              )}

              <Grid
                item
                xs={12}
                container
                alignItems="flex-end"
                flexDirection="column"
              >
                <Grid item>
                  <Typography variant="body1" fontWeight="bold" color="black">
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
                      variant="contained"
                      size="small"
                      color="success"
                      sx={{
                        mr: 3,
                        bgcolor: "#388E3C",
                        "&:hover": { bgcolor: "#2C6B34" },
                        borderRadius: "8px",
                      }}
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

                  {order.orderStatus.name === "PENDING" && (
                    <>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        sx={{
                          mr: 3,
                          bgcolor: "#1976D2",
                          "&:hover": { bgcolor: "#1565C0" },
                          borderRadius: "8px",
                        }}
                        onClick={() => handleOpenPaymentModal(order.id)}
                      >
                        Thanh toán
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{
                          mr: 3,
                          borderColor: "#D32F2F",
                          color: "#D32F2F",
                          "&:hover": {
                            borderColor: "#C62828",
                            color: "#C62828",
                          },
                          borderRadius: "8px",
                        }}
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
                    sx={{
                      borderColor: "#00A6B7",
                      color: "#00A6B7",
                      "&:hover": {
                        borderColor: "#0097A7",
                        color: "#0097A7",
                      },
                      borderRadius: "8px",
                    }}
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
          <Button
            onClick={() => handleExportInvoice(idOrderSelected)}
            color="success"
          >
            Xuất hóa đơn
          </Button>
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
              . Số tiền bạn thanh toán sẽ được đảm bảo an toàn cho đến khi bạn
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
                control={
                  <Checkbox
                    checked={paymentMethod === "bankTransfer"}
                    onChange={() => handlePaymentMethodChange("bankTransfer")}
                  />
                }
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
                control={
                  <Checkbox
                    checked={paymentMethod === "eWallet"}
                    onChange={() => handlePaymentMethodChange("eWallet")}
                  />
                }
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
                      Thanh toán qua ví ZaloPay 
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
                control={
                  <Checkbox
                    checked={paymentMethod === "creditCard"}
                    onChange={() => handlePaymentMethodChange("creditCard")}
                  />
                }
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
                    />
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

            {(paymentMethod === "bankTransfer") && (
              <Box mt={3} textAlign="center">
                <Typography variant="h6" mb={2}>
                  Quét mã QR Vietcombank để thanh toán
                </Typography>
                <img
                  src="/payment/bank.jpg"
                  alt="QR Code"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            {(paymentMethod === "eWallet" ) && (
              <Box mt={3} textAlign="center">
                <Typography variant="h6" mb={2}>
                  Quét mã QR ZaloPay để thanh toán
                </Typography>
                <img
                  src="/payment/zalo.jpg"
                  alt="QR Code"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            {paymentMethod === "creditCard" && (
              <Box mt={3}>
                <Typography variant="h6" mb={2}>
                  Thông tin thẻ tín dụng
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số thẻ"
                      name="cardNumber"
                      value={creditCardDetails.cardNumber}
                      onChange={handleCreditCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      inputProps={{ maxLength: 19 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên chủ thẻ"
                      name="cardHolder"
                      value={creditCardDetails.cardHolder}
                      onChange={handleCreditCardInputChange}
                      placeholder="NGUYEN VAN A"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Ngày hết hạn"
                      name="expiryDate"
                      value={creditCardDetails.expiryDate}
                      onChange={handleCreditCardInputChange}
                      placeholder="MM/YY"
                      inputProps={{ maxLength: 5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={creditCardDetails.cvv}
                      onChange={handleCreditCardInputChange}
                      placeholder="123"
                      inputProps={{ maxLength: 3 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            onClick={handlePayment}
            disabled={!paymentMethod || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
          </Button>
          <Button onClick={handleClosePaymentModal} disabled={loading}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Thanh toán thành công</DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <Typography variant="h6" color="success.main" mb={2}>
              🎉 Giao dịch của bạn đã được xử lý thành công!
            </Typography>
            <Typography variant="body1">
              Cảm ơn bạn đã mua sắm tại Asizon. Đơn hàng của bạn sẽ sớm được xử lý.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Form Modal */}
      {reviewOrderId ? (
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
      ) : null}
    </>
  );
}

export default OrderCard;