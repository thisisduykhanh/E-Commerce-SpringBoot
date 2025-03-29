'use client';
import * as React from 'react';
import { Box, Link, List, ListItem, Typography } from '@mui/material';

function PolicySidebar() {
    const policies = React.useMemo(
        () => [
            { title: 'Hướng dẫn mua hàng', slug: '/policy/climateChangeCommit' },
            { title: 'Hướng dẫn bán hàng', slug: '/policy/climateChangeCommit' },
            { title: 'Quy định về hàng hoá cấm bán ', slug: '/policy/commodityBan' },
            { title: 'Điều kiện dịch vụ ASIMONEY - Vay doanh nghiệp', slug: '/policy/asimoney' },


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
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '0.8rem', md: '1.1rem' },paddingLeft:'16px',
                    paddingRight:'16px' }}>
                DANH MỤC BÁN HÀNG
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
