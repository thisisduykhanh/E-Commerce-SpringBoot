'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { paths } from '@/paths';
import { useCallback } from 'react';

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new Error('Error converting file to base64'));
        };
    });
}



const schema = zod.object({
    name: zod.string().min(1, 'Tên sản phẩm là bắt buộc').max(255),
    handle: zod.string().max(255).optional(),
    category: zod.string().max(255).optional(),
    type: zod.string().max(255).optional(),
    description: zod.string().max(5000).optional(),
    tags: zod.string().max(255).optional(),
    currency: zod.string().min(1, 'Đơn vị tiền tệ là bắt buộc').max(255),
    price: zod.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
    images: zod.array(zod.object({ id: zod.string(), url: zod.string(), fileName: zod.string() })),
    sku: zod.string().max(255).optional(),
    barcode: zod.string().max(255).optional(),
    quantity: zod.number().min(0, 'Số lượng phải lớn hơn hoặc bằng 0'),
    backorder: zod.boolean().optional(),
    height: zod.number().min(0, 'Chiều cao phải lớn hơn hoặc bằng 0').optional(),
    width: zod.number().min(0, 'Chiều rộng phải lớn hơn hoặc bằng 0').optional(),
    length: zod.number().min(0, 'Chiều dài phải lớn hơn hoặc bằng 0').optional(),
    weight: zod.number().min(0, 'Khối lượng phải lớn hơn hoặc bằng 0').optional(),
});
function getDefaultValues(product) {
    return {
        id: product.id ?? 0,
        name: product.nameProduct ?? '',
        price: product.price ?? 0,
        description: product.description ?? '',
        nameProductType: product.nameProductType ?? '',
        listImage: product.listImage ?? [],
        officialPriceDTO: product.officialPriceDTO ?? [],

        storageType: product.storageType ?? '',
        shelfLife: product.shelfLife ?? '',
        instructionForUse: product.instructionForUse ?? '',
        color: product.color ?? '',
        size: product.size ?? '',
        weight: product.weight ?? '',
        packagingDetails: product.packagingDetails ?? '',
        singlePackageSize: product.singlePackageSize ?? '',
    };
}

export function ProductEditForm({ product }) {
    const _router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useForm({ defaultValues: getDefaultValues(product.productsDetail), resolver: zodResolver(schema) });
    const [formData, setFormData] = React.useState(new FormData());
    const handleImageChange = (index, files) => {
        const newFormData = new FormData(formData);
        newFormData.set(`images[${index}]`, files[0]);
        setFormData(newFormData);
    };

    const onSubmit = useCallback(async (event) => {
        console.log('Form :', event);

        // Lấy dữ liệu từ các trường của form

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

        event.officialPriceDTO.forEach((item, index) => {
            formData.append(`officialPriceDTO[${index}].price`, item.price);
            formData.append(`officialPriceDTO[${index}].minQuantity`, item.minQuantity);
            formData.append(`officialPriceDTO[${index}].maxQuantity`, item.maxQuantity);
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
    React.useEffect(() => {
        if (product && product.productsDetail) {
            const defaultValues = getDefaultValues(product.productsDetail);
            Object.entries(defaultValues).forEach(([key, value]) => {
                setValue(key, value); // Cập nhật từng trường
            });
        }
    }, [product, setValue]);
    const description = watch('description', '');


    const _handleImageDrop = React.useCallback(
        async (files) => {
            // Upload images to the server

            const images = await Promise.all(
                files.map(async (file) => {
                    const url = await fileToBase64(file);

                    return { id: `IMG-${Date.now()}`, url, fileName: file.name };
                })
            );

            setValue('images', [...getValues('images'), ...images]);
        },
        [getValues, setValue]
    );

    const _handleImageRemove = React.useCallback(
        (imageId) => {
            setValue(
                'images',
                getValues('images').filter((image) => image.id !== imageId)
            );
        },
        [getValues, setValue]
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent>
                    <Stack divider={<Divider />} spacing={4}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Thông tin cơ bản</Typography>
                            <Grid container={true} spacing={3}>
                                <Grid item={true} md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.name)} fullWidth={true}>
                                                <InputLabel required={true}>Tên sản phẩm</InputLabel>
                                                <OutlinedInput {...field} />
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
                                                <OutlinedInput {...field} />

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
                                        name="nameProductType"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.price)} fullWidth={true}>
                                                <InputLabel required={true}>Loại sản phẩm</InputLabel>
                                                <OutlinedInput {...field} />

                                                {errors.price ? (
                                                    <FormHelperText>{errors.price.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item={true} xs={12} width="100%">
                                    <Controller
                                        control={control}
                                        name="description"
                                        defaultValue={description || ''}
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.description)} fullWidth={true}>
                                                <InputLabel>Mô tả</InputLabel>
                                                <Box sx={{ mt: '8px', '& .tiptap-container': { height: '200px' } }}>
                                                    <TextEditor
                                                        content={description || ''}
                                                        onUpdate={({ editor }) => {
                                                            field.onChange(editor.getText());
                                                        }}
                                                        placeholder="Nhập mô tả..."
                                                        {...field}
                                                    />
                                                </Box>
                                                {errors.description ? (
                                                    <FormHelperText>{errors.description.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*   <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormControl error={Boolean(errors.tags)} fullWidth>
                                            <InputLabel>Tags</InputLabel>
                                            <OutlinedInput {...field} placeholder="e.g. Modern, Clean, etc" />
                                            {errors.tags ? (
                                                <FormHelperText>{errors.tags.message}</FormHelperText>
                                            ) : (
                                                <FormHelperText>Tags must be separated by commas</FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </Grid> */}
                                <Grid item={true} xs={12}>
                                    <Typography variant="h6" gutterBottom={true}>
                                        Hình ảnh
                                    </Typography>
                                    <Grid container={true} rowSpacing={2} columnSpacing={18}>
                                        {Array.isArray(product.productsDetail.listImage) &&
                                            product.productsDetail.listImage.map((image, index) => (
                                                <Grid item={true} xs={12} sm={6} md={3} key={index}>
                                                    <FormControl fullWidth={true}>
                                                        <Box display="flex" flexDirection="column" alignItems="center">
                                                            <InputLabel shrink={true} style={{ marginBottom: '8px' }}>
                                                                Hình {index + 1}
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                type="file"
                                                                onChange={(e) =>
                                                                    handleImageChange(index, e.target.files)
                                                                }
                                                                inputProps={{
                                                                    accept: 'image/*',
                                                                }}
                                                                style={{
                                                                    padding: '8px',
                                                                    borderRadius: '8px',
                                                                }}
                                                            />
                                                        </Box>
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
                                                                src={image.url}
                                                                alt={`Images ${index + 1}`}
                                                                style={{
                                                                    maxWidth: '100%',
                                                                    maxHeight: '100%',
                                                                    objectFit: 'contain',
                                                                }}
                                                            />
                                                        </Box>
                                                    </FormControl>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Grid>

                                <Grid container={true} flexDirection="column" spacing={2}>
                                    {/* Section: Giá chỉnh thức */}
                                    <Grid item={true} xs={12}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                            Giá chỉnh thức
                                        </Typography>
                                        {Array.from({ length: 4 }).map((_, index) => (
                                            <Grid container={true} spacing={3} key={index}>
                                                <Grid item={true} md={4} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        name={`officialPriceDTO.${index}.price`}
                                                        render={({ field }) => (
                                                            <FormControl
                                                                error={Boolean(errors.officialPriceDTO?.[index]?.price)}
                                                                fullWidth={true}
                                                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                                            >
                                                                <InputLabel required={true}>Giá</InputLabel>
                                                                <OutlinedInput
                                                                    {...field}
                                                                />
                                                                {errors.officialPriceDTO?.[index]?.price && (
                                                                    <FormHelperText>
                                                                        {errors.officialPriceDTO[index].price.message}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item={true} md={4} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        name={`officialPriceDTO.${index}.minQuantity`}
                                                        render={({ field }) => (
                                                            <FormControl
                                                                error={Boolean(
                                                                    errors.officialPriceDTO?.[index]?.minQuantity
                                                                )}
                                                                fullWidth={true}
                                                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                                            >
                                                                <InputLabel required={true}>
                                                                    Số lượng tối thiểu
                                                                </InputLabel>
                                                                <OutlinedInput
                                                                    {...field}
                                                                />
                                                                {errors.officialPriceDTO?.[index]?.minQuantity && (
                                                                    <FormHelperText>
                                                                        {
                                                                            errors.officialPriceDTO[index].minQuantity
                                                                                .message
                                                                        }
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item={true} md={4} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        name={`officialPriceDTO.${index}.maxQuantity`}
                                                        render={({ field }) => (
                                                            <FormControl
                                                                error={Boolean(
                                                                    errors.officialPriceDTO?.[index]?.maxQuantity
                                                                )}
                                                                fullWidth={true}
                                                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                                                            >
                                                                <InputLabel required={true}>Số lượng tối đa</InputLabel>
                                                                <OutlinedInput
                                                                    {...field}
                                                                />
                                                                {errors.officialPriceDTO?.[index]?.maxQuantity && (
                                                                    <FormHelperText>
                                                                        {
                                                                            errors.officialPriceDTO[index].maxQuantity
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
                                    </Grid>

                                    {/* Section: Thông tin sản phẩm */}
                                    <Grid item={true} xs={12} sx={{ mt: 2 }}>
                                        <Typography variant="h6" sx={{ mb: 0, fontWeight: 'bold' }}>
                                            Thông tin sản phẩm
                                        </Typography>
                                    </Grid>

                                    <Grid container={true} spacing={3}>

                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="storageType"
                                                defaultValue={product.productsDetail.storageType ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.storageType)} fullWidth={true}>
                                                        <InputLabel>Loại lưu trữ</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.storageType} onChange={field.onChange} />
                                                        {errors.storageType && (
                                                            <FormHelperText>
                                                                {errors.storageType.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="shelfLife"
                                                defaultValue={product.productsDetail.shelfLife ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.shelfLife)} fullWidth={true}>
                                                        <InputLabel>Hạn sử dụng</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.shelfLife} onChange={field.onChange} />
                                                        {errors.shelfLife && (
                                                            <FormHelperText>
                                                                {errors.shelfLife.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="instructionForUse"
                                                defaultValue={product.productsDetail.instructionForUse ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.instructionForUse)} fullWidth={true}>
                                                        <InputLabel>Hướng dẫn sử dụng</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.instructionForUse} onChange={field.onChange} />
                                                        {errors.instructionForUse && (
                                                            <FormHelperText>
                                                                {errors.instructionForUse.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="color"
                                                defaultValue={product.productsDetail.color ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.color)} fullWidth={true}>
                                                        <InputLabel>Màu sắc</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.color} onChange={field.onChange} />
                                                        {errors.color && (
                                                            <FormHelperText>
                                                                {errors.color.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="size"
                                                defaultValue={product.productsDetail.size ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.size)} fullWidth={true}>
                                                        <InputLabel>Kích thước</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.size} onChange={field.onChange} />
                                                        {errors.size && (
                                                            <FormHelperText>
                                                                {errors.size.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="weight"
                                                defaultValue={product.productsDetail.weight ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.weight)} fullWidth={true}>
                                                        <InputLabel>Trọng lượng</InputLabel>
                                                        <OutlinedInput {...field} onChange={(e) => {
                                                            const value = parseFloat(e.target.value);
                                                            field.onChange(isNaN(value) ? '' : value); // Chuyển chuỗi thành số, nếu không hợp lệ thì để chuỗi rỗng
                                                        }}
                                                            type="number" />
                                                        {errors.weight && (
                                                            <FormHelperText>
                                                                {errors.weight.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="packagingDetails"
                                                defaultValue={product.productsDetail.packagingDetails ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.packagingDetails)} fullWidth={true}>
                                                        <InputLabel>Chi tiết đóng gói</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.packagingDetails} onChange={field.onChange} />
                                                        {errors.packagingDetails && (
                                                            <FormHelperText>
                                                                {errors.packagingDetails.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Controller
                                                control={control}
                                                name="singlePackageSize"
                                                defaultValue={product.productsDetail.singlePackageSize ?? ''}
                                                render={({ field }) => (
                                                    <FormControl error={Boolean(errors.singlePackageSize)} fullWidth={true}>
                                                        <InputLabel>Kích thước gói</InputLabel>
                                                        <OutlinedInput {...field} value={product.productsDetail.singlePackageSize} onChange={field.onChange} />
                                                        {errors.singlePackageSize && (
                                                            <FormHelperText>
                                                                {errors.singlePackageSize.message}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>


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
                        Sửa sản phẩm
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
