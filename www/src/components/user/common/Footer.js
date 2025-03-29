import { fetchCategories } from '@/services/category-service';
import '@/styles/global.css';
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Headset, Package, ShoppingBag, Truck } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';

function Footer() {
    const [categories, setCategories] = React.useState([]);
    const features = [
        {
            icon: (
                <Truck
                    size={55}
                    style={{
                        marginRight: '10px',
                        color: '#00A6B7',
                        backgroundColor: 'rgba(0, 166, 183, 0.1)',
                        borderRadius: '50%',
                        padding: '8px',
                    }}
                />
            ),
            title: 'Vận chuyển',
            description: 'Hỗ trợ vận chuyển tới khách hàng',
        },
        {
            icon: (
                <Headset
                    size={55}
                    style={{
                        marginRight: '10px',
                        color: '#00A6B7',
                        backgroundColor: 'rgba(0, 166, 183, 0.1)',
                        borderRadius: '50%',
                        padding: '8px',
                    }}
                />
            ),
            title: 'Á Đông Center 24/7',
            description: 'Đội ngũ nhân viên chuyên nghiệp',
        },
        {
            icon: (
                <ShoppingBag
                    size={55}
                    style={{
                        marginRight: '10px',
                        color: '#00A6B7',
                        backgroundColor: 'rgba(0, 166, 183, 0.1)',
                        borderRadius: '50%',
                        padding: '8px',
                    }}
                />
            ),
            title: 'Bảo đảm nguồn gốc',
            description: 'Truy xuất được nguồn gốc',
        },
        {
            icon: (
                <Package
                    size={55}
                    style={{
                        marginRight: '10px',
                        color: '#00A6B7',
                        backgroundColor: 'rgba(0, 166, 183, 0.1)',
                        borderRadius: '50%',
                        padding: '8px',
                    }}
                />
            ),
            title: 'Đảm bảo hàng hóa',
            description: 'Chính sách bảo đảm hàng hóa',
        },
    ];
    const fetchCategories2 = React.useCallback(async () => {
        const response = await fetchCategories();
        setCategories(response.data);
    }, []);
    React.useEffect(() => {
        fetchCategories2();
    }, [fetchCategories2]);

    const sections = [
        {
            title: 'Trung tâm hỗ trợ',
            description: [
                <Link
                    key="introduction-link"
                    href="/user/policy/CompensationPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Kiểm Tra Đơn Hàng
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/CompensationPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Kiểm Tra Vận Chuyển
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/A&Q"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    A & Q
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/CompensationPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Hoàn Tiền
                </Link>,
            ],
        },
        {
            title: 'Chính sách',
            description: [
                <Link
                    key="introduction-link"
                    href="/user/policy/ShippingPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chính sách vận chuyển
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/PaymentPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chính sách thanh toán
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/PrivacyPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chính sách bảo mật
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/CompensationPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chính sách đổi - trả - yêu cầu bồi thường
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/CompensationPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chính sách khiếu nại và xử lí khiếu nại
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/generalPolicy"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chính sách chung và điều kiện mua bán sản phẩm
                </Link>,
                 <Link
                    key="introduction-link"
                    href="/user/policy/clause"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Điều khoản dịch vụ
                </Link>,
            ],
        },
        {
            title: 'Hợp tác',
            description: [
                <Link
                    key="introduction-link"
                    href="/user/AboutMe"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Giới thiệu
                </Link>,
                <>
                    <Typography key="asizon-blog" component="span" sx={{ fontWeight: 'bold' }}>
                        ASIZON
                    </Typography>{' '}
                    Blog
                </>,
                <Link
                    key="introduction-link"
                    href="/user/policy/sanctionsBuyers"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chế Tài Và Hướng Xử Lý Bên Mua
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/sanctionsSeller"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Chế Tài Và Hướng Xử Lý Bên Nhà Cung Cấp
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/agreement"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Thoả Thuận Về Điều Kiện Làm Việc Và Chính Sách Chống Lao Động Cưỡng Bức
                </Link>,
            ],
        },
        {
            title: 'Bán hàng',
            description: [
                'Hướng Dẫn Mua Hàng',
                'Hướng Dẫn Bán Hàng',
                <Link
                    key="introduction-link"
                    href="/user/policy/commodityBan"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Quy Định Về Hàng Hoá Cấm Bán
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/asimoney"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Điều khoản và điều kiện ASIMONEY - Vay doanh nghiệp
                </Link>,
            ],
        },
        {
            title: 'Xã hội',
            description: [
                <Link
                    key="introduction-link"
                    href="/user/policy/climateChangeCommit"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Cam kết chống biến đổi khí hậu
                </Link>,
                <Link
                    key="introduction-link"
                    href="/user/policy/communityStandards"
                    passHref={true}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Tiêu chuẩn cộng đồng của hệ sinh thái ASIZON
                </Link>,
            ],
        },
    ];

    const paymentMethods = [
        '/payment/visa.svg',
        '/payment/master-card.svg',
        '/payment/pay-pal.svg',
        '/payment/cash.png',
        '/payment/banking.svg',
    ];

    const appDownloads = ['/app/download.png'];

    const socialIcons = [
        { icon: <Facebook sx={{ color: '#3b5998' }} />, name: 'Facebook' },
        { icon: <Twitter sx={{ color: '#1DA1F2' }} />, name: 'Twitter' },
        { icon: <Instagram sx={{ color: '#E1306C' }} />, name: 'Instagram' },
        { icon: <LinkedIn sx={{ color: '#0077B5' }} />, name: 'LinkedIn' },
        { icon: <YouTube sx={{ color: '#FF0000' }} />, name: 'YouTube' },
    ];

    const callToActionImage = '/img/image/call-to-action.png';

    return (
        <>
            <style>{`
                a {
                    text-decoration: none !important;
                    color: inherit !important;
                }
            `}</style>
            {/* Box chứa các features */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '10px',
                    margin: '20px auto 0px auto',
                    gap: '20px',
                    flexWrap: 'wrap',
                    boxSizing: 'border-box',
                }}
            >
                {features.map((feature) => (
                    <Box
                        key={feature.title}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            flex: '1 1 22%',
                            maxWidth: 'calc(25% - 20px)',
                            marginBottom: '20px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Box>{feature.icon}</Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '12px', color: '#666666' }}>
                                {feature.description}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Box chứa hình ảnh Call To Action */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    marginTop: '0',
                }}
            >
                <Box
                    component="img"
                    src={callToActionImage}
                    alt="Call to Action"
                    sx={{ width: '100%', height: 'auto' }}
                />
            </Box>
            {/* Box chứa thông tin của các tiêu đề */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '8px',
                    margin: '20px auto',
                    // width: '80%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(5, 1fr)',
                        },
                        gap: '20px',
                        width: '100%',
                        // padding: '10px 20px',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Danh sách các phần */}
                    {sections.map((section) => (
                        <Box
                            key={section.title}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px', // Khoảng cách giữa tiêu đề và mô tả
                                padding: '10px 0',
                            }}
                        >
                            {/* Tiêu đề */}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#333333',
                                    textAlign: 'left',
                                }}
                            >
                                {section.title}
                            </Typography>

                            {/* Mô tả */}
                            <Box>
                                {section.description.map((line, index) => (
                                    <Typography
                                        key={index}
                                        variant="body2"
                                        sx={{
                                            fontSize: '14px',
                                            color: '#666666',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {line}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '50px',
                        flexWrap: 'wrap',
                        padding: '0 20px', // Khoảng cách hai bên
                        boxSizing: 'border-box',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flex: '1 1 100%', // Đảm bảo phần tử này chiếm toàn bộ chiều rộng
                            marginBottom: '10px',
                            flexDirection: { xs: 'column', sm: 'row' }, // Cột trên điện thoại, hàng trên màn hình lớn
                            textAlign: { xs: 'center', sm: 'left' }, // Căn giữa trên điện thoại, căn trái trên màn hình lớn
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#00A6B7',
                                marginRight: '10px',
                            }}
                        >
                            ASIZON
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '14px',
                                color: '#666666',
                                textAlign: { xs: 'center', sm: 'left' }, // Căn giữa trên điện thoại, trái trên màn hình lớn
                            }}
                        >
                            &copy; 2024 <span style={{ fontWeight: 'bold' }}>ASIZON. ,</span> All Rights Reserved
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Cột trên điện thoại, hàng trên màn hình lớn
                            gap: '16px',
                            flex: '1 1 100%', // Đảm bảo phần tử này chiếm toàn bộ chiều rộng
                            justifyContent: { xs: 'center', sm: 'flex-end' }, // Căn giữa trên điện thoại, phải trên màn hình lớn
                            flexWrap: 'wrap', // Đảm bảo các phần tử tự động xuống dòng nếu không đủ không gian
                            boxSizing: 'border-box', // Đảm bảo tính toán kích thước đúng
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="body2"
                            component="a"
                            href="/user/policy/legal"
                            sx={{
                                fontSize: '14px',
                                color: '#666666 !important',
                                textDecoration: 'underline',
                                whiteSpace: 'nowrap',
                                marginBottom: '10px', // Thêm margin dưới mỗi liên kết
                                textAlign: { xs: 'center', sm: 'left' }, // Căn giữa trên điện thoại, trái trên màn hình lớn
                            }}
                        >
                            Thông báo pháp lý
                        </Typography>
                        <Typography
                            variant="body2"
                            component="a"
                            href="/user/policy/clause"
                            sx={{
                                fontSize: '14px',
                                color: '#666666 !important',
                                textDecoration: 'underline',
                                whiteSpace: 'nowrap',
                                marginBottom: '10px',
                                textAlign: { xs: 'center', sm: 'left' },
                            }}
                        >
                            Điều khoản dịch vụ
                        </Typography>
                        <Typography
                            variant="body2"
                            component="a"
                            href="/user/policy/privacy"
                            sx={{
                                fontSize: '14px',
                                color: '#666666 !important',
                                textDecoration: 'underline',
                                whiteSpace: 'nowrap',
                                marginBottom: '10px',
                                textAlign: { xs: 'center', sm: 'left' },
                            }}
                        >
                            Quyền riêng tư
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                        padding: '20px 0',
                        flexWrap: 'wrap',
                        gap: '20px',
                    }}
                >
                    {/* Payment Methods Section */}
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                        <Typography
                            variant="h6"
                            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333', marginBottom: '10px' }}
                        >
                            Phương thức thanh toán
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '8px',
                            }}
                        >
                            {paymentMethods.map((icon) => (
                                <Box
                                    key={icon}
                                    component="img"
                                    src={icon}
                                    alt="Payment Method"
                                    sx={{
                                        width: '80%',
                                        padding: '10px',
                                        objectFit: 'contain',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* App Downloads Section */}
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                        <Typography
                            variant="h6"
                            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333', marginBottom: '10px' }}
                        >
                            Tải ứng dụng
                        </Typography>
                        <Box
                            sx={{
                                // display: 'flex',
                                // flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            {appDownloads.map((icon, index) => (
                                <Button key={index} variant="contained" color="none" sx={{ padding: 0 }}>
                                    <Box
                                        component="img"
                                        src={icon}
                                        alt="App Download"
                                        sx={{
                                            width: '100%',
                                            maxWidth: '300px',
                                            padding: '10px',
                                        }}
                                        aria-disabled="true"
                                    />
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* Social Media Section */}
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography
                            variant="h6"
                            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333', marginBottom: '10px' }}
                        >
                            Kết nối với chúng tôi
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '20px',
                            }}
                        >
                            {socialIcons.map((social) => (
                                <Box key={social.name} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {social.icon}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Thông tin liên hệ */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        width: '100%',
                        margin: '20px 0px',
                    }}
                >
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            fontSize: '14px',
                            color: '#333333',
                            textAlign: 'left',
                            lineHeight: '2.2',
                        }}
                    >
                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                            Trụ sở chính:
                        </Box>{' '}
                        L17-11, Tầng 17, Tòa nhà Vincom Center, 72 Lê Thánh Tôn, P. Bến Nghé, Q.1, TP. HCM
                        <br />
                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                            Hotline:
                        </Box>{' '}
                        0919 111 419
                        <br />
                        Giấy chứng nhận Đăng ký Kinh doanh số 0317020213 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh
                        cấp lần đầu ngày 10/11/2021.
                        <br />
                        <Box component="span" sx={{ fontWeight: 'bold', lineHeight: '2.2' }}>
                            ASIZON
                        </Box>{' '}
                        nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp hoặc trung
                        tâm xử lý đơn hàng
                        <br />
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{
                                fontSize: '14px',
                                color: '#333333',
                                lineHeight: '2.2',
                            }}
                        >
                            &copy; 2024 - Bản quyền của Công ty CP Nông nghiệp Á Đông
                        </Typography>
                    </Typography>
                </Box>

                {/* Đảm bảo */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        margin: '20px 0px',
                    }}
                >
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            fontSize: '14px',
                            color: '#333333 !important',
                            textAlign: 'left',
                            lineHeight: '2.2',
                        }}
                    >
                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                            Mua hàng đảm bảo
                        </Box>
                        <Box sx={{ marginTop: '15px' }}>
                            Mua hàng trên{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            luôn là một trải nghiệm ấn tượng.{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            luôn sẽ đảm bảo cung cấp cho bạn những sản phẩm chất lượng ưng ý. Là một kênh bán hàng uy
                            tín,{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            luôn cam kết mang lại cho khách hàng những trải nghiệm mua sắm nông sản an toàn và tin cậy.
                            Các sản phẩm được cập nhật trên nền tảng{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            luôn đảm bảo chất lượng và theo sát xu hướng của thị trường. Mọi thông tin về người dùng đều
                            được bảo mật tuyệt đối. Các hoạt động giao dịch thanh toán tại{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            luôn được đảm bảo diễn ra nhanh chóng, an toàn. Cùng với đó là các chính sách đổi trả hàng
                            hoá linh hoạt.
                        </Box>
                        <Box sx={{ marginTop: '15px' }}>
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            luôn cam kết mọi sản phẩm trên{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            đều là những sản phẩm chất lượng, gắn tem nhãn, bảo hành đầy đủ. Đến với{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            ngay hôm nay để mua hàng online giá tốt và trải nghiệm dịch vụ chăm sóc khách hàng tuyệt vời
                            tại đây. Ngoài ra, khách hàng có thể sử dụng chức năng thành viên để đổi lấy mã giảm giá có
                            giá trị cao và dịch vụ hấp dẫn. Hãy truy cập ngay{' '}
                            <Box component="span" sx={{ fontWeight: 'bold' }}>
                                ASIZON
                            </Box>{' '}
                            hôm nay và trải nghiệm nhé!
                        </Box>
                    </Typography>
                </Box>

                {/* Danh mục hàng hóa */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        width: '100%',
                        margin: '20px 0px',
                    }}
                >
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            fontSize: '14px',
                            color: '#333333',
                            textAlign: 'left',
                            lineHeight: '2.2',
                        }}
                    >
                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                            Danh mục hàng hóa
                        </Box>
                        <br />
                        {categories.map((category, index) => (
                            <React.Fragment key={category.id}>
                                <Box
                                    component="span"
                                    sx={{
                                        fontSize: '14px',
                                        color: '#000000',
                                    }}
                                >
                                    <Link sx={{ background: '#000000' }} href="/user/Developments">
                                        {category.name}
                                    </Link>
                                </Box>
                                {index < categories.length - 1 && (
                                    <Box
                                        component="span"
                                        sx={{
                                            color: '#000000',
                                            margin: '0 8px',
                                        }}
                                    >
                                        |
                                    </Box>
                                )}
                            </React.Fragment>
                        ))}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default Footer;
