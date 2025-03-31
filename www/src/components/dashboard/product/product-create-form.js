'use client';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { getProductGroup, getProductType, createProduct } from '@/services/supplier';
import { useEffect, useState, useCallback } from 'react';

const _schema = zod.object({
    name: zod.string().min(1, 'Name is required').max(255),
    handle: zod.string().max(255).optional(),
    category: zod.string().max(255).optional(),
    type: zod.string().max(255).optional(),
    description: zod.string().max(5000).optional(),
    tags: zod.string().max(255).optional(),
});

const _defaultValues = {
    name: '', // Product name
    price: '', // Product Price
    productGroupId: '', // Product Group ID
    productTypeId: '', // Product Type ID
    officialPriceDTOS: Array.from({ length: 4 }, () => ({
        price: '',
        minQuantity: '',
        maxQuantity: '',
    })), // Official Prices
    images: Array.from({ length: 4 }, () => ''), // Images
    storageType: '',
    shelfLife: '',
    instructionForUse: '',
    color: '',
    size: '',
    weight: '',
    packagingDetails: '',
    singlePackageSize: '',
};

export function ProductCreateForm() {
    const _router = useRouter();

    const [productGroups, setProductGroups] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(false);
    const [preview, setPreview] = useState({});

    const fetchProductGroups = async () => {
        try {
            const response = await getProductGroup();
            if (response && response.data) {
                console.log('Fetched Product Groups: ', response.data);
                setProductGroups(response.data);
            } else {
                console.error('No data found in response:', response);
            }
        } catch (error) {
            console.error('Error fetching product groups:', error);
        }
    };

    useEffect(() => {
        fetchProductGroups();
    }, []);

    // Log productGroups sau khi nó được set
    useEffect(() => {
        console.log('ProductGroups after setting state: ', productGroups);
    }, [productGroups]);

    const handleGroupChange = async (event) => {
        const groupId = event.target.value;
        setSelectedGroup(groupId);

        // Fetch product types based on selected group
        try {
            const response = await getProductType(groupId);
            if (response && response.data) {
                setProductTypes(response.data.productTypeDTOList);
            } else {
                console.error('No data found in response:', response);
            }
        } catch (error) {
            console.error('Error fetching product types:', error);
        }
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(async (event) => {
        console.log('Form :', event);

        // Lấy dữ liệu từ các trường của form
        const formData = new FormData();
        formData.append('name', event.name);
        formData.append('price', event.price);
        formData.append('productGroupId', event.productGroupId);
        formData.append('productTypeId', event.productTypeId);

        formData.append('storageType', event.storageType);
        formData.append('shelfLife', event.shelfLife);
        formData.append('instructionForUse', event.instructionForUse);
        formData.append('color', event.color);
        formData.append('size', event.size);
        formData.append('weight', event.weight);
        formData.append('packagingDetails', event.packagingDetails);
        formData.append('singlePackageSize', event.singlePackageSize);
        if (event.images) {
            for (let i = 0; i < event.images.length; i++) {
                if (event.images[i]) {
                    formData.append(`images[${i}]`, event.images[i][0]);
                }
            }
        }
        event.officialPriceDTOS.forEach((item, index) => {
            formData.append(`officialPriceDTOS[${index}].price`, item.price);
            formData.append(`officialPriceDTOS[${index}].minQuantity`, item.minQuantity);
            formData.append(`officialPriceDTOS[${index}].maxQuantity`, item.maxQuantity);
        });
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // Gửi dữ liệu qua fetch
        try {
            const response = await createProduct(formData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }, []);

    console.log(productGroups);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardContent>
                        <Stack divider={<Divider />} spacing={4}>
                            <Stack spacing={3}>
                                <Typography variant="h6">Thông tin cơ bản</Typography>
                                <Grid container={true} rowSpacing={2} columnSpacing={10}>
                                    <Grid item={true} md={6} xs={12}>
                                        <Controller
                                            control={control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormControl error={Boolean(errors.name)} fullWidth={true}>
                                                    <InputLabel required={true}>Tên sản phẩm</InputLabel>
                                                    <OutlinedInput {...field} value={field.value ?? ''} />
                                                    {errors.name ? (
                                                        <FormHelperText>{errors.name.message}</FormHelperText>
                                                    ) : null}
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item={true} md={6} xs={12}>
                                        <Controller
                                            control={control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormControl error={Boolean(errors.price)} fullWidth={true}>
                                                    <InputLabel required={true}>Giá sản phẩm</InputLabel>
                                                    <OutlinedInput {...field} value={field.value ?? ''} />
                                                    {errors.price ? (
                                                        <FormHelperText>{errors.price.message}</FormHelperText>
                                                    ) : null}
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item={true} md={6} xs={12}>
                                        <Controller
                                            control={control}
                                            name="productGroupId"
                                            render={({ field }) => (
                                                <FormControl error={Boolean(errors.productGroupId)} fullWidth={true}>
                                                    <InputLabel>Nhóm sản phẩm</InputLabel>
                                                    <Select
                                                        {...field}
                                                        value={selectedGroup || ''}
                                                        onChange={handleGroupChange}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 200,
                                                                    overflow: 'auto',
                                                                    overflowX: 'hidden',
                                                                },
                                                            },
                                                            anchorOrigin: {
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            },
                                                            transformOrigin: {
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled={true}>
                                                            Chọn nhóm sản phẩm
                                                        </MenuItem>
                                                        {productGroups &&
                                                            productGroups.map((group) => (
                                                                <MenuItem key={group.id} value={group.id}>
                                                                    {group.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>

                                                    {errors.productGroupId ? (
                                                        <FormHelperText>{errors.productGroupId.message}</FormHelperText>
                                                    ) : null}
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    {selectedGroup && (
                                        <Grid item={true} md={6} xs={3}>
                                            <Controller
                                                control={control}
                                                name="productTypeId"
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.productTypeId)} fullWidth={true}>
                                                        <InputLabel>Loại sản phẩm</InputLabel>
                                                        <Select
                                                            {...field}
                                                            value={field.value ?? ''}
                                                            disabled={!selectedGroup}
                                                            MenuProps={{
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: 200,
                                                                        overflow: 'auto',
                                                                        overflowX: 'hidden',
                                                                    },
                                                                },
                                                                anchorOrigin: {
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                },
                                                                transformOrigin: {
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="" disabled={true}>
                                                                Chọn loại
                                                            </MenuItem>
                                                            {productTypes?.map((type) => (
                                                                <MenuItem key={type.id} value={type.id}>
                                                                    {' '}
                                                                    {type.nameProductType}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>{' '}
                                                        {errors.productTypeId ? (
                                                            <FormHelperText>
                                                                {errors.productTypeId.message}
                                                            </FormHelperText>
                                                        ) : null}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item={true} xs={12} width="100%">
                                        <Controller
                                            control={control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormControl error={Boolean(errors.description)} fullWidth={true}>
                                                    <InputLabel>Mô tả</InputLabel>
                                                    <Box sx={{ mt: '8px', '& .tiptap-container': { height: '200px' } }}>
                                                        <TextEditor
                                                            content={field.value ?? ''}
                                                            onUpdate={({ editor }) => {
                                                                field.onChange(editor.getText());
                                                            }}
                                                            placeholder="Viết chi tiết về sản phẩm"
                                                        />
                                                    </Box>
                                                    {errors.description ? (
                                                        <FormHelperText>{errors.description.message}</FormHelperText>
                                                    ) : null}
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    {}
                                    <Grid item={true} xs={12}>
                                        <Typography variant="h6" gutterBottom={true}>
                                            Hình ảnh
                                        </Typography>
                                        <Grid container={true} rowSpacing={2} columnSpacing={18}>
                                            {Array.from({ length: 4 }).map((_, index) => (
                                                <Grid item={true} xs={12} sm={6} md={3} key={index}>
                                                    <Controller
                                                        control={control}
                                                        name={`images[${index}]`}
                                                        render={({ field }) => (
                                                            <FormControl fullWidth={true}>
                                                                <Box
                                                                    display="flex"
                                                                    flexDirection="column"
                                                                    alignItems="center"
                                                                >
                                                                    <InputLabel
                                                                        shrink={true}
                                                                        style={{ marginBottom: '8px' }}
                                                                    >
                                                                        Hình {index + 1}
                                                                    </InputLabel>
                                                                    <OutlinedInput
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            field.onChange(e.target.files);
                                                                            const showFile = e.target.files[0];
                                                                            if (showFile) {
                                                                                const previewUrl =
                                                                                    URL.createObjectURL(showFile);
                                                                                setPreview((prev) => ({
                                                                                    ...prev,
                                                                                    [index]: previewUrl,
                                                                                }));
                                                                            }
                                                                        }}
                                                                        inputProps={{
                                                                            accept: 'image/*',
                                                                        }}
                                                                        style={{
                                                                            padding: '8px',
                                                                            borderRadius: '8px',
                                                                        }}
                                                                    />
                                                                </Box>
                                                                {preview[index] && (
                                                                    <Box
                                                                        mt={2}
                                                                        width="100%"
                                                                        height="150px"
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            overflow: 'hidden',
                                                                            border: '1px solid #ccc',
                                                                            borderRadius: '8px',
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={preview[index]}
                                                                            alt={`Preview ${index + 1}`}
                                                                            style={{
                                                                                maxWidth: '100%',
                                                                                maxHeight: '100%',
                                                                                objectFit: 'contain',
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    {/* <Grid item={true} xs={12}>
                                    <Typography variant="h6">Images</Typography>
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <Controller
                                            key={index}
                                            control={control}
                                            name={`images[${index}]`}
                                            render={({ field }) => (
                                                <FormControl fullWidth={true}>
                                                    <InputLabel>Image {index + 1}</InputLabel>
                                                    <OutlinedInput
                                                        type="file"
                                                        onChange={(e) => field.onChange(e.target.files)}
                                                    />
                                                </FormControl>
                                            )}
                                        />
                                    ))}

                                </Grid> */}


                                    <Grid container={true} flexDirection= "column" spacing={4}>
                                        {/* Phần Giá chính thức */}
                                        <Grid item={true} xs={12}>
                                            <Typography variant="h6">
                                                Giá chính thức
                                            </Typography>
                                        </Grid>
                                        {Array.from({ length: 4 }).map((_, index) => (
                                            <Grid container={true} item={true} xs={12} spacing={2} key={index}>
                                                <Grid item={true} xs={12} md={4}>
                                                    <Controller
                                                        control={control}
                                                        name={`officialPriceDTOS[${index}].price`}
                                                        render={({ field }) => (
                                                            <FormControl
                                                                error={Boolean(
                                                                    errors.officialPriceDTOS?.[index]?.price
                                                                )}
                                                                fullWidth={true}
                                                            >
                                                                <InputLabel required={true}>Giá</InputLabel>
                                                                <OutlinedInput {...field} placeholder="Nhập giá" />
                                                                {errors.officialPriceDTOS?.[index]?.price && (
                                                                    <FormHelperText>
                                                                        {errors.officialPriceDTOS[index].price.message}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={4}>
                                                    <Controller
                                                        control={control}
                                                        name={`officialPriceDTOS[${index}].minQuantity`}
                                                        render={({ field }) => (
                                                            <FormControl
                                                                error={Boolean(
                                                                    errors.officialPriceDTOS?.[index]?.minQuantity
                                                                )}
                                                                fullWidth={true}
                                                            >
                                                                <InputLabel required={true}>Số lượng tối thiểu</InputLabel>
                                                                <OutlinedInput
                                                                    {...field}
                                                                    placeholder="Nhập số lượng tối thiểu"
                                                                />
                                                                {errors.officialPriceDTOS?.[index]?.minQuantity && (
                                                                    <FormHelperText>
                                                                        {
                                                                            errors.officialPriceDTOS[index].minQuantity
                                                                                .message
                                                                        }
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item={true} xs={12} md={4}>
                                                    <Controller
                                                        control={control}
                                                        name={`officialPriceDTOS[${index}].maxQuantity`}
                                                        render={({ field }) => (
                                                            <FormControl
                                                                error={Boolean(
                                                                    errors.officialPriceDTOS?.[index]?.maxQuantity
                                                                )}
                                                                fullWidth={true}
                                                            >
                                                                <InputLabel required={true}>Số lượng tối đa</InputLabel>
                                                                <OutlinedInput
                                                                    {...field}
                                                                    placeholder="Nhập số lượng tối đa"
                                                                />
                                                                {errors.officialPriceDTOS?.[index]?.maxQuantity && (
                                                                    <FormHelperText>
                                                                        {
                                                                            errors.officialPriceDTOS[index].maxQuantity
                                                                                .message
                                                                        }
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}

                                        <Grid item={true} xs={12}>
                                            <Typography variant="h6">
                                                Thông tin sản phẩm
                                            </Typography>
                                        </Grid>
                                        <Grid container={true} spacing={2}>
                                            {[
                                                { label: 'Loại lưu trữ', name: 'storageType' },
                                                { label: 'Thời hạn sử dụng', name: 'shelfLife' },
                                                { label: 'Hướng dẫn sử dụng', name: 'instructionForUse' },
                                                { label: 'Màu sắc', name: 'color' },
                                                { label: 'Kích thước', name: 'size' },
                                                { label: 'Trọng lượng', name: 'weight' },
                                                { label: 'Chi tiết đóng gói', name: 'packagingDetails' },
                                                { label: 'Kích thước gói đơn', name: 'singlePackageSize' },
                                            ].map(({ label, name }) => (
                                                <Grid item={true} xs={12} md={6} key={name}>
                                                    <Controller
                                                        control={control}
                                                        name={name}
                                                        render={({ field }) => (
                                                            <FormControl error={Boolean(errors[name])} fullWidth={true}>
                                                                <InputLabel>{label}</InputLabel>
                                                                <OutlinedInput
                                                                    {...field}
                                                                    placeholder={`Nhập ${label.toLowerCase()}`}
                                                                />
                                                                {errors[name] && (
                                                                    <FormHelperText>
                                                                        {errors[name].message}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </CardContent>
                    <CardActions
                    sx={{
                        justifyContent: 'flex-end',
                        gap: 2, 
                        padding: 2, 
                        bgcolor: 'background.default', 
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Button
                        color="inherit"
                        component={RouterLink}
                        href={paths.supplier.products.list}
                        sx={{
                            textTransform: 'none', 
                            borderColor: 'text.secondary',
                            '&:hover': {
                                borderColor: 'text.primary', 
                            },
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        color="inherit"
                        fontWeight="bold"
                        sx={{
                            textTransform: 'none', 
                            boxShadow: 3, 
                            '&:hover': {
                                boxShadow: 6, 
                            },
                        }}
                    >
                        Tạo sản phẩm
                    </Button>
                </CardActions>
                </Card>
            </form>
        </>
    );
}
