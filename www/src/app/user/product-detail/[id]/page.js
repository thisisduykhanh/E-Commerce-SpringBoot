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
    {
      id: 1,
      name: "Green Apple",
      image: "/img/image/Image (1).png",
      price: "10.000 đ - 15.000 đ",
      originalPrice: "20.000 đ",
      isSale: true,
      salePercent: "50%",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Chinese Cabbage",
      image: "/img/image/Image (2).png",
      price: "10.000 đ - 15.000 đ",
      isSale: false,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Green Capsicum",
      image: "/img/image/Image (3).png",
      price: "10.000 đ - 15.000 đ",
      isSale: false,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Ladies Finger",
      image: "/img/image/Product Image (1).png",
      price: "10.000 đ - 15.000 đ",
      isSale: false,
      rating: 4.3,
    },
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Bên trái - Danh sách ảnh */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              border: "none",
            }}
          >
            {/* Nút cuộn lên */}
            <Button
              onClick={handleScrollUp}
              variant="outlined"
              sx={{
                color: "#333333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  color: "#1976d2",
                },
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <ArrowDropUpIcon fontSize="small" />
            </Button>

            {/* Danh sách hình ảnh */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {productDetail?.images?.map((image, index) => (
                <CardMedia
                  key={image.id}
                  component="img"
                  image={image.url}
                  alt={`Thumbnail ${index}`}
                  onClick={() => handleImageClick(index)} // Truyền index thay vì ID
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border:
                      activeImageIndex === index
                        ? "2px solid #00A6B7"
                        : "1px solid #fff",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Box>

            {/* Nút cuộn xuống */}
            <Button
              onClick={handleScrollDown}
              variant="outlined"
              sx={{
                color: "#333333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  color: "#1976d2",
                },
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <ArrowDropDownIcon fontSize="small" />
            </Button>
          </Box>

          {/* Hình ảnh chính */}
          <CardMedia
            component="img"
            image={productDetail?.images?.[activeImageIndex]?.url} // Ảnh chính
            alt="Main Product Image"
            sx={{
              width: "50%",
              height: "500px",
              borderRadius: "8px",
              objectFit: "cover",
              transition: "opacity 0.3s ease-in-out", // Hiệu ứng chuyển ảnh mượt mà
            }}
          />

          {/* Bên phải - Nội dung sản phẩm */}
          <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            {/* Tên sản phẩm và trạng thái */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4" fontWeight="bold">
                {productDetail?.productName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "rgba(0, 166, 183, 0.2)",
                  color: "#00A6B7",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  marginLeft: "10px",
                }}
              >
                Còn hàng
              </Typography>
            </Box>

            {/* Giá sản phẩm */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "#B3B3B3",
                  marginRight: "10px",
                }}
              >
                {productDetail?.price?.toLocaleString()} VND
              </Typography>
              
            </Box>

            {/* Công ty và chia sẻ */}
            {/* <CompanyShare productDetail={productDetail} /> */}

            {/* Mô tả sản phẩm */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Mô tả:
                </Typography>
                <Typography variant="body2" sx={{ color: "#808080" }}>
                  {productDetail?.description}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Danh mục:
                </Typography>
                <Typography variant="body2" sx={{ color: "#808080" }}>
                  {productDetail?.productTypeName}
                </Typography>
              </Box>
            </Box>

            {/* Số lượng và nút thêm vào giỏ hàng */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                width: "100%", // Adjusted width to fit both elements in one line
                backgroundColor: "#fff",
                color: "black !important",
                marginTop: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #fff",
                  borderRadius: "30px",
                }}
              >
                <Typography
                  variant="body1"
                  marginBottom="20px"
                  width="60%"
                  fontSize="16px"
                  sx={{ fontWeight: "bold" }}
                >
                  Số Lượng :
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity <= 1}
                  sx={{
                    padding: "10px",
                    borderRadius: "30px",
                    backgroundColor: "#FAFAFA !important",
                    color: quantity > 1 ? "#757575" : "#E0E0E0 !important",
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={`${quantity}`}
                  disabled
                  aria-readonly
                  slotProps={{
                    input: {
                      readOnly: true,
                      style: {
                        width: "50px",
                        padding: "0",
                        height: "40px",
                        lineHeight: "40px",
                        color: "black !important",
                        backgroundColor: "#FFF",
                      },
                    },
                  }}
                  variant="standard"
                  sx={{
                    margin: "0 10px",
                    "& .MuiInputBase-root": {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "none",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "none",
                    },
                    color: "black !important",
                    backgroundColor: "#FFF",
                    ":read-only": {
                      backgroundColor: "#FFF",
                      color: "black !important",
                    },
                  }}
                />
                <IconButton
                  onClick={() => handleQuantityChange("increment")}
                  sx={{
                    padding: "10px",
                    borderRadius: "30px",
                    backgroundColor: "#FAFAFA !important",
                    color: "#757575",
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                padding: "10px 20px",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "30px",
                background: quantity >= 0 ? "#00A6B7" : "#E0E0E0",
                color: quantity >= 0 ? "#fff" : "#000 !important",
                borderColor: "#00A6B7",
                cursor: quantity >= 0 ? "pointer" : "not-allowed !important",
              }}
              onClick={handleAddToCart}
              disabled={isLoading || quantity < 0}
            >
              {isLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              <ShoppingBag />
            </Button>

            {/* Thông báo thành công hoặc lỗi */}
            {successMessage ? (
              <Typography
                variant="body2"
                color="primary"
                sx={{ marginTop: "10px" }}
              >
                {successMessage}
              </Typography>
            ) : null}
            {error ? (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginTop: "10px" }}
              >
                {error}
              </Typography>
            ) : null}
          </Box>
        </Box>

        {/* Phần dưới */}
        <Box>
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              marginBottom: "20px",
              borderBottom: "1px solid #B3B3B3", // Gạch dưới toàn bộ Tabs (màu xám nhạt)
              "& .MuiTabs-indicator": {
                backgroundColor: "#00A6B7", // Gạch dưới Tab đang được chọn
                height: "3px", // Độ dày của gạch dưới
              },
              color: "#000", // Màu chữ Tab
            }}
          >
            {/* <Tab
              label="Mô tả"
              sx={{
                textTransform: "none", // Không viết hoa chữ
                fontWeight: activeTab === 0 ? "bold" : "normal", // Chữ đậm nếu Tab được chọn
                color: activeTab === 0 ? "#000 !important" : "#555", // Màu chữ Tab
              }}
            /> */}
            <Tab
              label="Đánh giá"
              sx={{
                textTransform: "none",
                fontWeight: activeTab === 1 ? "bold" : "normal",
                color: activeTab === 1 ? "#000 !important" : "#555",
              }}
            />
            {/* <Tab
              label="Công ty"
              sx={{
                textTransform: "none",
                fontWeight: activeTab === 2 ? "bold" : "normal",
                color: activeTab === 2 ? "#000 !important" : "#555",
              }}
            />
            <Tab
              label="Chứng nhận"
              sx={{
                textTransform: "none",
                fontWeight: activeTab === 3 ? "bold" : "normal",
                color: activeTab === 3 ? "#000 !important" : "#555",
              }}
            /> */}
          </Tabs>

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
                  <Typography variant="body2" color="#555">
                    Chưa có đánh giá nào cho sản phẩm này.
                  </Typography>
                )}

                {reviews.length > 0 && (
                  <Box
                    sx={{
                      padding: "20px",
                      width: "80%",
                      margin: "0 auto",
                    }}
                  >
                    {/* Danh sách đánh giá */}
                    {currentData.map((review, index) => (
                      <Box key={review.id} sx={{ marginBottom: "20px" }}>
                        {/* Dòng trên cùng */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <Avatar
                            src="/avatars/defult.png"
                            alt={review.fullName}
                            sx={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#fff",
                            }}
                          >
                            {!review.avatar && review.fullName.charAt(0)}
                          </Avatar>

                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              {review.fullName}
                            </Typography>

                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                style={{
                                  color:
                                    review.rating >= star ? "gold" : "gray",
                                }}
                              >
                                ★
                              </span>
                            ))}
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
                          sx={{ marginBottom: "10px" }}
                        >
                          {review.comment}
                        </Typography>

                        {/* Đường kẻ ngăn cách */}
                        {index < currentData.length - 1 && (
                          <Divider sx={{ marginTop: "10px" }} />
                        )}
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
