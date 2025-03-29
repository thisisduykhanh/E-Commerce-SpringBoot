'use client';
import * as React from 'react';
import { Box, Link, List, ListItem, Typography } from '@mui/material';

function PolicySidebar() {
    const policies = React.useMemo(
        () => [
            { title: 'Giới thiệu', slug: '/AboutMe' },
            { title: 'Chế Tài Và Hướng Xử Lý Bên Mua', slug: '/policy/sanctionsBuyers' },
            { title: 'Chế Tài Và Hướng Xử Lý Bên Nhà Cung Cấp', slug: '/policy/sanctionsSeller' },
            { title: 'Thoả Thuận Về Điều Kiện Làm Việc Và Chính Sách Chống Lao Động Cưỡng Bức', slug: '/policy/agreement' },
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '0.8rem', md: '1.1rem' } ,paddingLeft:'16px',
                    paddingRight:'16px'}}>
                DANH MỤC HỢP TÁC
            </Typography>
            <List sx={{ marginTop: 2, color: '#1a1a1a' }}>
                {policies.map(({ title, slug }) => (
                    <ListItem key={slug}>
                        <Link
                            href={`/user/${slug}`}
                            sx={{
                                color: '#1a1a1a',
                                fontSize: { xs: '0.8rem', sm: '1rem', md: '1rem' },
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
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
