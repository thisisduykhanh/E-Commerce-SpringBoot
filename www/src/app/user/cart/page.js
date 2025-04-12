"use client";

import { logger } from "@/lib/default-logger";
import {
  deleteProductInCart,
  fetchCart,
  updateCart,
} from "@/services/cart";
import {
  Alert,
  Box,
  Card,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog/page";
import CartItem from "./cart-item";
import OrderSummary from "../orders/order_summary/page";
import CartSocketListener from "@/components/CartSocketListener"; // ✅ Mới thêm
import { useCart } from "@/contexts/cartContext";

function CartPage() {
      const { fetchCartQuantity } = useCart();
    
  const [cartData, setCartData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    itemId: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const taxRate = 0.1;
  const shippingFee = 30000;

  const fetchCartData = async () => {
    try {
      const response = await fetchCart();
      if (response.success) {
        setCartData(response.data);

      } else {
        logger.error("Lỗi khi lấy giỏ hàng:", response.message);
      }
    } catch (error) {
      logger.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = async (id, delta) => {
    const updatedCartData = { ...cartData };
    const item = updatedCartData.cartSupplierDTOs
      .flatMap((supplier) => supplier.cartDetailDTOs)
      .find((item) => item.id === id);

    if (!item) return;

    item.quantity = Math.max(item.quantity + delta, 1);
    item.totalPrice = item.quantity * item.unitPrice;

    try {
      const response = await updateCart(id, item.quantity);
      if (response.success) {
        setCartData(updatedCartData);
        await fetchCartQuantity();
        setSnackbarMessage("Cập nhật số lượng sản phẩm thành công");
        setOpenSnackbar(true);
      } else {
        logger.error("API trả về lỗi:", response.message);
        setSnackbarMessage("Không thể cập nhật số lượng sản phẩm.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      logger.error("Lỗi khi cập nhật giỏ hàng:", error);
      setSnackbarMessage("Không thể cập nhật số lượng sản phẩm.");
      setOpenSnackbar(true);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await deleteProductInCart(id);
      if (response.success) {
        await fetchCartData();
        await fetchCartQuantity();
        setSnackbarMessage("Sản phẩm đã được xóa thành công");
        setOpenSnackbar(true);
      } else {
        logger.error("Lỗi khi xóa sản phẩm:", response.message);
      }
    } catch (error) {
      logger.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const confirmDeletion = async () => {
    if (confirmDialog.itemId) {
      await handleRemoveItem(confirmDialog.itemId);
    }
    setConfirmDialog({ open: false, itemId: null });
  };

  const handlePayment = () => {
    window.location.href = "/user/orders";
  };

  return (
    <Box p={2} display="flex" justifyContent="center" paddingX={0}>
      <Grid container spacing={2} paddingX={0}>
        <Grid item xs={12} md={8} paddingX={0}>
          <Card sx={{ color: "black", boxShadow: "none", marginBottom: 2 }}>
            {cartData?.cartSupplierDTOs?.length === 0 ? (
              <Card
                sx={{
                  bgcolor: "white",
                  color: "black",
                  boxShadow: "none",
                  marginBottom: 2,
                  paddingY: "16px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#000",
                    marginBottom: "1rem",
                  }}
                >
                  Giỏ hàng của bạn đang trống
                </Typography>
              </Card>
            ) : (
              <Card
                sx={{
                  bgcolor: "white",
                  color: "black",
                  boxShadow: "none",
                  marginBottom: 2,
                  paddingY: "16px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#000",
                    marginBottom: "1rem",
                  }}
                >
                  Danh sách sản phẩm trong giỏ hàng
                </Typography>
              </Card>
            )}

            <Card
              sx={{
                bgcolor: "white",
                color: "black",
                boxShadow: "none",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <CartItem
                cartData={cartData?.cartSupplierDTOs || []}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={(id) =>
                  setConfirmDialog({ open: true, itemId: id })
                }
              />
            </Card>
          </Card>
        </Grid>
        {cartData?.cartSupplierDTOs?.length > 0 && (
          <Grid item xs={12} md={4}>
            <OrderSummary
              totalPrice={cartData.totalPrice}
              taxRate={taxRate}
              shippingFee={shippingFee}
              onPayment={handlePayment}
            />
          </Grid>
        )}
      </Grid>

      <ConfirmationDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, itemId: null })}
        onConfirm={confirmDeletion}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* ✅ WebSocket listener */}
      {cartData && (
        <CartSocketListener
          accountId={cartData.id}
          onCartUpdate={fetchCartData}
        />
      )}
    </Box>
  );
}

export default CartPage;
