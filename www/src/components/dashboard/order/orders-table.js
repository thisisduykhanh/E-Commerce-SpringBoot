"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Clock as ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";
import RouterLink from "next/link";
import * as React from "react";

import { DataTable } from "@/components/core/data-table";
import { dayjs } from "@/lib/dayjs";
import { paths } from "@/paths";

import { useOrdersSelection } from "./orders-selection-context";

const columns = [
  {
    formatter: (row) => (
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            bgcolor: "var(--mui-palette-background-level1)",
            borderRadius: 1.5,
            flex: "0 0 auto",
            p: "4px 8px",
            textAlign: "center",
          }}
        >
          <Typography variant="caption">
            {dayjs(row.createDate).format("MMM").toUpperCase()}
          </Typography>
          <Typography variant="h6">
            {dayjs(row.createDate).format("D")}
          </Typography>
        </Box>
        <div>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.supplier.orders.preview(row.id)}
            sx={{ cursor: "pointer" }}
            variant="subtitle2"
          >
            # {row.id}
          </Link>
          <Typography color="text.secondary" variant="body2">
            {row.quantity} products •{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "vnd",
              }).format(row.totalPrice)}
            </Box>
          </Typography>
        </div>
      </Stack>
    ),
    name: "Order",
    width: "300px",
  },
  {
    formatter: (row) => {
      const mapping = {
        "Bank Transfer": {
          name: "bank transfer",
          logo: "/assets/payment-method-2.png",
          color: "success",
        },
        "Credit Card": { name: "Credit", logo: "/assets/payment-method-3.png", color: "success" },
        "E-Wallet": { name: 'EWallet', logo: '/assets/payment-method-1.png' },
        // amex: { name: 'American Express', logo: '/assets/payment-method-3.png' },
        // applepay: { name: 'Apple Pay', logo: '/assets/payment-method-4.png' },
        // googlepay: { name: 'Google Pay', logo: '/assets/payment-method-5.png' },
      };
      const { name, logo, color } =
        mapping[row.paymentMethod] ??
        (row.orderStatus.id === 1
          ? { name: "chưa thanh toán", logo: null, color: "warning" }
          : row.orderStatus.id === 2
          ? { name: "Unknown", logo: null, color: "primary" }
          : { name: "Đã hủy", logo: null, color: "error" });

      return (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          {logo ? (
            <Avatar
              sx={{
                bgcolor: "var(--mui-palette-background-paper)",
                boxShadow: "var(--mui-shadows-8)",
              }}
            >
              <Box
                component="img"
                src={logo}
                sx={{ borderRadius: "50px", height: "auto", width: "35px" }}
              />
            </Avatar>
          ) : null}
          <div style={{ textAlign: "center" }}>
            <Typography sx={{ color: `${color}.main` }} variant="body2">{name}</Typography>
          </div>
        </Stack>
      );
    },
    name: "Payment Method",
    width: "300px",
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="body2">
          <Box component="span" sx={{ whiteSpace: "nowrap" }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "vnd",
            }).format(row.totalPrice)}
          </Box>
        </Typography>
      </Stack>
    ),
    name: "Total",
    width: "150px",
  },
  // TODO: fix this one
  {
    formatter: (row) => {
      const mapping = {
        PENDING: {
          label: "Pending",
          icon: (
            <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" />
          ),
        },
        PAID: {
          label: "Completed",
          icon: (
            <CheckCircleIcon
              color="var(--mui-palette-success-main)"
              weight="fill"
            />
          ),
        },
        CANCELLED: {
          label: "Canceled",
          icon: (
            <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" />
          ),
        },
      };
      const { label, icon } = mapping[row.orderStatus.name] ?? {
        label: "Unknown",
        icon: null,
      };

      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: "Status",
    width: "100px",
  },
  {
    formatter: (row) => (
      <IconButton
        component={RouterLink}
        href={paths.dashboard.orders.preview(row.id)}
      >
        <EyeIcon />
      </IconButton>
    ),
    name: "Actions",
    hideName: true,
    width: "100px",
    align: "right",
  },
];

export function OrdersTable({ rows }) {
  const { selected, deselectAll, deselectOne, selectAll, selectOne } =
    useOrdersSelection();

  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        onDeselectAll={deselectAll}
        onDeselectOne={(_, row) => {
          deselectOne(row.id);
        }}
        onSelectAll={selectAll}
        onSelectOne={(_, row) => {
          selectOne(row.id);
        }}
        rows={rows}
        selectable
        selected={selected}
      />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center" }}
            variant="body2"
          >
            No orders found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
