'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Link, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function PrivacyPage() {
    const title = 'CHÍNH SÁCH KHIẾU NẠI VÀ XỬ LÝ KHIẾU NẠI';
    const content = (
        <>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Mục đích ban hành
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Chính sách khiếu nại và xử lý khiếu nại được ban hành nhằm đảm bảo quyền lợi của Người Dùng bằng cách
                cho phép gửi yêu cầu khiếu nại trong một khoảng thời gian nhất định sau khi nhận hàng thành công.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Các trường hợp áp dụng
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Đối với Bên mua:
                <br />– Đã thanh toán nhưng không nhận được hàng
                <br />– Hàng hóa bị lỗi hoặc hư hại trong quá trình vận chuyển
                <br />– Hàng hóa nhận được không đúng với hình ảnh và mô tả sản phẩm
                <br />– Hàng hóa nhận được sai với yêu cầu đặt hàng (về màu sắc, kích thước, …)
                <br />
                Đối với Nhà cung cấp:
                <br />– Hàng hóa trả về bị lỗi hoặc hư hại trong quá trình vận chuyển
                <br />– Hàng hóa trả về không giống như ban đầu
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Nguyên tắc xử lý khiếu nại
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Khi phát sinh khiếu nại từ Người Dùng (“Bên Khiếu Nại”), Asizon.vn có trách nhiệm tiếp nhận thông tin và
                thông báo cho Người Dùng còn lại (“Bên Bị Khiếu Nại”). Người Dùng chủ động hợp tác trao đổi để tìm ra
                hướng xử lý khiếu nại phù hợp. Trong trường hợp đàm phán thất bại, Asizon.vn sẽ đưa ra phán quyết cuối
                cùng.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Các quy trình xử lý khiếu nại
            </Typography>
            <Typography variant="h7" sx={{ marginTop: 2 }}>
                Quy trình Trả hàng/Hoàn tiền
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Bước 1: Sau khi nhận hàng thành công, Bên mua có quyền kiểm tra hàng và gửi khiếu nại cho Asizon.vn
                trong tối đa 48h (trừ 7, chủ nhật) với một trong hai hình thức sau:
                <br />– Trả hàng toàn bộ/Hoàn tiền
                <br />– Trả hàng một phần/Hoàn tiền
                <br />
                Bước 2: Asizon.vn tiếp nhận khiếu nại của Bên mua và gửi thông báo cho Nhà cung cấp. Nhà cung cấp có tối
                đa 24h (trừ thứ 7, chủ nhật) để lựa chọn Chấp nhận (1) hoặc Không chấp nhận (2) yêu cầu của Bên mua.
                <br />
                Bước 3: Nếu Nhà cung cấp chọn (1), Bên mua cần đóng gói hàng hóa và xác nhận (với Asizon.vn) việc đã gửi
                hàng cho Đơn vị vận chuyển trong tối đa 24h (trừ thứ 7, chủ nhật). Nếu Nhà cung cấp chọn (2), Asizon.vn
                sẽ đưa ra phán quyết cuối cùng.
            </Typography>
            <Typography variant="h7" sx={{ marginTop: 2 }}>
                Quy trình khiếu nại hàng hoàn trả
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Bước 1: Sau khi nhận hàng hoàn trả thành công, Nhà cung cấp có tối đa 24h (trừ thứ 7, chủ nhật) để xác
                nhận việc Nhận hàng thành công và không có khiếu nại (1) hoặc Gửi khiếu nại (2).
                <br />
                Bước 2: Asizon.vn tiếp nhận khiếu nại của Nhà cung cấp và gửi thông báo cho Bên mua. Bên mua có tối đa
                24h (trừ thứ 7, chủ nhật) để lựa chọn Chấp nhận (1) hoặc Không chấp nhận (2) yêu cầu của Nhà cung cấp.
                <br />
                Bước 3: Nếu Bên mua chọn (1), Nhà cung cấp cần đóng gói hàng hóa và xác nhận (với Asizon.vn) việc đã gửi
                hàng cho Đơn vị vận chuyển trong tối đa 24h (trừ thứ 7, chủ nhật). Nếu Bên mua chọn (2), Asizon.vn sẽ
                đưa ra phán quyết cuối cùng.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Mọi vấn đề liên quan cần được hỗ trợ vui lòng liên hệ:
                <br />
                Email:{' '}
                <Link color="#008489" href="mailto:support@asizon.vn">
                    support@asizon.vn
                </Link>
                <br />
                Tổng đài:{' '}
                <Link color="#008489" href="tel:19006074">
                    19006074
                </Link>
                <br />
                Địa chỉ văn phòng: 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
            </Typography>
        </>
    );
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        handleResize(); // Gọi khi component mount

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize); // Dọn dẹp khi component unmount
    }, []);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    React.useEffect(() => {
        // Điều chỉnh overflow của body khi sidebar mở ở mobile
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [drawerOpen]);
    return (
        <Box sx={{ paddingTop: 2 }}>
            <Grid container spacing={3}>
                <Grid item size={{ xs: 12, md: 3 }}>
                    <Drawer
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="temporary"
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                    >
                        <PolicySidebar />
                    </Drawer>
                    <IconButton
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            position: 'absolute',
                            top: 292,
                            left: 10,
                            zIndex: 999,
                        }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Sidebar cho desktop luôn hiển thị */}
                    <Drawer
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: '100%',
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                overflowY: 'auto',
                                backgroundColor: 'transparent',
                                position: 'relative',
                                marginBottom: 2,
                                border: 'none',
                                boxShadow: 'none',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                        open={drawerOpen}
                    >
                        <PolicySidebar />
                    </Drawer>
                </Grid>

                <Grid item size={{ xs: 12, md: 9 }}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography
                                variant="h6"
                                sx={{
                                  color:'#1a1a1a!important',
                                    fontWeight: 'bold',
                                    position: 'absolute',
                                    whiteSpace: 'nowrap',
                                    marginBottom: 2,
                                    top: { xs: 300, md: 'unset' },
                                    left: '55%',
                                    textAlign: 'center',
                                    transform: 'translateX(-50%)',
                                    fontSize: { xs: '1rem', sm: '1rem', md: '1.4rem' },
                                    overflowY: 'auto',
                                    overflow: 'hidden',
                                    lineHeight: 2,
                                }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <PolicyContent sx={{ marginTop: 4 }} content={content} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PrivacyPage;
