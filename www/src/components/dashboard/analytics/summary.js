'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { getOrderSupply } from '@/services/order';
import { getUsers } from '@/services/users';

export function Summary() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [error, setError] = useState(null);

  // Giả định phần trăm thay đổi
  const changeData = {
    revenue: 12,
    customers: 10,
    orders: 8,
    completed: -5,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách người dùng
        const customerResponse = await getUsers(0, 1000);
        const customers = customerResponse.data.content || [];
        console.log('Customers:', customers);
        setTotalCustomers(customers.length);

        // Lấy danh sách đơn hàng
        const orderResponse = await getOrderSupply();
        const orders = orderResponse.data || [];
        console.log('Orders:', orders);

        // Tính toán số liệu
        const totalOrdersCount = orders.length;
        const completedOrdersCount = orders.filter((order) => order.orderStatus?.id === 2).length;
        const totalRevenueAmount = orders
          .filter((order) => order.orderStatus?.id === 2)
          .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

        console.log('Total Orders:', totalOrdersCount);
        console.log('Completed Orders:', completedOrdersCount);
        console.log('Total Revenue:', totalRevenueAmount);

        setTotalOrders(totalOrdersCount);
        setCompletedOrders(completedOrdersCount);
        setTotalRevenue(totalRevenueAmount);
      } catch (error) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          p: 3,
        }}
      >
        {/* Tổng doanh thu */}
        <SummaryItem
          label="Tổng doanh thu"
          value={`${new Intl.NumberFormat('vi-VN').format(totalRevenue)} ₫`}
          change={changeData.revenue}
          isIncrease={changeData.revenue >= 0}
        />

        {/* Số khách hàng */}
        <SummaryItem
          label="Số khách hàng"
          value={totalCustomers}
          change={changeData.customers}
          isIncrease={changeData.customers >= 0}
        />

        {/* Số đơn hàng */}
        <SummaryItem
          label="Tổng đơn hàng"
          value={totalOrders}
          change={changeData.orders}
          isIncrease={changeData.orders >= 0}
        />

        {/* Số đơn hoàn tất */}
        <SummaryItem
          label="Đơn hoàn tất"
          value={completedOrders}
          change={changeData.completed}
          isIncrease={changeData.completed >= 0}
        />
      </Box>
    </Card>
  );
}

function SummaryItem({ label, value, change, isIncrease }) {
  const formattedChange = new Intl.NumberFormat('vi-VN', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(Math.abs(change) / 100);

  return (
    <Stack
      spacing={1}
      sx={{
        borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
        borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
        pb: { xs: 2, md: 0 },
      }}
    >
      <Typography color="text.secondary">{label}</Typography>
      <Typography variant="h3">{value}</Typography>
      
    </Stack>
  );
}