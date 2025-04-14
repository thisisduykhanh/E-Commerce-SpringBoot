'use client';
import * as React from 'react';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import MenuIcon from '@mui/icons-material/Menu';

function PrivacyPage() {
    const title = 'CHÍNH SÁCH BẢO MẬT';
    const content = (
        <>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Asizon.vn rất trân trọng sự tin tưởng của quý khách và cam kết những thông tin cá nhân sẽ được chúng tôi
                nỗ lực tối đa để bảo mật.
                <br />
                Asizon.vn đảm bảo sẽ sử dụng thông tin khách hàng một cách hợp lý, có cân nhắc để không ngừng cải thiện
                chất lượng dịch vụ và đem lại cho quý khách hàng những trải nghiệm thú vị khi sử dụng dịch vụ
            </Typography>

            {/* Các mục chính sách */}
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                1. THU THẬP THÔNG TIN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Để sử dụng được các dịch vụ của Asizon.vn, quý khách hàng phải đăng ký tài khoản và cung cấp một số
                thông tin bao gồm nhưng không giới hạn: email, họ tên, số điện thoại, ngày sinh và địa chỉ và một số
                thông tin khác. Phần thủ tục đăng ký này nhằm giúp chúng tôi xác định thông tin chính xác để liên lạc và
                hiển thị các thông tin phù hợp đến quý khách hàng. Bạn có thể chọn không cung cấp cho chúng tôi một số
                thông tin nhất định nhưng điều đó đồng nghĩa với việc bạn không thể trải nghiệm một số tính năng tương
                ứng
                <br />
                <br />
                Chúng tôi cũng lưu trữ bất kỳ thông tin nào bạn nhập trên Website hoặc gửi đến Asizon.vn. Những thông
                tin đó sẽ được sử dụng cho mục đích phản hồi yêu cầu, đưa ra những gợi ý phù hợp trong quá trình sử
                dụng, nâng cao chất lượng dịch vụ và liên hệ trực tuyến
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                2. SỬ DỤNG THÔNG TIN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Mục đích của việc thu thập thông tin là nhằm xây dựng Asizon.vn trở thành một Website Thương mại Điện tử
                mang lại nhiều tiện ích nhất cho khách hàng. Vì thế, việc sử dụng thông tin sẽ phục vụ những hoạt động
                sau:
            </Typography>
            <ul>
                <li>Gửi “newsletter” giới thiệu sản phẩm mới và những chương trình khuyến mãi của Asizon.vn</li>
                <li>Cung cấp một số tiện ích, dịch vụ hỗ trợ khách hàng</li>
                <li>Nâng cao trải nghiệm và chất lượng dịch vụ</li>
                <li>Giải quyết các vấn đề, tranh chấp phát sinh liên quan đến việc sử dụng Website</li>
                <li>Ngăn chặn những hoạt động vi phạm pháp luật Việt Nam</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                3. CHIA SẺ THÔNG TIN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Asizon.vn biết rằng thông tin về khách hàng là một phần rất quan trọng trong việc kinh doanh và chúng sẽ
                không được bán, trao đổi cho một bên thứ ba nào khác. Chúng tôi sẽ không chia sẻ thông tin khách hàng
                trừ những trường hợp sau:
            </Typography>
            <ul>
                <li>
                    Việc đưa những thông tin đó là phù hợp với luật pháp như bảo vệ quyền lợi, tài sản của người sử dụng
                    dịch vụ, của Asizon.vn và các bên thứ ba khác
                </li>
                <li>
                    Theo yêu cầu pháp lý từ một cơ quan chính phủ hoặc khi chúng tôi tin rằng việc làm đó là cần thiết
                    và phù hợp nhằm tuân theo các yêu cầu pháp lý
                </li>
            </ul>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Trong những trường hợp còn lại, chúng tôi sẽ có thông báo cụ thể cho quý khách hàng khi phải tiết lộ
                thông tin cho một bên thứ ba và thông tin này chỉ được cung cấp khi được sự phản hồi đồnG ý từ quý khách
                như:
            </Typography>
            <ul>
                <li>Các chương trình khuyến mãi có sự hợp tác, tài trợ với các đối tác của Asizon.vn</li>
                <li>Cung cấp các thông tin giao nhận cần thiết cho các Đối tác Vận chuyển</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                4. BẢO MẬT THÔNG TIN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Một điều quan trọng đối với khách hàng là việc tự bảo vệ chính mình trước sự tiếp cận thông tin về
                “password” khi bạn dùng chung máy tính với nhiều người. Khi đó, bạn phải chắc chắn đã thoát khỏi tài
                khoản sau khi sử dụng dịch vụ của Asizon.vn.
                <br />
                <br />
                Chúng tôi cũng cam kết không cố ý tiết lộ thông tin khách hàng, không bán hoặc chia sẻ thông tin khách
                hàng của Asizon.vn vì mục đích thương mại, vi phạm những cam kết giữa chúng tôi với quý khách hàng chiếu
                theo chính sách này.
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

export default PrivacyPage;
