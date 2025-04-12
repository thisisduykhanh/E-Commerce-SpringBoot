"use client";

import { logger } from "@/lib/default-logger";
import "@/styles/global.css";
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
  Badge
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { getUser } from "../../../services/auth";
import CategoryMenu from "../Menu/CategoryMenu";

export default function Header() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [user, setUser] = React.useState(null);

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
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    window.location.reload();
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
          padding: 0,
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "40px",
          boxSizing: "border-box",
          flexWrap: "wrap",
          position: "static",
          paddingX: "0 !important",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            padding: "0",
            fontSize: "14px",
            color: "#666666",
            flex: "1 1 auto",
            textAlign: { xs: "center", sm: "left" },
            // .mui-2a8nxr-Toolbar-root: { padding: '0' },
            paddingX: "0",
          }}
        >
          Chào mừng đến với Thế giới của tôi
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-end" },
            width: "auto",
          }}
        >
         
          <Button
            variant="text"
            startIcon={<LocalShippingIcon sx={{ color: "#00A6B7" }} />}
            component={Link}
            href="/user/order-history"
            sx={{
              color: "#666666 !important",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Kiểm tra đơn hàng
          </Button>
          <Divider
            orientation="vertical"
            flexItem={true}
            sx={{ borderColor: "#666666", margin: "0 10px", opacity: 0.5 }}
          />
          <Typography
            sx={{
              color: "#666666",
              cursor: "pointer",
              textDecoration: "none",
              textAlign: { xs: "center", sm: "left" },
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 400"
              width="20"
              height="20"
            >
              <rect width="600" height="400" fill="#D72B28" />
              <polygon
                points="300,60 335,150 425,150 355,200 375,290 300,240 225,290 245,200 175,150 265,150"
                fill="#FFD700"
              />
            </svg>
            Việt Nam
          </Typography>
        </Box>
      </Toolbar>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: "#FFF",
          minHeight: "60px",
          flexWrap: "wrap",
          paddingX: "0 !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Link href="/user">
            <img
              src="/img/image/logo/1.png"
              alt="Logo"
              style={{ height: "60px", width: "auto", cursor: "pointer" }}
            />
          </Link>
        </Box>
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
          }}
        >
          <IconButton>
            <SearchIcon sx={{ color: "#00A6B7" }} />
          </IconButton>
          <TextField
            variant="standard"
            placeholder="Search..."
            sx={{
              flex: 1,
              fontSize: "14px",
              color: "black", // Đặt màu chữ thành đen
              "& .MuiInputBase-input": { color: "black" }, // Đảm bảo màu chữ bên trong input là đen
              "& .MuiInputBase-root": { borderBottom: "none !important" },
              "& .MuiInput-root:before, & .MuiInput-root:after": {
                display: "none",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            marginTop: { xs: "10px", sm: "0" },
          }}
        >
          {user ? (
            <>
              <Button
                variant="text"
                href="/user/cart"
                startIcon={
                  <Badge badgeContent={3} color="error" overlap="rectangular">
                    <ShoppingCartIcon sx={{ color: "#00A6B7" }} />
                  </Badge>
                }
                sx={{
                  color: "#666666 !important",
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
                  color: "#666666",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                <ExitToAppIcon sx={{ color: "#00A6B7" }} />
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button
              variant="text"
              href="/auth/custom/sign-in"
              startIcon={<PersonIcon sx={{ color: "#00A6B7" }} />}
              sx={{
                color: "#666666 !important",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
      <CategoryMenu
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />
    </AppBar>
  );
}
