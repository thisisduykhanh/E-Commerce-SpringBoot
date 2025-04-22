"use client";

import { logger } from "@/lib/default-logger";

import {
  ExitToApp as ExitToAppIcon,
  LocalShipping as LocalShippingIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import * as React from "react";
import { getUser } from "../../../services/auth";
import CategoryMenu from "../Menu/CategoryMenu";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  // const [cartQuantity, setCartQuantity] = React.useState(0);

  const { cartQuantity, fetchCartQuantity } = useCart();
  // const fetchCartQuantity = async () => {
  //   try {
  //     const response = await fetchCart();
  //     if (response.success && response.data) {
  //       const totalItems = response.data.cartSupplierDTOs
  //         ?.flatMap((supplier) => supplier.cartDetailDTOs)
  //         ?.reduce((sum, item) => sum + item.quantity, 0);
  //       setCartQuantity(totalItems || 0);

  //       console.log("Số lượng giỏ hàng:", totalItems);
  //     }
  //   } catch (error) {
  //     logger.error("Lỗi khi lấy số lượng giỏ hàng:", error);
  //   }
  // };

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined" || token === "null") {
        logger.warn("No valid token found in session storage.");
        return;
      }

      try {
        const response = await getUser();

        if (response?.data) {
          logger.debug("User data fetched successfully:", response.data);
          setUser(response.data);
        } else {
          logger.warn(
            "Response received but no user data available:",
            response
          );
        }
      } catch (error) {
        logger.error("Error fetching user:", error);
      }
    };
    fetchUser();

    fetchCartQuantity();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/user");
  };

  const handleTabChange = (_event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <AppBar
  position="static"
  sx={{
    background: "#ffffff !important",
    boxShadow: "none",
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  }}
>
  <Toolbar
  sx={{
    justifyContent: "space-between",
    backgroundColor: "#00A6B7",
    minHeight: "60px",
    flexWrap: "wrap",
    paddingX: "0 !important",
    display: "flex",
    alignItems: "center",
  }}
>
  {/* Logo section */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      marginRight: "20px",
    }}
  >
    <Button onClick={() => router.push("/user")}>
      <img
        src="/img/image/logo/1.png"
        alt="Logo"
        style={{ height: "60px", width: "auto", cursor: "pointer" }}
      />
    </Button>
  </Box>

  {/* Search bar section */}
  <Box
    sx={{
      padding: 0,
      display: "flex",
      alignItems: "center",
      width: { xs: "100%", sm: "50%" },
      maxWidth: "600px",
      backgroundColor: "#F3F9FB",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      justifyContent: "center",
      marginTop: { xs: "10px", sm: "0" },
      marginRight: "20px",
      flexGrow: 1,  // Allow search bar to take up remaining space
    }}
  >
    <IconButton>
      <SearchIcon sx={{ color: "#00A6B7" }} />
    </IconButton>
    <TextField
      variant="standard"
      placeholder="Tìm kiếm sản phẩm ..."
      sx={{
        flex: 1,
        fontSize: "14px",
        color: "black",
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiInputBase-root": { borderBottom: "none !important" },
        "& .MuiInput-root:before, & .MuiInput-root:after": {
          display: "none",
        },
      }}
    />
  </Box>

  {/* Buttons section */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      marginTop: { xs: "10px", sm: "0" },
      gap: "20px",
    }}
  >
    {user && (
      <>
        <Button
          variant="text"
          startIcon={<LocalShippingIcon sx={{ color: "white" }} />}
          onClick={() => router.push("/user/order-history")}
          sx={{
            color: "white !important",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Kiểm tra đơn hàng
        </Button>
      </>
    )}
    {user ? (
      <>
        <Button
          variant="text"
          onClick={() => router.push("/user/cart")}
          startIcon={
            <Badge badgeContent={cartQuantity} color="error" overlap="rectangular">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          }
          sx={{
            color: "white !important",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Giỏ hàng
        </Button>
        <Button
          onClick={handleLogout}
          sx={{
            color: "white !important",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            marginRight: "20px",
          }}
        >
          <ExitToAppIcon sx={{ color: "white" }} />
          Đăng xuất
        </Button>
      </>
    ) : (
      <Button
        variant="text"
        onClick={() => router.push("/auth/custom/sign-in")}
        startIcon={<PersonIcon sx={{ color: "#00A6B7" }} />}
        sx={{
          color: "white !important",
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "16px",
          marginRight: "20px",
        }}
      >
        Đăng nhập
      </Button>
    )}
  </Box>
</Toolbar>

  <CategoryMenu selectedTab={selectedTab} handleTabChange={handleTabChange} />
</AppBar>

  );
}
