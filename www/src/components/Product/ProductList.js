
import {
  Avatar,
  Box,
  CircularProgress,
  Grid2 as Grid,
  Pagination,
  Rating,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { getReviews } from "@/services/review";

/**
 * @param {Object} props
 * @param {Array<Object>} props.products - List of products to display.
 * @param {number} props.currentPage - Current page number.
 * @param {function} props.onPageChange - Callback for page change.
 * @param {function} props.onImageClick - Callback when image is clicked.
 * @param {Object} props.filters - Filter object used for search.
 */
function ProductList({
  products,
  currentPage,
  onPageChange,
  filters,
}) {

  
  const classes = useStyles();

  const [ratings, setRatings] = React.useState({});

  const getStar = async (id) => {
    try {
      const { data } = await getReviews(id);

      const totalStars = data.reduce((sum, r) => sum + r.rating, 0);
      const average = totalStars / data.length;

      setRatings((prev) => ({ ...prev, [id]: parseFloat(average.toFixed(1)) }));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setRatings((prev) => ({ ...prev, [id]: "Chưa đánh giá" }));
      }
    }
  };

  React.useEffect(() => {
    products.forEach((product) => {
      if (!ratings[product.id]) {
        getStar(product.id);
      }
    });
  }, [products]);

  if (!products) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box width="100%" textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Không có sản phẩm nào được tìm thấy.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',  // Căn giữa container
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={3} justifyContent="center" wrap="wrap"> {/* Thêm khoảng cách giữa các sản phẩm */}
        {products.map((product) => {
          const formattedPrices = Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price);
          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                elevation={3}
                sx={{
                  width: "280px", // Cố định chiều ngang
                  border: "1px solid #ccc", // Viền cho card
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: "#fff",
                  color: "#000",
                  "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0, 166, 183, 0.5)",
                    borderColor: "#00A6B7",
                  },
                  "&:hover .cart-icon": {
                    backgroundColor: "#00A6B7", // Màu nền icon giỏ hàng khi hover
                    color: "white", // Màu của icon giỏ hàng khi hover
                  },
                }}
              >
                {/* Sale Badge */}
                {product.isSale && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "#EA4B48",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "5px 10px",
                      borderRadius: "30px",
                    }}
                  >
                    Sale {product.salePercent}
                  </Box>
                )}

                {/* Hình ảnh sản phẩm */}
                <Link href={`/user/product-detail/${product.id}`} passHref>
                  <Button
                    sx={{
                      borderRadius: 1,
                      padding: 0,
                      height: "300px",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px", // Cố định chiều cao của container ảnh
                        overflow: "hidden", // Đảm bảo ảnh không bị tràn ra ngoài
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.images?.[0]?.url || "/default-image.jpg"}
                        alt={product.productName}
                        sx={{
                          height: "100%", // Cố định chiều cao của ảnh
                          objectFit: "cover", // Giữ ảnh tỷ lệ hợp lý
                          transition: "transform 0.3s ease", // Thêm hiệu ứng zoom
                          "&:hover": {
                            transform: "scale(1.1)", // Zoom ảnh khi hover
                          },
                        }}
                      />
                    </Box>
                  </Button>
                </Link>

                {/* Yêu thích và Khóa */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {/* Thêm icon yêu thích và khóa nếu cần */}
                </Box>

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "10px",
                  }}
                >
                  <Typography
                    className="product-name"
                    variant="body1"
                    color="#000000"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                      fontFamily: "'Poppins', sans-serif",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {product.productName || "Tên sản phẩm không có"}
                  </Typography>

                 

                  {/* Giá */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      gap: "10px",
                    }}
                  >
                    <Typography variant="body2" color="#000" sx={{ fontWeight: "600" }}>
                      {formattedPrices || "Không có giá trị hợp lệ."}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "#B3B3B3",
                          fontSize: "12px",
                        }}
                      >
                        {product.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  {/* Thêm loại sản phẩm */}
                  <Typography
                    variant="subtitle2"
                    color="#4D4D4D"
                    sx={{ fontSize: "14px", marginBottom: "5px" }}
                  >
                    Loại: {product.productTypeName || "Không có loại sản phẩm"}
                  </Typography>

                  <Typography variant="subtitle1" color="#4D4D4D" sx={{ fontSize: "14px", marginBottom: "5px" }}>
                      { "Nhà cung cấp: " + product.supplierName || "Không có tên nhà cung cấp"}
                    </Typography>

                  {/* Đánh giá */}
                  <Typography variant="body2" color="#FFA41B" sx={{ marginTop: "5px" }}>
                    {ratings[product.id] === "Chưa đánh giá" ? (
                      <Typography variant="body2" color="gray">
                        Chưa có đánh giá
                      </Typography>
                    ) : (
                      "★".repeat(Math.floor(ratings[product.id] || 0)) +
                      "☆".repeat(5 - Math.floor(ratings[product.id] || 0))
                    )}
                  </Typography>
                </CardContent>

                {/* Biểu tượng Giỏ hàng */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                  }}
                >
                  <IconButton
                    className="cart-icon"
                    sx={{
                      color: "#000",
                      backgroundColor: "#FAFAFA",
                      padding: "5px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(products.length / 12)}
          page={currentPage}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "50%",
              backgroundColor: "#F2F2F2",
              color: "gray",
              "&:hover": {
                backgroundColor: "#008D91",
                color: "white",
              },
              "&.Mui-selected": {
                backgroundColor: "#008D91",
                color: "white",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

export default ProductList;
