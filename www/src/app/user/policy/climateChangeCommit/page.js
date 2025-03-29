'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/SideBarSociety/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function PrivacyPage() {
    const title = 'CAM KẾT CHỐNG BIẾN ĐỔI KHÍ HẬU';
    const content = (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
            (Dành cho các thành viên tham gia sàn thương mại điện tử B2B Asizon)
            <br />
            <br />
            <strong>Lời mời tham gia</strong>
            <br />
            <br />
            Chúng tôi, các thành viên tham gia Sàn thương mại điện tử Asizon, nhận thức được tầm quan trọng của việc bảo
            vệ môi trường và ứng phó với biến đổi khí hậu. Với vai trò là những cá nhân và tổ chức hoạt động trong lĩnh
            vực nông nghiệp nói riêng và thương mại nói chung, chúng tôi cam kết thực hiện các hành động cụ thể để giảm
            thiểu tác động tiêu cực đến môi trường, hướng tới phát triển bền vững.
            <br />
            <br />
            Biến đổi khí hậu có thể được hiểu chung nhất là sự thay đổi của khí hậu toàn cầu do các hoạt động trực tiếp
            hoặc gián tiếp của con người trong quá trình sinh sống và phát triển kinh tế xã hội. Nguyên nhân dẫn đến
            biến đổi khí hậu có phần do khách quan, song hiện nay, các nguyên nhân chủ quan đến từ con người đang ngày
            càng đẩy nhanh sự biến đổi của khí hậu toàn cầu và làm nghiêm trọng hơn các tác động của hiện tượng này.
            Những tác động đó hiện diện ở khắp mọi nơi và ở nhiều lĩnh vực, từ những tác động liên quan đến hệ sinh thái
            tự nhiên (như sự tan băng ở hai cực Trái đất, nóng lên của nhiệt độ Trái đất, mực nước biển dâng cao, sự
            xuất hiện của nhiều hiện tượng thời tiết cực đoan…) đến những tác động đến con người và kinh tế-xã hội (như
            gia tăng sức ép lên vấn đề an ninh lương thực, thiếu hụt nguồn nước, di cư toàn cầu, bất ổn chính trị…).
            Chính vì thế, biến đổi khí hậu đã và đang trở thành một vấn đề toàn cầu bức thiết, gây ra nhiều hậu quả khôn
            lường và nghiêm trọng đối với đời sống và sự phát triển của nhân loại. Trong các khu vực chịu nhiều ảnh
            hưởng nhất của biến đổi khí hậu, khu vực Đông Nam Á có mức độ tổn thương cao nhất do phần lớn dân số và các
            hoạt động kinh tế tập trung quanh các khu vực bờ biển, sống dựa phần lớn vào nông nghiệp, phụ thuộc lớn vào
            các nguồn tài nguyên và rừng, và mức độ nghèo đói vẫn còn cao.
            <br />
            <br />
            Chúng ta - Asizon cùng đối tác, thành viên của mình cần nhận thức rõ tầm quan trọng của hợp tác ứng phó với
            biến đổi khí hậu trong khu vực và trên thế giới và cam kết hành động tập thể để hướng tới một cộng đồng bền
            vững và thịnh vượng.
            <br />
            <br />
            <strong>Cam kết cụ thể của chúng tôi như sau:</strong>
            <br />
            <br />
            1. Sử dụng và sản xuất bền vững:
            <br />
            <br />
            a. Ưu tiên sử dụng nguyên liệu và sản phẩm thân thiện với môi trường.
            <br />
            <br />
            b. Hạn chế sử dụng hóa chất độc hại, khuyến khích sử dụng phân bón hữu cơ và phương pháp canh tác bền vững.
            <br />
            <br />
            2. Giảm thiểu khí thải carbon:
            <br />
            <br />
            a. Sử dụng các phương tiện vận chuyển và công nghệ tiết kiệm năng lượng.
            <br />
            <br />
            b. Áp dụng các biện pháp giảm thiểu khí thải nhà kính trong chuỗi cung ứng và sản xuất.
            <br />
            <br />
            3. Tiết kiệm tài nguyên:
            <br />
            <br />
            a. Tối ưu hóa sử dụng nước trong canh tác và chế biến nông sản.
            <br />
            <br />
            b. Giảm thiểu rác thải bằng cách tái sử dụng và tái chế bao bì, vật liệu nông nghiệp.
            <br />
            <br />
            4. Tăng cường bảo vệ môi trường tự nhiên:
            <br />
            <br />
            a. Góp phần bảo vệ và tái tạo hệ sinh thái nông nghiệp, rừng, và nguồn nước.
            <br />
            <br />
            b. Hỗ trợ các dự án tái trồng rừng và bảo vệ đa dạng sinh học.
            <br />
            <br />
            5. Nâng cao nhận thức:
            <br />
            <br />
            a. Cam kết lan tỏa thông điệp về bảo vệ môi trường và chống biến đổi khí hậu tới khách hàng, đối tác, và
            cộng đồng.
            <br />
            <br />
            b. Hỗ trợ các hoạt động đào tạo và truyền thông liên quan đến nông nghiệp bền vững.
            <br />
            <br />
            <strong>Trách nhiệm chung:</strong>
            <br />
            <br />
            Các thành viên tham gia Sàn thương mại điện tử B2B Asizon cam kết thực hiện các trách nhiệm chung sau đây
            nhằm giảm thiểu tác động của biến đổi khí hậu và xây dựng một nền nông nghiệp bền vững:
            <br />
            <br />• Tuân thủ các tiêu chuẩn môi trường: Đảm bảo mọi hoạt động kinh doanh, sản xuất và giao dịch trên sàn
            Asizon tuân thủ các quy định pháp luật về bảo vệ môi trường và giảm phát thải khí nhà kính.
            <br />
            <br />• Chia sẻ kiến thức và kinh nghiệm: Chủ động trao đổi thông tin, sáng kiến và giải pháp về nông nghiệp
            bền vững, bảo vệ tài nguyên thiên nhiên và giảm thiểu biến đổi khí hậu với các thành viên khác trên sàn.
            <br />
            <br />• Thúc đẩy các sản phẩm thân thiện với môi trường: Ưu tiên kinh doanh và quảng bá các sản phẩm nông
            nghiệp bền vững, hữu cơ và có nguồn gốc rõ ràng, đồng thời khuyến khích người tiêu dùng lựa chọn các sản
            phẩm này.
            <br />
            <br />• Xây dựng chuỗi cung ứng bền vững: Tham gia vào các sáng kiến hoặc chương trình hợp tác trong chuỗi
            cung ứng nhằm giảm thiểu lãng phí tài nguyên, tối ưu hóa việc sử dụng năng lượng và giảm khí thải carbon.
            <br />
            <br />• Bảo vệ hệ sinh thái và tài nguyên thiên nhiên: Thực hiện các biện pháp bảo vệ đất, nước và không
            khí, hạn chế xâm phạm đến các vùng sinh thái nhạy cảm hoặc gây suy thoái tài nguyên thiên nhiên.
            <br />
            <br />• Hợp tác vì lợi ích cộng đồng: Góp phần xây dựng cộng đồng doanh nghiệp nông nghiệp có trách nhiệm xã
            hội cao thông qua các hoạt động bảo vệ môi trường, hỗ trợ tái tạo tài nguyên và chia sẻ lợi ích kinh tế bền
            vững.
            <br />
            <br />• Thực hiện báo cáo và đánh giá: Định kỳ cung cấp báo cáo về các nỗ lực và kết quả thực hiện cam kết
            bảo vệ môi trường, đồng thời phối hợp với Ban quản lý sàn Asizon để theo dõi, đánh giá hiệu quả của các cam
            kết này.
            <br />
            <br />
            Nhận thức rằng bảo vệ môi trường và chống biến đổi khí hậu là trách nhiệm chung, chúng tôi – các thành viên
            của Asizon – cùng đồng lòng và hành động để tạo nên một nền nông nghiệp bền vững, góp phần mang lại giá trị
            dài hạn cho môi trường, cộng đồng và thế hệ tương lai.
            <br />
            <br />
            Bằng việc đăng ký tham gia sàn thương mại điện tử Asizon, bạn và chúng tôi cùng đồng thuận tuân thủ và triển
            khai các cam kết chống biến đổi khí hậu trên trong hoạt động kinh doanh của mình. Chúng tôi tin rằng, cùng
            nhau, chúng ta có thể tạo nên một cộng đồng nông nghiệp bền vững, góp phần giảm thiểu tác động của biến đổi
            khí hậu và xây dựng một tương lai tốt đẹp hơn cho các thế hệ sau.
            <br />
            <br />
            Chúng tôi trân trọng cam kết!
        </Typography>
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
            <Grid container={true} spacing={3}>
                <Grid item={true} size={{ xs: 12, md: 3 }}>
                    <Drawer
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                                boxSizing: 'border-box',
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
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
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                        open={drawerOpen}
                    >
                        <PolicySidebar />
                    </Drawer>
                </Grid>

                <Grid item={true} size={{ xs: 12, md: 9 }}>
                    <Grid container={true} justifyContent="center">
                        <Grid item={true}>
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
                                    fontSize: { xs: '1.1rem', sm: '1.1rem', md: '1.6rem' },
                                    overflowY: 'auto',
                                    overflow: 'hidden',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    lineHeight: 2,
                                }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <PolicyContent
                        sx={{
                            whiteSpace: 'pre-line',
                            wordWrap: 'break-word',
                        }}
                        content={content}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PrivacyPage;
