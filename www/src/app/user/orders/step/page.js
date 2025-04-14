'use client';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { useRouter } from 'next/navigation';

function ProgressBar() {
  const steps = [
    'XÁC NHẬN ĐƠN HÀNG',
    'CHỜ THANH TOÁN',
    'KIỂM TRA CHẤT LƯỢNG',
    'XUẤT KHO',
    'GIAO HÀNG',
  ];

  const router = useRouter();
  const currentStep = 0;

  return (
    <Box
      sx={{
        marginTop: '50px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        width: '100%',
      }}
    >
      {steps.map((step, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            minWidth: '120px', 
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          {/* Đoạn đường kẻ xanh giữa các bước */}
          {index === 0 && index <= currentStep && ( 
            <Box
              sx={{
                position: 'absolute',
                top: '20px',
                left: '70%',
                display: 'flex',
                width: '30%',
                height: '4px',
                zIndex: 2,
                backgroundColor: '#62BD91',
                transform: 'translateX(-50%)',
              }}
            >
              <Typography
                sx={{
                  position: 'absolute',
                  left: '150%',
                  top: '-18px',
                  transform: 'translateX(-50%)',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#ccc',
                  width: 'max-content',
                }}
              >
                Sản xuất bắt đầu
              </Typography>
            </Box>
          )}

          {/* Vòng tròn của bước */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: index <= currentStep ? '#5CAC66' : '#ccc',
              fontWeight: 'bold',
              color: 'white',
              mb: '6px',
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: '24px' }} />
          </Box>

          {/* Tên của bước */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: index === 0 ? 'bold' : 'normal',  // In đậm bước sản xuất
              color: '#000',
              wordWrap: 'break-word',
              textAlign: 'center',
              maxWidth: '100px',

              color: index === 1 ? '#62BD91' : '#000', // Change color for the first step
             
              cursor: index === 1 ? 'pointer' : 'default', // Change cursor for the first step
            }}

            onClick={() => {index === 1 && router.push('/user/order-history')}} // Optional: Add click event if needed
          >
            {step}
          </Typography>

          {/* Đoạn đường kẻ nối giữa các bước */}
          {index < steps.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: '20px',
                left: '100%',
                width: '100%',
                height: '4px',
                backgroundColor: '#ccc',
                zIndex: 1,
                transform: 'translateX(-50%)',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ProgressBar;
