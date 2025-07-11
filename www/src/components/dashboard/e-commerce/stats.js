'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { ReceiptX as ReceiptXIcon } from '@phosphor-icons/react/dist/ssr/ReceiptX';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const lines = [
  { name: 'Doanh thu', dataKey: 'revenue', color: 'var(--mui-palette-primary-main)' },
];

export function Stats({ data, summaryData }) {
  const chartHeight = 320;

  return (
    <Card>
      <CardHeader title="Thống kê doanh thu" />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={
              <Divider
                flexItem
                orientation="vertical"
                sx={{ borderBottomWidth: { xs: '1px', md: 0 } }}
              />
            }
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Summary icon={ChartPieIcon} title="Tổng doanh thu" value={summaryData?.totalRevenue || 0} />
            <Summary icon={CurrencyDollarIcon} title="Doanh thu hôm nay" value={summaryData?.todayRevenue || 0} />
            <Summary icon={ReceiptIcon} title="Số đơn hàng" value={summaryData?.totalOrders || 0} currency={false} />
            <Summary icon={ReceiptXIcon} title="Số đơn hoàn thành" value={summaryData?.completedOrders || 0} currency={false} />
          </Stack>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight} width="100%">
              <LineChart data={data} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" interval={0} tickLine={false} type="category" />
                <YAxis axisLine={false} hide type="number" yAxisId={0} />
                {lines.map((line) => (
                  <Line
                    animationDuration={300}
                    dataKey={line.dataKey}
                    dot={<Dot />}
                    key={line.name}
                    name={line.name}
                    stroke={line.color}
                    strokeWidth={2}
                    type="bump"
                    yAxisId={0}
                  />
                ))}
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </LineChart>
            </ResponsiveContainer>
          </NoSsr>
          <Legend />
        </Stack>
      </CardContent>
    </Card>
  );
}

function Summary({ icon: Icon, title, value, currency = true }) {
  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
      <Avatar
        sx={{
          '--Avatar-size': '54px',
          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
          bgcolor: 'var(--mui-palette-background-paper)',
          boxShadow: 'var(--mui-shadows-8)',
          color: 'var(--mui-palette-text-primary)',
        }}
      >
        <Icon fontSize="var(--Icon-fontSize)" />
      </Avatar>
      <div>
        <Typography color="text.secondary" variant="overline">
          {title}
        </Typography>
        <Typography variant="h5">
          {currency
            ? new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                maximumFractionDigits: 0,
              }).format(value)
            : value}
        </Typography>
      </div>
    </Stack>
  );
}

function Dot({ active, cx, cy, payload, stroke }) {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill={stroke} r={6} />;
  }

  return null;
}

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      {lines.map((line) => (
        <Stack direction="row" key={line.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: line.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {line.name}
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
              <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                maximumFractionDigits: 0,
              }).format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}