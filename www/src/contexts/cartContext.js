"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCart } from "@/services/cart";
import { logger } from "@/lib/default-logger";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartQuantity, setCartQuantity] = useState(0);

  const fetchCartQuantity = async () => {
    try {
      const response = await fetchCart();
      if (response.success && response.data) {
        const totalItems = response.data.cartSupplierDTOs
          ?.flatMap((supplier) => supplier.cartDetailDTOs)
          ?.reduce((sum, item) => sum + item.quantity, 0);
        setCartQuantity(totalItems || 0);
        logger.debug("Cập nhật giỏ hàng:", totalItems);
      }
    } catch (error) {
      logger.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCartQuantity();
  }, []);

  return (
    <CartContext.Provider value={{ cartQuantity, fetchCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
