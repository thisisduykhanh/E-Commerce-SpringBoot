'use client';

import * as React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Rating, Typography } from '@mui/material';
import { Headset, Leaf, Package, ShoppingBag, Star, Truck } from '@phosphor-icons/react';

const comments = [
    {
        id: 1,
        text: 'Giá trị cốt lõi của Á Đông Agri trong lĩnh vực nông nghiệp là Hợp tác. Chúng tôi coi trọng việc hợp tác với các đối tác, khách hàng và cộng đồng để đạt được mục tiêu chung.',
        company: 'Công ty A',
        rating: 5,
        image: '/assets/adong.png',
    },
    {
        id: 2,
        text: 'Chúng tôi đặt sự tôn trọng lên hàng đầu trong mọi khía cạnh. Tôn trọng không chỉ là một giá trị cốt lõi, mà còn là nền tảng để xây dựng một cộng đồng nông nghiệp mạnh mẽ và bền vững.',
        company: 'Công ty B',
        rating: 5,
        image: '/assets/adong.png',
    },
    {
        id: 3,
        text: 'Chúng tôi cam kết thực hiện các hoạt động kinh doanh một cách minh bạch và trung thực. Minh bạch giúp xây dựng niềm tin và tạo sự ổn định trong môi trường kinh doanh nông nghiệp.',
        company: 'Công ty C',
        rating: 5,
        image: '/assets/adong.png',
    },
    {
        id: 4,
        text: 'Ý kiến 4',
        company: 'Công ty D',
        rating: 5,
        image: '/assets/adong.png',
    },
    {
        id: 5,
        text: 'Ý kiến 5',
        company: 'Công ty E',
        rating: 5,
        image: '/assets/adong.png',
    },
    {
        id: 6,
        text: 'Ý kiến 6',
        company: 'Công ty F',
        rating: 5,
        image: '/assets/adong.png',
    },
];

function AboutMe() {
    const handleButtonClick = () => {
        // Chuyển hướng đến nhà cung cấp
        window.location.href = '/user/SupplierList';
    };

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const itemsPerPage = 3; // Số item hiển thị mỗi lần

    // Tính toán các item cần hiển thị
    const currentItems = comments.slice(currentIndex, currentIndex + itemsPerPage);

    // Hàm di chuyển tới trang tiếp theo
    const nextPage = () => {
        if (currentIndex + itemsPerPage < comments.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    // Hàm quay lại trang trước
    const prevPage = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <Box sx={{ width: '100%', px: { xs: 2, sm: 4 } }}>
            {/* Hàng 1: Ảnh bên phải, chữ bên trái */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 6 }}>
                <Box sx={{ flex: 1, pr: { xs: 0, md: 2 } }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontSize: { xs: '32px', sm: '40px', md: '56px' },
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            lineHeight: 1.2,
                        }}
                    >
                        Á ĐÔNG AGRI & SỨ MỆNH
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            fontSize: { xs: '14px', sm: '16px', md: '18px' },
                            fontFamily: 'Poppins',
                            color: '#666666',
                        }}
                    >
                        Công ty Cổ phần Á Đông Agricuture là một công ty hoạt động trong lĩnh vực truyền thông, công
                        nghệ và mở rộng thêm các mảng. Công ty chúng tôi với mục tiêu kinh doanh của Việt Nam, hợp tác
                        với các đối tác trong các ngành và phát triển đa ngành. Mục tiêu của chúng tôi là mong muốn góp
                        phần làm cho thế giới trở nên tốt đẹp hơn bằng sức mạnh công nghệ thông qua việc kết nối cộng
                        đồng người mua và người bán. Chúng tôi cam kết đem lại sự thịnh vượng và phát triển cho các
                        ngành của đất nước.
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <img
                        src="/assets/aboutme1.jpg"
                        alt="Á Đông Agri"
                        style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
                    />
                </Box>
            </Box>

            {/* Hàng 2: Ảnh bên trái, chữ bên phải */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, mb: 6 }}>
                {/* Left Image */}
                <Box
                    sx={{
                        flex: 1,
                        position: 'relative',
                        marginBottom: { xs: '10px', sm: 0 },
                        marginRight: { sm: '30px' },
                    }}
                >
                    <img
                        src="/assets/aboutme2.jpg"
                        alt="Mục tiêu đồng hành"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}
                    />
                </Box>

                {/* Text and Icons */}
                <Box sx={{ flex: 1, position: 'relative' }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            mb: 2,
                            fontSize: { xs: '32px', sm: '40px', md: '56px' },
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                        }}
                    >
                        MỤC TIÊU ĐỒNG HÀNH
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 6,
                            fontSize: { xs: '14px', sm: '16px', md: '18px' },
                            fontFamily: 'Poppins',
                            color: '#666666',
                        }}
                    >
                        Á Đông Agri cam kết tôn trọng môi trường và sử dụng nguồn tài nguyên một cách bền vững. Chúng
                        tôi đặt mục tiêu tạo điều kiện cho người mua và người bán có thu nhập ổn định và công bằng. Điều
                        này giúp họ duy trì cuộc sống và đóng góp vào sự phát triển bền vững của cộng đồng.
                    </Typography>

                    {/* List of features with icons - 2 icons per row */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
                            gap: 1,
                            width: '100%',
                        }}
                    >
                        {/* Box 1 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ padding: '2px' }}>
                                <Leaf
                                    size={55}
                                    style={{
                                        marginRight: '10px',
                                        color: '#00A6B7',
                                        backgroundColor: 'rgba(0, 166, 183, 0.1)',
                                        borderRadius: '50%',
                                        padding: '8px',
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h6">Organic</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666666' }}>
                                    Vùng trồng đạt chất lượng cao
                                </Typography>
                            </Box>
                        </Box>

                        {/* Box 2 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ padding: '2px' }}>
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
                            </Box>
                            <Box>
                                <Typography variant="h6">Hỗ trợ 24/7</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666666' }}>
                                    Lắng nghe ý kiến khách hàng
                                </Typography>
                            </Box>
                        </Box>

                        {/* Box 3 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ padding: '2px' }}>
                                <Star
                                    size={55}
                                    style={{
                                        marginRight: '10px',
                                        color: '#00A6B7',
                                        backgroundColor: 'rgba(0, 166, 183, 0.1)',
                                        borderRadius: '50%',
                                        padding: '8px',
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="h6">Chính sách khách hàng</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666666' }}>
                                    Mang đến trải nghiệm tốt
                                </Typography>
                            </Box>
                        </Box>

                        {/* Box 4 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ padding: '2px' }}>
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
                            </Box>
                            <Box>
                                <Typography variant="h6">Truy xuất nguồn gốc</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666666' }}>
                                    Nguồn gốc rõ ràng, tiêu chuẩn
                                </Typography>
                            </Box>
                        </Box>

                        {/* Box 5 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ padding: '2px' }}>
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
                            </Box>
                            <Box>
                                <Typography variant="h6">Hỗ trợ vận chuyển</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666666' }}>
                                    Liên kết các đơn vị vận chuyển chất lượng, tối ưu chi phí
                                </Typography>
                            </Box>
                        </Box>

                        {/* Box 6 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ padding: '8px' }}>
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
                            </Box>
                            <Box>
                                <Typography variant="h6">Logistic</Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: '#666666' }}>
                                    Vận hành cùng các đối tác kho bãi, đóng gói hàng hóa
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'flex-start',
                    position: 'relative',
                }}
            >
                {/* Text content */}
                <Box sx={{ flex: 1, order: { xs: 1, sm: 0 } }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            mb: 2,
                            fontSize: { xs: '32px', sm: '40px', md: '56px' },
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            lineHeight: 1.2,
                        }}
                    >
                        NÔNG SẢN TỪ VÙNG TRỒNG ĐẾN TẬN NƠI
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            fontSize: { xs: '14px', sm: '16px', md: '18px' },
                            fontFamily: 'Poppins',
                            color: '#666666',
                        }}
                    >
                        Chúng tôi cam kết thực hiện các hoạt động kinh doanh một cách minh bạch và trung thực. Minh bạch
                        giúp xây dựng niềm tin và tạo sự ổn định trong môi trường kinh doanh nông nghiệp.
                    </Typography>

                    {/* Feature boxes */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '8fr', gap: 1, mt: 3, width: '100%' }}>
                        {/* Box 1 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ padding: '2px' }}>
                                <CheckCircleOutlineIcon sx={{ color: '#00A6B7' }} />
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ marginLeft: '10px', fontFamily: 'Poppins', color: '#666666' }}
                            >
                                Đảm bảo chất lượng hàng hóa
                            </Typography>
                        </Box>
                        {/* Box 2 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ padding: '2px' }}>
                                <CheckCircleOutlineIcon sx={{ color: '#00A6B7' }} />
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ marginLeft: '10px', fontFamily: 'Poppins', color: '#666666' }}
                            >
                                Truy xuất nguồn gốc, đảm bảo tính minh bạch
                            </Typography>
                        </Box>

                        {/* Box 3 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ padding: '2px' }}>
                                <CheckCircleOutlineIcon sx={{ color: '#00A6B7' }} />
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{ marginLeft: '10px', fontFamily: 'Poppins', color: '#666666' }}
                            >
                                Trách nhiệm về xã hội của Á Đông Azison
                            </Typography>
                        </Box>
                    </Box>

                    {/* Button */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleButtonClick}
                            sx={{
                                background: 'linear-gradient(180deg, #008D96 0%, #008D96 100%)',
                                color: 'white',
                                borderRadius: '20px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                '&:hover': {
                                    background: 'linear-gradient(180deg, #008D91 0%, #008D91 100%)',
                                },
                            }}
                        >
                            Truy cập cửa hàng
                        </Button>
                    </Box>
                </Box>

                {/* Image Section */}
                <Box sx={{ flex: 1, order: { xs: 0, sm: 1 } }}>
                    <img
                        src="/assets/aboutme3.png"
                        alt="Vị trí Á Đông Agri"
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            </Box>

            {/* Những ý kiến */}
            <Box sx={{ backgroundColor: '#F2F2F2', padding: 3, mb: 0 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '32px', sm: '40px', md: '56px' },
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                        }}
                    >
                        NHỮNG Ý KIẾN
                    </Typography>

                    <Box sx={{ display: 'flex' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={prevPage}
                            disabled={currentIndex === 0}
                            sx={{
                                background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)',
                                borderRadius: '50%',
                                width: 40,
                                height: 40,
                                minWidth: 40,
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 2,
                                '&:hover': {
                                    background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)',
                                    opacity: 0.8,
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={nextPage}
                            disabled={currentIndex + itemsPerPage >= comments.length}
                            sx={{
                                background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)',
                                borderRadius: '50%',
                                width: 40,
                                height: 40,
                                minWidth: 40,
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '&:hover': {
                                    background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)',
                                    opacity: 0.8,
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Comments */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
                    {currentItems.map((item, index) => (
                        <Box
                            key={item.id + index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                mx: 2,
                                p: 2,
                                border: 1,
                                borderRadius: 2,
                                minHeight: 200,
                                width: { xs: '100%', sm: '380px' },
                                boxShadow: 3,
                                backgroundColor: '#fff',
                            }}
                        >
                            <FormatQuoteIcon sx={{ fontSize: '3rem', color: '#00A6B7', mb: 2 }} />
                            <Typography variant="h5" sx={{ color: '#666666', fontFamily: 'Poppins' }}>
                                {item.text}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    mt: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={item.image}
                                        alt={`Feedback from ${item.company}`}
                                        style={{ width: 'auto', height: 'auto', borderRadius: '50%', marginRight: 10 }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ fontStyle: 'italic', color: '#666666', fontFamily: 'Poppins' }}
                                    >
                                        {item.company}
                                    </Typography>
                                </Box>
                                <Rating value={item.rating} readOnly={true} size="small" />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default AboutMe;
