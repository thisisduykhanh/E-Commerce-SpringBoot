import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function ContactUs() {
    return (
        <Box sx={{ padding: '20px 50px', backgroundColor: '#F5F5F5' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '40px',
                }}
            >
                {/* Phần thông tin liên hệ */}
                <Card
                    sx={{
                        width: '25%',
                        minWidth: '250px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Địa chỉ */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <LocationOnIcon sx={{ fontSize: '40px', color: '#00A6B7', marginBottom: '10px' }} />
                        <Typography variant="body1" fontWeight="bold" color="#4D4D4D">
                            Địa chỉ
                        </Typography>
                        <Typography variant="body2" color="#4D4D4D">
                            L17-11, Tầng 17, Tòa nhà Vincom Center, 72 Lê Thánh Tôn, P. Bến Nghé, Q.1, TP. HCM
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: '20px' }} />

                    {/* Email */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <EmailIcon sx={{ fontSize: '40px', color: '#00A6B7', marginBottom: '10px' }} />
                        <Typography variant="body1" fontWeight="bold" color="#4D4D4D">
                            Email
                        </Typography>
                        <Typography variant="body2" color="#4D4D4D">
                            adongagri@gmail.com
                        </Typography>
                        <Typography variant="body2" color="#4D4D4D">
                            Help.adongagri@gmail.com
                        </Typography>
                    </Box>
                    <Divider sx={{ marginBottom: '20px' }} />

                    {/* Điện thoại */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <PhoneIcon sx={{ fontSize: '40px', color: '#00A6B7', marginBottom: '10px' }} />
                        <Typography variant="body1" fontWeight="bold" color="#4D4D4D">
                            Điện thoại
                        </Typography>
                        <Typography variant="body2" color="#4D4D4D">
                            (+84) 919 111 419
                        </Typography>
                    </Box>
                </Card>

                {/* Phần gửi yêu cầu */}
                <Card
                    sx={{
                        flex: 1,
                        minWidth: '400px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                        Gửi lời chào tới ASIZON
                    </Typography>
                    <Typography variant="body2" color="#4D4D4D" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                        Bạn có muốn chia sẻ tôi không hay bạn muốn bắt đầu dự án của mình và cần sự giúp đỡ của tôi? Hãy
                        liên hệ với tôi.
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    >
                        {/* Họ tên và Email */}
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <TextField
                                fullWidth
                                label="Họ tên của bạn"
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    '& .MuiInputLabel-root': {
                                        '&.Mui-focused': {
                                            color: '#00A6B7',
                                        },
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00A6B7',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email của bạn"
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    '& .MuiInputLabel-root': {
                                        '&.Mui-focused': {
                                            color: '#00A6B7',
                                        },
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00A6B7',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        {/* Tiêu đề */}
                        <TextField
                            fullWidth
                            label="Tiêu đề"
                            variant="outlined"
                            sx={{
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#00A6B7',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00A6B7',
                                    },
                                },
                            }}
                        />

                        {/* Nội dung */}
                        <TextField
                            fullWidth
                            label="Nội dung"
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                        color: '#00A6B7',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00A6B7',
                                    },
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#00A6B7',
                                color: 'white',
                                textTransform: 'none',
                                padding: '10px 20px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                width: 'fit-content',
                                '&:hover': { backgroundColor: '#008c9e' },
                            }}
                        >
                            Gửi yêu cầu
                        </Button>
                    </Box>
                </Card>
            </Box>

            {/* Phần bản đồ */}
            <Box
                sx={{
                    marginTop: '30px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.2110486748693!2d144.96328031549974!3d-37.81410797975196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d50511cfabf%3A0x5f471fdb2fcd5fa0!2sVincom%20Center!5e0!3m2!1sen!2s!4v1676380800000!5m2!1sen!2s"
                    width="100%"
                    height="400px"
                    style={{ border: 'none' }}
                />
            </Box>
        </Box>
    );
}

export default ContactUs;
