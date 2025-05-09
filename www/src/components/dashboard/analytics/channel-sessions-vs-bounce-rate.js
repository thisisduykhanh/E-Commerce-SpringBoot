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
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { ShareNetwork as ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr/ShareNetwork';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';
import { getOrderSupply } from '@/services/order';

const bars = [
  { name: 'Doanh thu', dataKey: 'revenue', color: 'var(--mui-palette-primary-100)' },
];

export function ProductsPurchasedByCategory() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const chartHeight = 300;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách đơn hàng
        const orderResponse = await getOrderSupply();
        const orders = orderResponse.data || [];
        console.log('Orders:', orders);

        // Tính toán số lượng sản phẩm và doanh thu theo nhà cung cấp
        const supplierMap = {};
        orders.forEach((order) => {
          const supplierName = order.supplier?.nameSupply || 'Không xác định';
          if (!supplierMap[supplierName]) {
            supplierMap[supplierName] = { count: 0, revenue: 0 };
          }
          supplierMap[supplierName].count += order.quantity || 0;
          supplierMap[supplierName].revenue += order.totalPrice || 0;
        });

        // Chuyển thành mảng cho biểu đồ
        const chartData = Object.keys(supplierMap).map((name) => ({
          name,
          count: supplierMap[name].count,
          revenue: supplierMap[name].revenue,
        }));

        console.log('Chart Data:', chartData);
        setData(chartData);
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
            <ShareNetworkIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Doanh thu theo nhà cung cấp"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={12} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                <YAxis axisLine={false} hide type="number" />
                {bars.map((bar) => (
                  <Bar
                    animationDuration={300}
                    barSize={24}
                    dataKey={bar.dataKey}
                    fill={bar.color}
                    key={bar.name}
                    name={bar.name}
                    radius={[5, 5, 0, 0]}
                  />
                ))}
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

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      {bars.map((bar) => (
        <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))}
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
              {entry.name === 'Doanh thu'
                ? `${new Intl.NumberFormat('vi-VN').format(entry.value)} ₫`
                : new Intl.NumberFormat('vi-VN').format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}