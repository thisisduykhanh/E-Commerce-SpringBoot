import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton,
  } from "@mui/material";
  import { useTheme } from "@mui/material/styles";
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import Link from "next/link";
  import * as React from "react";
  import { getReviews } from "@/services/review"; // Reusing review service from ProductList
  import { getProducts } from "@/services/products"; // Adjust based on your actual API
  import { makeStyles } from "@mui/styles";
  
  const useStyles = makeStyles(() => ({
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    },
  }));
  
  function FeaturedProducts() {
    const theme = useTheme();
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);
    const [ratings, setRatings] = React.useState({});
    const [loading, setLoading] = React.useState(true);
  
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts(); // Adjust based on your actual API
        // Limit to 4 products
        const limitedProducts = data.slice(0, 4);
        setProducts(limitedProducts);
        // Fetch ratings for each product
        limitedProducts.forEach((product) => {
          if (!ratings[product.id]) {
            getStar(product.id);
          }
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch star ratings (reused from ProductList)
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
      fetchProducts();
    }, []);
  
    // Container styles
    const containerStyles = {
      padding: { xs: "20px 10px", md: "40px 20px" },
      backgroundColor: theme.palette.background.paper,
      borderRadius: "12px",
      margin: { xs: "20px 10px", md: "40px 20px" },
      boxShadow: theme.shadows[2],
      maxWidth: "100%",
      overflowX: "hidden",
      width: "100%",
      boxSizing: "border-box",
    };
  
    // Grid styles
    const gridStyles = {
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(auto-fit, minmax(260px, 1fr))",
        sm: "repeat(auto-fit, minmax(260px, 1fr))",
        md: "repeat(auto-fit, minmax(280px, 1fr))",
        lg: "repeat(4, 1fr)",
      },
      gap: { xs: "10px", sm: "15px", md: "20px" },
      justifyItems: "center",
      width: "100%",
      padding: { xs: "0 10px", md: "0 20px" },
      boxSizing: "border-box",
    };
  
    // Card styles
    const cardStyles = {
      width: "100%",
      maxWidth: "280px",
      border: "1px solid #e0e0e0",
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
        backgroundColor: "#00A6B7",
        color: "white",
      },
    };
  
    if (loading) {
      return (
        <Box className={classes.loader}>
          <Typography variant="body1" color="textSecondary">
            Đang tải sản phẩm...
          </Typography>
        </Box>
      );
    }
  
    if (products.length === 0) {
      return (
        <Box className={classes.loader}>
          <Typography variant="body1" color="textSecondary">
            Không có sản phẩm nổi bật.
          </Typography>
        </Box>
      );
    }
  
    return (
      <Box sx={containerStyles}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            color: theme.palette.text.primary,
          }}
        >
          Sản phẩm nổi bật
        </Typography>
        <Box sx={gridStyles}>
          {products.map((product) => {
            const formattedPrice = Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price);
            return (
              <Card key={product.id} elevation={3} sx={cardStyles}>
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
  
                {/* Product Image */}
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
                        height: "300px",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.images?.[0]?.url || "/default-image.jpg"}
                        alt={product.productName}
                        sx={{
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    </Box>
                  </Button>
                </Link>
  
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "12px",
                  }}
                >
                  <Typography
                    className="product-name"
                    variant="body1"
                    color="#000000"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "6px",
                      fontFamily: "'Roboto', sans-serif",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {product.productName || "Tên sản phẩm không có"}
                  </Typography>
  
                  <Typography
                    variant="subtitle2"
                    color="#4D4D4D"
                    sx={{
                      fontSize: "13px",
                      marginBottom: "6px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {product.supplierName || "Không có nhà cung cấp"}
                  </Typography>
  
                  {/* Price */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      gap: "8px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="#000"
                      sx={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {formattedPrice}
                    </Typography>
                  </Box>
  
                  {/* Rating */}
                  <Typography
                    variant="body2"
                    color="#FFA41B"
                    sx={{ marginTop: "6px", fontSize: "14px" }}
                  >
                    {ratings[product.id] === "Chưa đánh giá" ? (
                      <Typography variant="body2" color="#757575">
                        Chưa có đánh giá
                      </Typography>
                    ) : (
                      "★".repeat(Math.floor(ratings[product.id] || 0)) +
                      "☆".repeat(5 - Math.floor(ratings[product.id] || 0))
                    )}
                  </Typography>
                </CardContent>
  
                {/* Cart Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                  }}
                >
                  <IconButton
                    className="cart-icon"
                    sx={{
                      color: "#000",
                      backgroundColor: "#F5F5F5",
                      padding: "6px",
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#00A6B7",
                        color: "white",
                      },
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    );
  }
  
  export default FeaturedProducts;