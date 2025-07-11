'use client';

import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';
import { getOrderSupply } from '@/services/order';
import { getUsers } from '@/services/users';

// Dữ liệu trạng thái đơn hàng
const orderStatuses = [
  { id: 1, name: 'Đã xác nhận', color: 'var(--mui-palette-success-main)' },
  { id: 2, name: 'Hoàn thành', color: 'var(--mui-palette-warning-main)' },
  { id: 3, name: 'Chờ', color: 'var(--mui-palette-primary-main)' },
];

export default function OrderDashboard() {
  const [data, setData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState(null);
  const chartHeight = 300;

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Lấy danh sách khách hàng
        const customerResponse = await getUsers(0, 1000);
        const customers = customerResponse.data.content || [];
        setTotalCustomers(customers.length);

        // Lấy danh sách đơn hàng
        const orderResponse = await getOrderSupply();
        const orders = orderResponse.data || [];

        setTotalOrders(orders.length);

        // Tính toán số lượng đơn hàng theo trạng thái
        const orderStatusCounts = orderStatuses.map((status) => ({
          name: status.name,
          count: orders.filter((order) => order.orderStatus?.id === status.id).length,
        }));

        setData(orderStatusCounts);
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
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ChartPieIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Bảng điều khiển đơn hàng "
        subheader={
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2">Tổng số khách hàng: {totalCustomers}</Typography>
            <Typography variant="body2">Tổng số đơn hàng: {totalOrders}</Typography>
          </Stack>
        }
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart
                barGap={10}
                data={data}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 100 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="2 4" syncWithTicks />
                <XAxis axisLine={false} tickLine={false} type="number" />
                <YAxis
                  axisLine={false}
                  dataKey="name"
                  tick={<Tick />}
                  tickLine={false}
                  type="category"
                />
                <Bar
                  animationDuration={300}
                  barSize={12}
                  dataKey="count"
                  fill="var(--mui-palette-primary-main)"
                  radius={[5, 5, 5, 5]}
                  name="Orders"
                />
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          <Legend />
        </Stack>
      </CardContent>
    </Card>
  );
}

function Tick({ height, payload, width, x, y }) {
  const status = orderStatuses.find((s) => s.name === payload?.value) || { name: 'Unknown' };

  return (
    <foreignObject height={width} width={height} x={(x ?? 0) - 150} y={(y ?? 0) - 16}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography noWrap variant="body2">
          {status.name}
        </Typography>
      </Stack>
    </foreignObject>
  );
}

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box sx={{ bgcolor: 'var(--mui-palette-primary-main)', borderRadius: '2px', height: '4px', width: '16px' }} />
        <Typography color="text.secondary" variant="caption">
          Orders
        </Typography>
      </Stack>
    </Stack>
  );
}

function TooltipContent({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload.map((entry) => (
          <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat('vi-VN').format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}