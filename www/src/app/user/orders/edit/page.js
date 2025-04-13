import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    Backdrop,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { z as zod } from 'zod';

// Định nghĩa schema
const orderSchema = zod.object({
    name: zod.string().min(1, 'Họ tên không được để trống.'),
    phone: zod
        .string()
        .regex(/^\d+$/, 'Số điện thoại chỉ được chứa số.')
        .min(10, 'Số điện thoại phải có ít nhất 10 số.')
        .max(11, 'Số điện thoại không được quá 11 số.'),
    addressDetail: zod.string().min(1, 'Địa chỉ không được để trống.'),
});

const validateForm = (formData) => {
    try {
        orderSchema.parse(formData); // Nếu hợp lệ, không có lỗi sẽ được ném ra
        return {}; // Không có lỗi
    } catch (err) {
        // Xử lý lỗi
        const validationErrors = {};
        err.errors.forEach((error) => {
            validationErrors[error.path[0]] = error.message;
        });
        return validationErrors;
    }
};

const OrdersFormEdit = ({ onCancel, address, onAddNewAddress }) => {
    const [name, setName] = useState(address[0]?.name || '');
    const [phone, setPhone] = useState(address[0]?.phone || '');

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [streetDetail, setStreetDetail] = useState(address[0]?.addressDetail || '');
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    // const [hasChanged, setHasChanged] = useState(false); // Theo dõi thay đổi dữ liệu
    const [addressData, setAddressData] = useState([]);
    const [addressDetail, setAddressDetail] = useState('');

    useEffect(() => {
        // Fetch address data from a file or API
        fetch('/address.json')
            .then((response) => response.json())
            .then((json) => setAddressData(json))
            .catch((error) => console.error(error));
    }, []);

    // Hàm cập nhật địa chỉ chi tiết khi có sự thay đổi
    useEffect(() => {
        if (city && district && streetDetail) {
            setAddressDetail(`${streetDetail}, ${district}, ${city}`);
        }
    }, [city, district, streetDetail]);
    

    // Hàm xử lý thay đổi streetDetail
    const handleStreetChange = (e) => {
        const value = e.target.value;
        setStreetDetail(value);
    };

    const handleStreetBlur = () => {
        // Kiểm tra và cập nhật giá trị chính xác của streetDetail nếu có lỗi xảy ra
        if (streetDetail.trim() === '') {
            setStreetDetail(''); // Hoặc giá trị mặc định nếu cần
        }
    };

    // Đảm bảo rằng địa chỉ đã được tách ra thành phần 'City' và 'District'
    useEffect(() => {
        if (address[0]?.addressDetail) {
            const parts = address[0]?.addressDetail.split(',');
            if (parts.length > 1) {
                setCity(parts[2].trim()); // Thành phố (last part)
                setDistrict(parts[1].trim()); // Quận/Huyện (second part)
                setStreetDetail(parts[0].trim()); // Địa chỉ chi tiết (first part)
            }
        }
    }, [address]);

    const handleSubmit = async () => {
        const formData = { name, phone, addressDetail };
        const validationErrors = validateForm(formData); // Kiểm tra lỗi

        // if (!hasChanged) {
        //     setFormErrors({ global: 'Bạn chưa thay đổi dữ liệu nào.' });
        //     return;
        // }

        if (Object.keys(validationErrors).length === 0) {
            try {
                setLoading(true);
                onAddNewAddress({ name, phone, addressDetail, isDefault: false }); // Truyền địa chỉ mới lên cha
                onCancel(); // Thực hiện hành động khi thành công (đóng form)
            } catch (err) {
                console.error('Error adding order:', err);
            } finally {
                setLoading(false); // Tắt hiệu ứng load khi kết thúc
            }
        } else {
            setFormErrors(validationErrors);
        }
    };

    // const handleChange = (field, value) => {
    //     if (field === 'name') setName(value);
    //     if (field === 'phone') setPhone(value);
    //     if (field === 'addressDetail') setAddressDetail(value);
    //     if (field === 'city') setCity(value);
    //     if (field === 'district') setDistrict(value);

    //     logger.debug(`Field ${field} changed to: ${value}`);
    //     logger.debug(`Current state: ${JSON.stringify({ name, phone, addressDetail, city, district })}`);

    //     // Cập nhật hasChanged dựa trên sự thay đổi của các trường
    //     setHasChanged(
    //         value !== (address?.[field] || '') ||
    //             name !== (address?.name || '') ||
    //             phone !== (address?.phone || '') ||
    //             addressDetail !== (address?.addressDetail || '') ||
    //             city !== (address?.city || '') ||
    //             district !== (address?.district || '')
    //     );

    //     logger.debug(`hasChanged: ${hasChanged}`);
    // };

    const handleCityChange = (e) => {
        const newCity = e.target.value;
        setCity(newCity);
        // // Cập nhật lại hasChanged
        // setHasChanged(newCity !== (address?.city || ''));
    };

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setDistrict(selectedDistrict);
        // setHasChanged(newDistrict !== (address?.district || ''));
    };

    const commonStyles = {
        '& .MuiInputLabel-root': {
            color: '#000',
            '&.Mui-focused': {
                color: '#00A6B7',
            },
        },
        '& .MuiOutlinedInput-root': {
            '--Input-focusedHighlight': '#00A6B7',
            '& fieldset': {
                borderColor: '#000',
            },
            '&:hover fieldset': {
                borderColor: '#000',
            },
            '&.Mui-focused fieldset': { borderColor: 'var(--Input-focusedHighlight)' },
            '& input': {
                color: '#000',
            },
        },
    };

    const selectStyles = {
        PaperProps: {
            sx: {
                maxHeight: 200,
                backgroundColor: '#f5f5f5',
                color: '#000',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '5px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                },
            },
        },
        sx: {
            '& .MuiSelect-select': {
                color: '#000',
            },
        },
        menuItemStyles: {
            color: '#000',
            padding: '10px 15px',
            '&:hover': {
                backgroundColor: '#e0e0e0',
                color: '#000',
            },
            '&:focus': {
                backgroundColor: '#00A6B7',
                color: 'white',
            },
            transition: 'background-color 0.3s, color 0.3s',
        },
    };

    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    color: '#000',
                    paddingRight: 0,
                }}
            >
                Sửa Địa Chỉ Giao Hàng
                <IconButton onClick={onCancel} sx={{ padding: 0, color: '#000' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    overflowY: 'auto',
                    maxHeight: '70vh',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }}
            >
                <Box p={2} sx={{ backgroundColor: '#fff', width: '100%', padding: 0 }}>
                    <TextField
                        label="Họ tên"
                        fullWidth={true}
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2, ...commonStyles, width: '100%' }}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        label="Số điện thoại"
                        type='tel'
                        fullWidth={true}
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ mb: 2, ...commonStyles }}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                    />
                    <FormControl fullWidth={true} sx={{ mb: 2, ...commonStyles }}>
                        <InputLabel>Thành phố</InputLabel>
                        <Select
                            value={city || ''}
                            onChange={handleCityChange}
                            MenuProps={{ PaperProps: { ...selectStyles.PaperProps } }}
                            sx={selectStyles.sx}
                        >
                            {addressData.map((p) => (
                                <MenuItem key={p.ProvinceID} value={p.ProvinceName} sx={selectStyles.menuItemStyles}>
                                    {p.ProvinceName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {city && (
                        <FormControl fullWidth={true} sx={{ mb: 2, ...commonStyles }}>
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={
                                    district ||
                                    (Array.isArray(district) && district.find((d) => d.isSelected)?.DistrictName)
                                }
                                onChange={handleDistrictChange}
                                MenuProps={{ PaperProps: { ...selectStyles.PaperProps } }}
                                sx={selectStyles.sx}
                            >
                                {/* Populate districts based on city */}
                                {addressData
                                    .find((p) => p.ProvinceName === city)
                                    ?.Districts.map((d) => (
                                        <MenuItem
                                            key={d.DistrictID}
                                            value={d.DistrictName}
                                            sx={selectStyles.menuItemStyles}
                                        >
                                            {d.DistrictName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    )}
                    <TextField
                        label="Số nhà và tên đường"
                        fullWidth={true}
                        value={streetDetail}
                        onChange={handleStreetChange}
                        onBlur={handleStreetBlur}
                        error={!!formErrors.addressDetail}
                        helperText={formErrors.addressDetail}
                        sx={{ mb: 2, ...commonStyles }}
                    />
                    {formErrors.global && <Box sx={{ color: 'red', mb: 2 }}>{formErrors.global}</Box>}
                    <Backdrop sx={{ color: '#fff', zIndex: 1300 }} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            width: '100%',
                            mt: 2,
                            background: '#00A6B7',
                            color: 'white',
                            boxShadow: 'none',
                            border: 'none',
                            ':hover': {
                                background: '#fb8c00',
                                boxShadow: 'none',
                                border: 'none',
                            },
                        }}
                    >
                        Cập nhật
                    </Button>
                </Box>
                <p>Địa chỉ : {addressDetail}</p>
            </DialogContent>
        </Dialog>
    );
};

export default OrdersFormEdit;
