"use client";

import { logger } from "@/lib/default-logger";
import { addToCart } from "@/services/cart";
import { getReviews } from "@/services/review";
import { fetchProductDetail } from "@/services/category-service";

import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Grid from "@mui/material/Grid2";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Divider,
  IconButton,
  Pagination,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { ShoppingBag } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SimilarProducts } from "./similar-products";
import { useCart } from "@/contexts/CartContext";

function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [productDetail, setProductDetail] = React.useState(null);
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const { data } = await fetchProductDetail(id);

        logger.debug("Product detail:", data);
        setProductDetail(data);
      } catch (error) {
        logger.error("Error fetching product detail:", error);
      }
    };

    if (id) {
      logger.debug("Product detail:", id);
      getProductDetail();
    }
  }, [id]);

  const products = [
  ];

  const [reviews, setReviews] = useState([]);
  const { fetchCartQuantity } = useCart();
  const [activeTab, setActiveTab] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const itemsPerPage = 4;

  const currentData = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await getReviews(id);
        setReviews(data);
      } catch (error) {
        logger.error("Error fetching reviews:", error);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

  // Điều chỉnh phần hiển thị thông tin theo loại sản phẩm
  const renderProductDetails = () => {
    if (productDetail?.productTypeName === "LAPTOP") {
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            Cấu hình chi tiết Laptop
          </Typography>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>CPU:</strong> {productDetail?.cpu || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>RAM:</strong> {productDetail?.ram || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Storage:</strong> {productDetail?.storage || "Không có thông tin"}
            </Typography>
          </Box>
        </Box>
      );
    } else if (productDetail?.productTypeName === "HEADPHONE") {
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            Cấu hình chi tiết Headphone
          </Typography>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Battery Life:</strong> {productDetail?.batteryLife || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Wireless:</strong> {productDetail?.isWireless ? "Có" : "Không"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Noise Cancellation:</strong> {productDetail?.noiseCancellation || "Không có thông tin"}
            </Typography>
          </Box>
        </Box>
      );
    } else if (productDetail?.productTypeName === "PHONE") {
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            Cấu hình chi tiết Phone
          </Typography>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Battery Life:</strong> {productDetail?.batteryLife || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Camera MP:</strong> {productDetail?.cameraMP || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Screen Size:</strong> {productDetail?.screenSize || "Không có thông tin"}
            </Typography>
          </Box>
        </Box>
      );
    } else if (productDetail?.productTypeName === "SMARTWATCH") {
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            Cấu hình chi tiết Smartwatch
          </Typography>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Has GPS:</strong> {productDetail?.hasGPS ? "Có" : "Không"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Water Resistant:</strong> {productDetail?.waterResistant ? "Có" : "Không"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Battery Life:</strong> {productDetail?.batteryLife || "Không có thông tin"}
            </Typography>
          </Box>
        </Box>
      );
    } else if (productDetail?.productTypeName === "TABLET") {
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            Cấu hình chi tiết Tablet
          </Typography>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Screen Size:</strong> {productDetail?.screenSize || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Battery Life:</strong> {productDetail?.batteryLife || "Không có thông tin"}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <Typography variant="body2">
              <strong>Pen Support:</strong> {productDetail?.hasPenSupport ? "Có" : "Không"}
            </Typography>
          </Box>
        </Box>
      );
    }

    return null;
  };



  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  const handleImageClick = (index) => {
    if (productDetail?.images?.[index]) {
      setActiveImageIndex(index);
    }
  };

  const handleScrollUp = () => {
    setActiveImageIndex((prev) => {
      const totalImages = productDetail?.images?.length || 0;
      return prev > 0 ? prev - 1 : totalImages - 1; // Quay về ảnh cuối nếu đang ở ảnh đầu
    });
  };

  const handleScrollDown = () => {
    setActiveImageIndex((prev) => {
      const totalImages = productDetail?.images?.length || 0;
      return prev < totalImages - 1 ? prev + 1 : 0; // Quay về ảnh đầu nếu đang ở ảnh cuối
    });
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await addToCart(id, quantity);

      if (response.success === true) {
        setSuccessMessage("Thêm sản phẩm vào giỏ hàng thành công.");
        await fetchCartQuantity();
        // window.location.href = '/user/cart';
      }
    } catch (error) {
      logger.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        {/* <ProductDisplay
                    productDetail={productDetail}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    quantity={quantity}
                    isLoading={isLoading}
                    successMessage={successMessage}
                    error={error}
                    activeImageIndex={activeImageIndex}
                /> */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            marginBottom: "16px",
            color: "black",
            textAlign: "left",
            fontSize: "24px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Thông tin sản phẩm
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            marginBottom: "40px",
            marginTop: "24px",
            flexWrap: "wrap",
            justifyContent: "center", // Center items for better balance
            paddingX: { xs: "16px", md: "24px" }, // Responsive padding
          }}
        >
          {/* Thumbnail column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              border: "none",
              width: { xs: "100%", sm: "120px", md: "140px" }, // Responsive width
              maxWidth: "140px",
              flexShrink: 0,
            }}
          >
            {/* Scroll up button */}
            <Button
              onClick={handleScrollUp}
              variant="outlined"
              sx={{
                color: "#333333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { color: "#1976d2" },
                border: "none",
                backgroundColor: "transparent",
                minWidth: "40px",
                padding: "4px",
              }}
            >
              <ArrowDropUpIcon fontSize="medium" />
            </Button>

            {/* Thumbnail list */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                maxHeight: "320px", // Slightly taller for better visibility
                overflowY: "auto",
                width: "100%",
                padding: "4px",
              }}
            >
              {productDetail?.images?.map((image, index) => (
                <CardMedia
                  key={image.id}
                  component="img"
                  image={image.url}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleImageClick(index)}
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border:
                      activeImageIndex === index
                        ? "2px solid #00A6B7"
                        : "1px solid #e0e0e0",
                    objectFit: "contain",
                    transition: "border 0.2s ease",
                  }}
                />
              ))}
            </Box>

            {/* Scroll down button */}
            <Button
              onClick={handleScrollDown}
              variant="outlined"
              sx={{
                color: "#333333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { color: "#1976d2" },
                border: "none",
                backgroundColor: "transparent",
                minWidth: "40px",
                padding: "4px",
              }}
            >
              <ArrowDropDownIcon fontSize="medium" />
            </Button>
          </Box>

          {/* Main image */}
          <Box
            sx={{
              flexGrow: 1,
              width: { xs: "100%", sm: "300px", md: "400px" }, // Responsive width
              maxWidth: "500px",
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <CardMedia
              component="img"
              image={productDetail?.images?.[activeImageIndex]?.url}
              alt="Main Product Image"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "450px", // Slightly smaller for balance
                borderRadius: "12px",
                objectFit: "contain",
                transition: "opacity 0.3s ease-in-out",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Subtle shadow for depth
              }}
            />
          </Box>

          {/* Product details */}
          <Box
            sx={{
              padding: { xs: "16px", md: "24px" },
              width: { xs: "100%", sm: "300px", md: "400px" }, // Match main image width
              maxWidth: "450px",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Product name and status */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Typography variant="h5" fontWeight="bold">
                {productDetail?.productName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "rgba(0, 166, 183, 0.2)",
                  color: "#00A6B7",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  textAlign: "center",
                }}
              >
                Còn hàng
              </Typography>
            </Box>

            {/* Price */}
            <Typography
              variant="h6"
              sx={{
                color: "#000000",
                fontWeight: "bold",
              }}
            >
              Giá: {productDetail?.price?.toLocaleString()} VND
            </Typography>

            <Typography variant="body2" sx={{ color: "#666666", mt: "4px" }}>
              <strong>Nhà cung cấp:</strong>{" "}
              {productDetail?.supplierName || "Không có nhà cung cấp"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666666", mt: "4px" }}>
              <strong>Loại sản phẩm:</strong>{" "}
              {productDetail?.productTypeName || "Không có loại sản phẩm"}
            </Typography>

            {/* Description */}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Mô tả:
              </Typography>
              <Typography variant="body2" sx={{ color: "#666666", mt: "4px" }}>
                {productDetail?.description}
              </Typography>
            </Box>


            {/* Quantity selector */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "24px",
                width: "fit-content",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333" }}>
                Số lượng:
              </Typography>
              <IconButton
                onClick={() => handleQuantityChange("decrement")}
                disabled={quantity <= 1}
                sx={{
                  padding: "6px",
                  backgroundColor: "#fff",
                  color: quantity <= 1 ? "#ccc" : "#000",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <TextField
                value={`${quantity}`}
                disabled
                variant="standard"
                sx={{
                  width: "40px",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontSize: "16px",
                    color: "#000",
                  },
                  "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                }}
              />
              <IconButton
                onClick={() => handleQuantityChange("increment")}
                sx={{
                  padding: "6px",
                  backgroundColor: "#fff",
                  color: quantity >= 1 ? "#000" : "#ccc",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Add to cart button */}
            <Button
              variant="contained"
              sx={{
                padding: "12px 32px",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "24px",
                backgroundColor: quantity >= 1 ? "#00A6B7" : "#e0e0e0",
                color: quantity >= 1 ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: quantity >= 1 ? "#fb8c00" : "#e0e0e0",
                },
                transition: "background-color 0.3s ease",
              }}
              onClick={handleAddToCart}
              disabled={isLoading || quantity < 1}
            >
              {isLoading ? (
                "Đang thêm..."
              ) : (
                <>
                  Thêm vào giỏ hàng
                  <ShoppingBag style={{ marginLeft: "8px", fontSize: "20px" }} />
                </>
              )}
            </Button>

            {/* Success or error messages */}
            {successMessage && (
              <Typography variant="body2" color="success.main" sx={{ mt: "8px" }}>
                {successMessage}
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error.main" sx={{ mt: "8px" }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
        <Divider
        sx={{
          margin: "20px 0",
          backgroundColor: "#fff",
          width: "100%",
        }}
      />

        {/* Phần dưới */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            marginBottom: "16px",
            color: "black",
            textAlign: "left",
            fontSize: "24px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          CẤU HÌNH CHI TIẾT</Typography>

        <Box sx={{marginLeft: "20px"}}>
        {renderProductDetails()}
        </Box>

        <Divider
        sx={{
          margin: "20px 0",
          backgroundColor: "#fff",
          width: "100%",
        }}
      />

        <Box>
          {/* Tabs */}

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              marginBottom: "16px",
              color: "black",
              textAlign: "left",
              fontSize: "24px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Đánh giá</Typography>


          {/* Nội dung Tab */}
          <Box>
            {activeTab === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {/* Product Information Section */}
                <Box
                  sx={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "24px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "16px",
                      paddingBottom: "8px",
                      borderBottom: "2px solid #ddd",
                      color: "#333",
                    }}
                  >
                    Thông tin sản phẩm
                  </Typography>

                  {/* Grid layout for details */}
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      marginBottom: "16px",
                    }}
                  >
                    {/* Left side details */}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Trạng thái:</strong>{" "}
                        {productDetail?.status || "Không có"}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Loại kho:</strong>{" "}
                        {productDetail?.warehouseType || "Không có"}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Thời gian sử dụng:</strong>{" "}
                        {productDetail?.usageTime || "Không có"}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Hướng dẫn sử dụng:</strong>{" "}
                        {productDetail?.usageGuide || "Không có"}
                      </Typography>
                    </Grid>

                    {/* Right side details */}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Màu sắc:</strong>{" "}
                        {productDetail?.color || "Không có"}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Kích thước:</strong>{" "}
                        {productDetail?.size || "Không có"}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Packaging Details */}
                  <Box
                    sx={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                      <strong>Chi tiết đóng gói:</strong>{" "}
                      {productDetail?.packagingDetails || "Không có"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Kích thước gói đơn:</strong>{" "}
                      {productDetail?.packageSize || "Không có"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {activeTab === 1 && (
              <>
                {/* Nếu không có đánh giá nào */}
                {reviews.length === 0 && (
                  <Typography variant="body2" color="#555" sx={{ textAlign: 'center', fontSize: '16px', padding: '20px' }}>
                    Chưa có đánh giá nào cho sản phẩm này.
                  </Typography>
                )}

                {reviews.length > 0 && (
                  <Box
                    sx={{
                      padding: "20px",
                      width: "80%",
                      margin: "0 auto",
                      borderRadius: "12px",
                    }}
                  >
                    {/* Danh sách đánh giá */}
                    {currentData.map((review, index) => (
                      <Box
                        key={review.id}
                        sx={{
                          marginBottom: "20px",
                          padding: "20px",
                          borderRadius: "10px",
                          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease-in-out",

                        }}
                      >
                        {/* Dòng trên cùng */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          <Avatar
                            src={review.avatar || "/avatars/default-avt.png"}
                            alt={review.fullName}
                            sx={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#E5E5E5",
                              fontSize: "18px",
                              transition: "all 0.3s ease",

                            }}
                          >
                            {!review.avatar && review.fullName.charAt(0)}
                          </Avatar>

                          <Box>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "16px" }}>
                              {review.fullName}
                            </Typography>

                            {/* Đánh giá sao */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  style={{
                                    color: review.rating >= star ? "gold" : "gray",
                                    fontSize: "18px",
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </Box>
                          </Box>

                          <Typography
                            variant="body2"
                            sx={{
                              marginLeft: "auto",
                              color: "#848484",
                              fontSize: "12px",
                            }}
                          >
                            {review.time}
                          </Typography>
                        </Box>

                        {/* Nội dung đánh giá */}
                        <Typography
                          variant="body2"
                          color="#555"
                          sx={{
                            marginBottom: "15px",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            wordBreak: "break-word",
                            textAlign: "justify",
                          }}
                        >
                          {review.comment}
                        </Typography>
                      </Box>
                    ))}

                    {/* Phân trang */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Pagination
                        count={Math.ceil(reviews.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            borderRadius: "50%",
                            backgroundColor: "#F2F2F2",
                            color: "#555",
                            "&:hover": {
                              backgroundColor: "#00A6B7",
                              color: "white",
                            },
                            "&.Mui-selected": {
                              backgroundColor: "#00A6B7",
                              color: "white",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </>
            )}


            {activeTab === 2 && (
              <Box sx={{ padding: "20px" }}>
                <Typography variant="body1">
                  Công ty TNHH Vinipr Media chuyên cung cấp các loại rau cải hữu
                  cơ, đảm bảo chất lượng
                </Typography>
              </Box>
            )}
            {activeTab === 3 && (
              <Typography variant="body1">
                Chứng nhận sản phẩm: Sản phẩm đạt tiêu chuẩn hữu cơ 100%, chứng
                nhận bởi tổ chức quốc tế.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          margin: "20px 0",
          backgroundColor: "#fff",
          width: "100%",
        }}
      />

      <SimilarProducts products={products} />
    </>
  );
}

export default ProductDetailPage;
