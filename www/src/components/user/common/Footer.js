import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Headphones, Package, ShieldCheck, Truck } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';

function Footer() {

    // Các danh mục trong footer
    const sections = [
        {
            title: 'Hỗ trợ khách hàng',
            description: [
                <Link key="track-order" href="/support/track-order" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Theo dõi đơn hàng
                </Link>,
                <Link key="warranty" href="/support/warranty" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Kiểm tra bảo hành
                </Link>,
                <Link key="faq" href="/support/faq" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Câu hỏi thường gặp
                </Link>,
                <Link key="returns" href="/support/returns" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Chính sách đổi trả
                </Link>,
            ],
        },
        {
            title: 'Chính sách',
            description: [
                <Link key="shipping" href="/policy/shipping" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Chính sách giao hàng
                </Link>,
                <Link key="payment" href="/policy/payment" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Chính sách thanh toán
                </Link>,
                <Link key="privacy" href="/policy/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Chính sách bảo mật
                </Link>,
                <Link key="terms" href="/policy/terms" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Điều khoản sử dụng
                </Link>,
            ],
        },
        {
            title: 'Về chúng tôi',
            description: [
                <Link key="about" href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Giới thiệu TechTrend
                </Link>,
                <Link key="blog" href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                    TechTrend Blog
                </Link>,
                <Link key="careers" href="/careers" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Cơ hội việc làm
                </Link>,
                <Link key="contact" href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Liên hệ
                </Link>,
            ],
        },
        {
            title: 'Mua sắm',
            description: [
                <Link key="guide" href="/guide/buying" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Hướng dẫn mua hàng
                </Link>,
                <Link key="promotions" href="/promotions" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Khuyến mãi
                </Link>,
                <Link key="banned-items" href="/policy/banned-items" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sản phẩm bị cấm
                </Link>,
            ],
        },
    ];

    // Phương thức thanh toán
    const paymentMethods = [
        '/payment/visa.svg',
        '/payment/master-card.svg',
        '/payment/pay-pal.svg',
        '/payment/cash.png',
        '/payment/banking.svg',
    ];

    // Tải ứng dụng
    const appDownloads = ['/app/app-store.png', '/app/google-play.png'];

    // Mạng xã hội
    const socialIcons = [
        { icon: <Facebook sx={{ color: '#1877F2' }} />, name: 'Facebook' },
        { icon: <Twitter sx={{ color: '#1DA1F2' }} />, name: 'Twitter' },
        { icon: <Instagram sx={{ color: '#E4405F' }} />, name: 'Instagram' },
        { icon: <LinkedIn sx={{ color: '#0A66C2' }} />, name: 'LinkedIn' },
        { icon: <YouTube sx={{ color: '#FF0000' }} />, name: 'YouTube' },
    ];

    return (
        <>
            <style>{`
                a:hover {
                    color: #0288D1 !important;
                    text-decoration: underline !important;
                }
            `}</style>

            {/* Features Section */}
            

            {/* Main Footer Content */}
            <Box
                sx={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFFFFF',
                    padding: { xs: '30px 20px', md: '50px 40px' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                }}
            >
                {/* Sections */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: '30px',
                        marginBottom: '30px',
                    }}
                >
                    {sections.map((section) => (
                        <Box key={section.title} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {section.title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {section.description.map((line, index) => (
                                    <Typography key={index} variant="body2" sx={{ fontSize: '14px', color: '#B0B0B0' }}>
                                        {line}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Bottom Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        gap: '20px',
                        borderTop: '1px solid #333333',
                        paddingTop: '30px',
                    }}
                >
                    {/* Company Info */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#0288D1' }}>
                            TechTrend
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#B0B0B0', marginTop: '10px' }}>
                            © 2024 TechTrend. All Rights Reserved.
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#B0B0B0', marginTop: '10px' }}>
                            Trụ sở: Tòa nhà TechTower, 123 Nguyễn Huệ, Q.1, TP. HCM
                            <br />
                            Hotline: 1800-1234
                            <br />
                            Giấy phép kinh doanh: 123456789, cấp ngày 01/01/2022
                        </Typography>
                    </Box>

                    {/* Payment Methods */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Phương thức thanh toán
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                            {paymentMethods.map((icon) => (
                                <Box
                                    key={icon}
                                    component="img"
                                    src={icon}
                                    alt="Payment Method"
                                    sx={{ width: '50px', height: '30px', objectFit: 'contain' }}
                                />
                            ))}
                        </Box>
                    </Box>
                    
                </Box>

                {/* Social Media */}
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
                        Kết nối với chúng tôi
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        {socialIcons.map((social) => (
                            <Box key={social.name} sx={{ '&:hover': { transform: 'scale(1.2)', transition: '0.3s' } }}>
                                {social.icon}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Footer;