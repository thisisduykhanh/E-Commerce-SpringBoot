"use client";

import { logger } from "@/lib/default-logger";
import { fetchCart } from "@/services/cart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import OrdersForm from "./create/page";
import OrdersFormEdit from "./edit/page";
import OrderSummary from "./order_summary/page";
import { addOrder } from "@/services/order";

import { useRouter } from "next/navigation";

import { useCart } from "@/contexts/CartContext";

import CartItem from "../cart/cart-item";

function Orders() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [formType, setFormType] = useState("add");
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [cartDetailIds, setCartDetailIds] = useState([]);
  const { fetchCartQuantity } = useCart();

  const handleOpenShippingModal = () => {
    setShippingModalOpen(true);
  };

  const handleCloseShippingModal = () => {
    setShippingModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  const taxRate = 0.1; // Thuế 10%

  const [shippingData, setShippingData] = useState({
    shippingFee: 30000, // Giá gốc
    discountPercent: 20, // Giảm giá %
    discountedFee: 0, // Giá đã giảm
    discountAmount: 0, // Số tiền giảm
  });

  const router = useRouter();

  useEffect(() => {
    const discountedFee =
      shippingData.shippingFee * (1 - shippingData.discountPercent / 100);

    const discountAmount = shippingData.shippingFee - discountedFee;

    // Cập nhật state với giá đã giảm
    setShippingData((prevData) => ({
      ...prevData,
      discountedFee, // Cập nhật giá đã giảm
      discountAmount, // Cập nhật số tiền giảm
    }));
  }, [shippingData.shippingFee, shippingData.discountPercent]);

  // Giả lập fetch để cập nhật shippingData
  const fetchShippingData = async () => {
    const dataFromBackend = {
      shippingFee: 30000,
      discountPercent: 15,
    };

    // Tính toán giá đã giảm
    const discountedFee =
      dataFromBackend.shippingFee * (1 - dataFromBackend.discountPercent / 100);

    // Tính toán số tiền giảm
    const discountAmount = dataFromBackend.shippingFee - discountedFee;

    setShippingData({ ...dataFromBackend, discountedFee, discountAmount });
  };

  useEffect(() => {
    fetchShippingData();
  }, []);

  const handleAddNewAddress = (updatedAddress) => {
    setAddresses((prev) => {
      // Kiểm tra xem địa chỉ đã tồn tại trong danh sách hay chưa
      return prev.some((address) => address.id === updatedAddress.id)
        ? prev.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          )
        : [...prev, updatedAddress];
    });
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await fetchCart();
        if (response?.data) {
          const cartData = response.data;

          setCartItems(cartData);
          setTotalPrice(cartData.totalPrice);

          logger.debug("cartData:", cartData);

          const cartDetailIds =
            cartData.cartSupplierDTOs?.flatMap(
              (supplier) =>
                supplier.cartDetailDTOs?.map((item) => item.id) || []
            ) || [];

          setCartDetailIds(cartDetailIds);
        }
      } catch (error) {
        logger.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    getCart();
  }, []);

  const handleClickOpen = () => {
    setFormType("add");
    setOpen(true);
  };

  const handleEditAddress = () => {
    setFormType("edit");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = async () => {
    const addressDetail = addresses[0]?.addressDetail || ""; // Lấy địa chỉ từ mảng addresses
    const fullName = addresses[0]?.name || "";
    const phone = addresses[0]?.phone || "";

    const shippingFee =
      shippingData.discountedFee || shippingData.shippingFee || 0;
    const taxFee = totalPrice * taxRate;

    logger.debug("Selected address:", addressDetail);
    logger.debug("fullName:", fullName);
    logger.debug("phone:", phone);
    logger.debug("shippingData:", shippingFee);
    logger.debug("cartDetailIds:", cartDetailIds);
    logger.debug("taxRate:", taxFee);

    try {
      // Gọi API để tạo đơn hàng
      const response = await addOrder(
        fullName,
        addressDetail,
        phone,
        shippingFee,
        taxFee,
        cartDetailIds
      );

      if (response?.data) {
        logger.debug("Đơn hàng đã được tạo thành công:", response.data);
        setErrorMessage("Đơn hàng đã được tạo thành công!");
        setErrorSnackbarOpen(true);
        fetchCartQuantity(); // Cập nhật số lượng giỏ hàng
        router.push("/user/orders/notification");
      } else {
        logger.error("Không có dữ liệu trong phản hồi:", response);
        setErrorMessage("Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại!");
      }
    } catch (error) {
      logger.error("Lỗi khi tạo đơn hàng:", error);
      setErrorMessage("Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại!");
      setErrorSnackbarOpen(true);
    }
  };

  logger.debug("addresses:", addresses[0]?.addressDetail);

  return (
    <>
      <Box p={2} display="flex" justifyContent="center">
        <Grid width={1000} paddingX={0} marginRight={12}>
          <Grid item xs={12} md={8} sx={{ paddingX: "0 !important" }}>
            <Card
              variant="outlined"
              sx={{
                color: "black",
                boxShadow: "none !important",
                bgcolor: "#fff",
                border: "none",
                width: "100%",
                paddingX: "0 !important",
              }}
            >
              <CardContent sx={{ paddingX: "0 !important" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#000", marginBottom: "1rem" }}
                >
                  VẬN CHUYỂN & THANH TOÁN
                </Typography>

                <Box mb={4}>
                  {/* Địa chỉ giao hàng */}
                  <Typography
                    variant="body2"
                    color="#000"
                    sx={{ marginBottom: "1rem", fontWeight: 700 }}
                  >
                    Chọn địa chỉ giao hàng có sẵn bên dưới hoặc{" "}
                    <span
                      onClick={addresses.length === 0 ? handleClickOpen : null}
                      onKeyUp={(e) => {
                        if (e.key === "Enter" && addresses.length === 0)
                          handleClickOpen();
                      }}
                      style={{
                        color: addresses.length > 0 ? "#ccc" : orange[500],
                        fontWeight: 700,
                        cursor:
                          addresses.length > 0 ? "not-allowed" : "pointer",
                        opacity: addresses.length > 0 ? 0.5 : 1,
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      Thêm mới
                    </span>
                  </Typography>
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <Box
                        key={index}
                        p={2}
                        sx={{
                          border: "2px dashed #FFA726",
                          borderRadius: "8px",
                          marginBottom: "1rem",
                          position: "relative",
                          width: "50%",
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={1}
                        >
                          <Typography
                            variant="body2"
                            color="#000"
                            sx={{ fontWeight: 700 }}
                          >
                            {address.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#FF5722"
                            sx={{ fontWeight: 700 }}
                          >
                            Mặc định
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#000">
                          {address.addressDetail} - {address.phone}
                        </Typography>
                        <Box display="flex" gap={1} mt={1}>
                          <Button
                            variant="outlined"
                            sx={{
                              color: orange[500],
                              borderColor: orange[500],
                              fontWeight: 700,
                              // padding: '6px 12px',
                              paddingY: "6px",
                              boxShadow: "none",
                              "&:hover": {
                                backgroundColor: orange[50],
                                borderColor: orange[700],
                                boxShadow: "none",
                              },
                            }}
                            onClick={() => handleEditAddress(address)}
                          >
                            Sửa
                          </Button>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ textAlign: "left", marginTop: "1rem" }}
                    >
                      Không có địa chỉ nào. Vui lòng thêm địa chỉ mới!
                    </Typography>
                  )}

                  {/* Đơn vị vận chuyển */}
                  <Typography
                    variant="body2"
                    color="#000"
                    sx={{
                      marginBottom: "0.5rem",
                      marginTop: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    Đơn vị vận chuyển{" "}
                    <span
                      onClick={handleOpenShippingModal}
                      style={{
                        color: orange[500],
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      Thay đổi
                    </span>
                  </Typography>

                  <Dialog
                    open={shippingModalOpen}
                    onClose={handleCloseShippingModal}
                  >
                    <DialogContent>
                      <Typography
                        variant="h6"
                        color="#000"
                        sx={{ fontWeight: 700, marginBottom: "1rem" }}
                      >
                        Chọn đơn vị vận chuyển
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Button
                          variant="outlined"
                          sx={{
                            color: orange[500],
                            borderColor: orange[500],
                            fontWeight: 700,
                            "&:hover": {
                              backgroundColor: orange[50],
                              borderColor: orange[700],
                            },
                          }}
                          onClick={() => {
                            setShippingData((prev) => ({
                              ...prev,
                              shippingFee: 30000,
                              discountPercent: 15,
                            }));
                            handleCloseShippingModal();
                          }}
                        >
                          Giao Hàng Nhanh - Hàng nhẹ : 30.000đ (giao trong 1-2
                          ngày)
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            color: orange[500],
                            borderColor: orange[500],
                            fontWeight: 700,
                            "&:hover": {
                              backgroundColor: orange[50],
                              borderColor: orange[700],
                            },
                          }}
                          onClick={() => {
                            setShippingData((prev) => ({
                              ...prev,
                              shippingFee: 50000,
                              discountPercent: 20,
                            }));
                            handleCloseShippingModal();
                          }}
                        >
                          Giao Hàng Tiết Kiệm - Hàng nặng : 50.000đ (giao trong
                          3-5 ngày)
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>

                  <Box
                    p={2}
                    sx={{
                      border: "2px dashed #FFA726",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#000"
                      sx={{ fontWeight: 700, marginBottom: "0.5rem" }}
                    >
                      Giao Hàng Nhanh - Hàng nhẹ
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#000"
                      sx={{ marginBottom: "0.5rem" }}
                    >
                      Dự kiến nhận hàng trong thời gian sớm nhất
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography
                        variant="body2"
                        color="#000"
                        sx={{ fontWeight: 700, marginRight: "0.5rem" }}
                      >
                        Phí vận chuyển:
                      </Typography>
                      <Typography
                        variant="h6"
                        color={orange[500]}
                        sx={{ fontWeight: 700 }}
                      >
                        {shippingData.discountedFee.toLocaleString("vi-VN")}₫
                      </Typography>
                      <Typography
                        variant="body2"
                        color="gray"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {shippingData.shippingFee.toLocaleString("vi-VN")}₫
                      </Typography>
                    </Box>
                  </Box>

                  {/* Ưu đãi phí vận chuyển */}
                  <Box
                    p={2}
                    sx={{
                      backgroundColor: "#D4EDDA",
                      color: "#39615B",
                      borderRadius: 1,
                      marginTop: "1rem",
                    }}
                  >
                    Bạn được ưu đãi phí vận chuyển{" "}
                    <span style={{ color: "#4B5D26", fontWeight: "bold" }}>
                      {shippingData.discountAmount.toLocaleString("vi-VN")}₫
                    </span>{" "}
                    cho đơn hàng này{" "}
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
                      Tìm hiểu thêm
                    </a>
                  </Box>
                </Box>

                {/* danh sách sản phẩm */}
                <Box mb={4}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "#212121", marginBottom: 2 }}
                  >
                    DANH SÁCH SẢN PHẨM
                  </Typography>
                  <Card
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      boxShadow: "none",
                      marginBottom: 2,
                      width: "100%",
                    }}
                  >
                    <CartItem cartData={cartItems?.cartSupplierDTOs || []} />
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tóm tắt đơn hàng */}

        {cartItems?.cartSupplierDTOs?.length > 0 && (
          <Grid item sx={{ paddingX: "0 !important" }} minWidth={400}>
            <OrderSummary
              totalPrice={totalPrice}
              taxRate={taxRate}
              shippingFee={shippingData.discountedFee}
              onPayment={handlePayment}
              address={addresses}
            />
          </Grid>
        )}

        <Dialog open={open} onCancel={handleClose}>
          <DialogContent>
            {formType === "add" ? (
              <OrdersForm
                onCancel={handleClose}
                onAddNewAddress={handleAddNewAddress}
                cartDetailIds={cartDetailIds}
              />
            ) : (
              <OrdersFormEdit
                address={addresses}
                onCancel={handleClose}
                onAddNewAddress={handleAddNewAddress}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Orders;
