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
        <Typography variant="h5" sx={{ color: "#333", mb: 3 }}>

          Bạn có {orders.length} đơn hàng
        </Typography>
      )}

      {orders.map((order, index) => (
        <Card
          key={index}
          sx={{
            bgcolor: "#fff",
            mb: 3,
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0, 166, 183, 0.15)",
            },
          }}
        >

<CardContent sx={{ padding: { xs: "16px", sm: "20px", md: "24px" }, bgcolor: "#fff" }}>
  <Grid
    container
    spacing={2}
    direction="column"
    sx={{ maxWidth: 1200, color: "#1a1a1a" }}
  >
    {/* Header: Date, Supplier, and Status */}
    <Grid item sx={{ width: "100%" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: "#f0f7ff",
          borderRadius: "10px",
          padding: { xs: "12px", sm: "16px" },
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Grid item>
          <Grid container spacing={1.5} alignItems="center">
            <Grid item>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "13px", sm: "14px" }, color: "#1a1a1a" }}
              >
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
            <Grid item sx={{ maxWidth: { xs: 150, sm: 250 } }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "13px", sm: "14px" },
                  color: "#1a1a1a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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
              fontSize: { xs: "13px", sm: "14px" },
              color: statusColorMap[order.orderStatus.name] || "#1a1a1a",
      
              padding: "4px 12px",
              borderRadius: "16px",
            }}
          >
            {order.orderStatus.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

    {/* Order Number */}
    <Grid item xs={12}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "18px", sm: "20px" },
          color: "#1a1a1a",
          mt: "12px",
        }}
      >
        Mã đơn hàng #{order.id}
      </Typography>
    </Grid>

    {/* Payment Method (if PAID) */}
    {order.orderStatus.name === "PAID" && (
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "15px", sm: "16px" },
            color: "#1a1a1a",
            mt: "8px",
          }}
        >
          Đã thanh toán bằng: {order.paymentMethod}
        </Typography>
      </Grid>
    )}

    {/* Total Price and Actions */}
    <Grid
      item
      xs={12}
      container
      direction="column"
      alignItems="flex-end"
      sx={{ mt: "16px" }}
    >
      <Grid item>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "18px", sm: "20px" },
            color: "#1a1a1a",
          }}
        >
          Tổng số tiền:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(order?.totalPrice)}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          mt: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        {order.orderStatus.name === "PAID" && !order.reviewed ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#2e7d32",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
              borderRadius: "20px",
              padding: "8px 20px",
              "&:hover": { bgcolor: "#27632a" },
              textTransform: "none",
            }}
            onClick={() => handleOpenReviewForm(order.id)}
          >
            Đánh giá
          </Button>
        ) : order.orderStatus.name === "PAID" && order.reviewed ? (
          <Typography
            variant="body2"
            sx={{
              color: "#757575",
              fontSize: "14px",
              fontStyle: "italic",
              alignSelf: "center",
            }}
          >
            Đã đánh giá
          </Typography>
        ) : null}

        {order.orderStatus.name === "PENDING" && (
          <>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#0288d1",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                borderRadius: "20px",
                padding: "8px 20px",
                "&:hover": { bgcolor: "#0277bd" },
                textTransform: "none",
              }}
              onClick={() => handleOpenPaymentModal(order.id)}
            >
              Thanh toán
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#d32f2f",
                color: "#d32f2f",
                fontWeight: "bold",
                fontSize: "14px",
                borderRadius: "20px",
                padding: "8px 20px",
                "&:hover": {
                  borderColor: "#b71c1c",
                  color: "#b71c1c",
                  bgcolor: "#d32f2f0a",
                },
                textTransform: "none",
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
          sx={{
            borderColor: "#00a6b7",
            color: "#00a6b7",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "20px",
            padding: "8px 20px",
            "&:hover": {
              borderColor: "#00838f",
              color: "#00838f",
              bgcolor: "#00a6b70a",
            },
            textTransform: "none",
          }}
          onClick={() => handleViewDetail(order.id)}
        >
          Xem chi tiết
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

            {(paymentMethod === "eWallet") && (
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