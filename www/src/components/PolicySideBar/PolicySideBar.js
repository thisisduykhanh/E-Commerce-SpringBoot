'use client';

import { Box, Link, List, ListItem, Typography } from '@mui/material';
import * as React from 'react';

function PolicySidebar() {
    const policies = React.useMemo(
        () => [
            { title: 'Chính sách vận chuyển', slug: '/policy/ShippingPolicy' },
            { title: 'Chính sách thanh toán', slug: '/policy/PaymentPolicy' },
            { title: 'Chính sách bảo mật', slug: '/policy/PrivacyPolicy' },
            { title: 'Chính sách đổi - trả - yêu cầu bồi thường', slug: '/policy/CompensationPolicy' },
            { title: 'Chính sách khiếu nại và xử lý khiếu nại', slug: '/policy/complaintPolicy' },
            { title: 'Chính sách chung và điều kiện mua bán sản phẩm', slug: '/policy/generalPolicy' },

        ],
        []
    );

    return (
        <Box
            sx={{
                paddingTop: 2,
                borderRight: '1px solid #fff',
                color: '#00A6B7',
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            }}
        >
            <Typography
                variant="h6"
                sx={{

                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1.1rem' },
                    textAlign: 'left',
                    paddingLeft:'16px',
                    paddingRight:'16px'
                }}
            >
                DANH MỤC CHÍNH SÁCH
            </Typography>
            <List sx={{ marginTop: 2, color: '#1a1a1a' }}>
                {policies.map(({ title, slug }) => (
                    <ListItem key={slug}>
                        <Link
                            href={`/user/${slug}`}
                            sx={{
                                color: '#1a1a1a ',
                                fontSize: { xs: '0.8rem', sm: '1rem', md: '1rem' },
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                textAlign: 'left',
                                display: 'block',
                            }}
                        >
                            {title}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default PolicySidebar;
