'use client';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'; // Add this import
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ChatText as ChatTextIcon } from '@phosphor-icons/react/dist/ssr/ChatText';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { UserPlus as UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';
import axios from 'axios';
import * as React from 'react';

import { ProfileTabs } from '@/components/user/social/profile-tabs';

export default function Layout({ children, params }) {
    const { id } = params;

    const [supplier, setSupplier] = React.useState(null);
    const [_product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
    }, []);

    React.useEffect(() => {
        if (!isMounted || !id) return;

        const fetchSupplier = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8085/api/v1/supplier?id=${id}&minPrice=0`);
                if (response.data && response.data.success) {
                    setSupplier(response.data.data);
                } else {
                    setError('Không tìm thấy dữ liệu nhà cung cấp.');
                }
            } catch (err) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplier();
    }, [isMounted, id]);

    React.useEffect(() => {
        if (!isMounted || !id) return;

        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:8085/api/v1/products?supplierId=${id}&isProduct=true&minPrice=0`
                );
                if (response.data && response.data.success) {
                    setProduct(response.data.data.content || []);
                } else {
                    setError('Không tìm thấy dữ liệu nhà cung cấp.');
                }
            } catch (err) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [isMounted, id]);

    if (!isMounted) {
        return null;
    }

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', padding: 4 }} />;
    }

    if (error) {
        return <Typography color="error" sx={{ textAlign: 'center' }}>{`Lỗi: ${error}`}</Typography>;
    }

    if (!supplier) {
        return <Typography sx={{ textAlign: 'center' }}>Không có dữ liệu nhà cung cấp.</Typography>;
    }
    return (
        <Box
            sx={{
                maxWidth: 'var(--Content-maxWidth)',
                m: 'var(--Content-margin)',
                p: 'var(--Content-padding)',
                width: 'var(--Content-width)',
                backgroundColor: 'white',
                color: 'black',
            }}
        >
            <Stack spacing={4}>
                <Stack spacing={4}>
                    <Box
                        sx={{
                            backgroundImage: 'url(/assets/anhbia.jpg)',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            borderRadius: 1,
                            height: '348px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                alignItems: 'flex-end',
                                bottom: 0,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                left: 0,
                                opacity: 0,
                                p: 3,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                '&:hover': { opacity: '100%' },
                            }}
                        >
                            <Button color="secondary" startIcon={<ImageIcon />} variant="contained">
                                Thay đổi hình nền
                            </Button>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar src={supplier.image || '/assets/avatar.png'} sx={{ '--Avatar-size': '64px' }} />
                            <div>
                                <Typography variant="h6">
                                    {supplier.nameSupply || 'Nhà cung cấp'}
                                    {supplier.status ? (
                                        <CheckCircleIcon sx={{ fontSize: 20, color: '#008D91', marginLeft: 1 }} />
                                    ) : null}
                                </Typography>
                                <Typography color="text.secondary" variant="h7">
                                    {supplier.followers || 'Chưa có'} người theo dõi
                                </Typography>
                            </div>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ alignItems: 'center', display: { md: 'flex', xs: 'none' } }}
                            >
                                <Button
                                    sx={{
                                        background: '#008D91',
                                        color: 'white',
                                        '&:hover': {
                                            background: '#006F75',
                                        },
                                    }}
                                    size="small"
                                    startIcon={<UserPlusIcon />}
                                >
                                    Kết nối
                                </Button>
                                <Button
                                    sx={{
                                        background: '#008D91',
                                        color: 'white',
                                        '&:hover': {
                                            background: '#006F75',
                                        },
                                    }}
                                    size="small"
                                    startIcon={<ChatTextIcon />}
                                    variant="contained"
                                >
                                    Nhắn tin
                                </Button>
                            </Stack>
                            <Tooltip title="More options">
                                <IconButton>
                                    <DotsThreeIcon weight="bold" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    <ProfileTabs />
                    {children}
                </Stack>
            </Stack>
        </Box>
    );
}
