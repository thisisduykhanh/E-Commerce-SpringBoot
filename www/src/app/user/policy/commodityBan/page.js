'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/SideBarSell/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Link, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function CommodityBan() {
    const title = 'QUY ĐỊNH VỀ HÀNG HOÁ CẤM BÁN';
    const content = (
        <>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Bằng việc sử dụng dịch vụ trên Trang Asizon.vn, Bạn thừa nhận và đồng ý với các điều kiện, quy định, yêu cầu dưới đây:
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                1. HÀNG HÓA CẤM BÁN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Asizon.vn không chấp nhận các loại hàng hóa sau đây và sẽ áp dụng các biện pháp xử lý tương ứng nếu phát hiện:
            </Typography>
            <ul>
                <li>Hàng hóa vi phạm pháp luật</li>
                <li>Hàng hóa giả mạo, không rõ nguồn gốc</li>
                <li>Hàng hóa gây hại cho sức khỏe và an toàn của người tiêu dùng</li>
                <li>Hàng hóa vi phạm quyền sở hữu trí tuệ</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                2. HÀNG HÓA BỊ GIỚI HẠN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Asizon.vn chỉ chấp nhận các loại hàng hóa sau đây khi có đầy đủ giấy tờ chứng minh nguồn gốc và chất lượng:
            </Typography>
            <ul>
                <li>Thực phẩm chức năng</li>
                <li>Thuốc và dược phẩm</li>
                <li>Hàng hóa có chứa chất cấm</li>
                <li>Hàng hóa có yêu cầu bảo quản đặc biệt</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                3. QUY TRÌNH XỬ LÝ VI PHẠM
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Khi phát hiện hành vi vi phạm, Asizon.vn sẽ tiến hành các bước sau:
            </Typography>
            <ul>
                <li>Thu thập bằng chứng và thông tin liên quan</li>
                <li>Thông báo cho người vi phạm về hành vi vi phạm và hình thức xử lý</li>
                <li>Thực hiện các biện pháp xử lý theo quy định</li>
                <li>Theo dõi và đánh giá hiệu quả của biện pháp xử lý</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                4. QUYỀN VÀ TRÁCH NHIỆM CỦA NGƯỜI BÁN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Người bán có quyền và trách nhiệm sau:
            </Typography>
            <ul>
                <li>Tuân thủ các quy định của Asizon.vn</li>
                <li>Đảm bảo chất lượng và nguồn gốc hàng hóa</li>
                <li>Không thực hiện các hành vi gian lận hoặc lừa đảo</li>
                <li>Bảo mật thông tin cá nhân và thông tin giao dịch</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                5. LIÊN HỆ VÀ HỖ TRỢ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Nếu có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua các kênh sau:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Email: <Link color='#008489' href="mailto:support@asizon.vn">support@asizon.vn</Link>
                <br />
                Tổng đài: <Link color='#008489' href="tel:19006074">19006074</Link>
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
                                    fontSize: { xs: '1.1rem', sm: '1.1rem', md: '1.95rem' },
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

export default CommodityBan;
