'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { About } from '@/components/user/social/about';
import { PostAdd } from '@/components/user/social/post-add';
import { PostCard } from '@/components/user/social/post-card';
import { dayjs } from '@/lib/dayjs';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import * as React from 'react';

const posts = [
    {
        id: 'POST-003',
        author: {
            name: 'Sofia Rivers',
            avatar: 'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg',
        },
        content:
            'Chào! Công ty chúng tôi luôn muốn biết ý kiến của bạn trong việc cung cấp các sản phẩm nông sản sạch và tươi ngon cho gia đình bạn?',
        comments: [
            {
                id: 'MSG-003',
                content:
                    'Tôi ưu tiên an toàn thực phẩm và chất lượng tươi ngon nhất. Gia đình tôi rất chú trọng vào việc mua rau sạch không hóa chất, và sản phẩm của công ty luôn làm tôi yên tâm!',
                author: { name: 'Lin Lin', avatar: '/assets/avatar-7.png' },
                createdAt: dayjs().subtract(4, 'minute').toDate(),
            },
        ],
        createdAt: dayjs().subtract(16, 'minute').toDate(),
        isLiked: true,
        likes: 1,
    },
    {
        id: 'POST-001',
        author: {
            name: 'Sofia Rivers',
            avatar: 'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg',
        },
        content: 'Giữ tập trung vào mục tiêu là chìa khóa thành công',
        media: '/assets/image-business-2.png',
        comments: [
            {
                id: 'MSG-001',
                content: 'Tôi đồng ý, rất dễ bị lạc trong các chi tiết',
                author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
                createdAt: dayjs().subtract(1, 'hour').toDate(),
            },
            {
                id: 'MSG-002',
                content: 'Chắc chắn rồi!',
                author: { name: 'Penjani Inyene', avatar: '/assets/avatar-4.png' },
                createdAt: dayjs().subtract(2, 'hour').toDate(),
            },
        ],
        createdAt: dayjs().subtract(4, 'hour').toDate(),
        isLiked: false,
        likes: 4,
    },
];

export default function Page({ params }) {
    const [supplier, setSupplier] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const id = params?.id || 1;

    React.useEffect(() => {
        const fetchSupplierData = async () => {
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

        fetchSupplierData();
    }, [id]);

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
        <div>
            <Grid container spacing={4}>
                <Grid
                    size={{
                        lg: 4,
                        xs: 12,
                    }}
                >
                    <Stack spacing={4}>
                        <Card sx={{ backgroundColor: '#fff', color: '#1a1a1a' ,}}>
                            <CardHeader sx={{ color: '#008D91',fontSize:18,padding:2 }} title="Tiến trình hồ sơ" />
                            <CardContent>
                                <Stack spacing={2}>
                                    <LinearProgress
                                        sx={{
                                            backgroundColor: 'white',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#006F75',
                                            },
                                        }}
                                        value={90}
                                        variant="determinate"
                                    />
                                    <Typography color="#1a1a1a" variant="subtitle2">
                                        90% thiết lập hoàn tất
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                        <About sx={{padding:2}} supplier={supplier} />
                    </Stack>
                </Grid>
                <Grid
                    size={{
                        lg: 8,
                        xs: 12,
                    }}
                >
                    <Stack spacing={4}>
                        <PostAdd />
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} supplier={supplier} />
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
