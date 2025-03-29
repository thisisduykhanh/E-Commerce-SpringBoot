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
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { Option } from '@/components/core/option';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { toast } from '@/components/core/toaster';
import { logger } from '@/lib/default-logger';
import { paths } from '@/paths';

const schema = zod.object({
    name: zod.string().min(1, 'Name is required').max(255),
    handle: zod.string().max(255).optional(),
    category: zod.string().max(255).optional(),
    type: zod.string().max(255).optional(),
    description: zod.string().max(5000).optional(),
    tags: zod.string().max(255).optional(),
});

const defaultValues = {
    name: '',
    handle: '',
    category: '',
    type: 'physical',
    description: '',
    tags: '',
};

export function ProductCreateForm() {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues, resolver: zodResolver(schema) });

    const onSubmit = React.useCallback(
        async (_) => {
            try {
                // Make API request
                toast.success('Sản phẩm đã được tạo');
                router.push(paths.supplier.products.list);
            } catch (err) {
                logger.error(err);
                toast.error('Something went wrong!');
            }
        },
        [router]
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent>
                    <Stack divider={<Divider />} spacing={4}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Thông tin</Typography>
                            <Grid container={true} spacing={3}>
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
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
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name="handle"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.handle)} fullWidth={true}>
                                                <InputLabel>Handle</InputLabel>
                                                <OutlinedInput {...field} />
                                                {errors.handle ? (
                                                    <FormHelperText>{errors.handle.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.category)} fullWidth={true}>
                                                <InputLabel>Danh mục</InputLabel>
                                                <Select {...field}>
                                                    <Option value="">Chọn một danh mục</Option>
                                                    <Option value="Healthcare">Chăm sóc sức khoẻ</Option>
                                                    <Option value="Makeup">Trang điểm</Option>
                                                    <Option value="Skincare">Chăm sóc da</Option>
                                                </Select>
                                                {errors.category ? (
                                                    <FormHelperText error={true}>
                                                        {errors.category.message}
                                                    </FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.type)} fullWidth={true}>
                                                <InputLabel>Loại</InputLabel>
                                                <Select {...field}>
                                                    <Option value="physical">Vật lý</Option>
                                                    <Option value="digital">Kỹ thuật số</Option>
                                                    <Option value="service">Dịch vụ</Option>
                                                </Select>
                                                {errors.type ? (
                                                    <FormHelperText error={true}>{errors.type.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Controller
                                        control={control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.description)} fullWidth={true}>
                                                <InputLabel>Mô tả</InputLabel>
                                                <Box sx={{ mt: '8px', '& .tiptap-container': { height: '400px' } }}>
                                                    <TextEditor
                                                        content={field.value ?? ''}
                                                        onUpdate={({ editor }) => {
                                                            field.onChange(editor.getText());
                                                        }}
                                                        placeholder="Mô tả sản phẩm"
                                                    />
                                                </Box>
                                                {errors.description ? (
                                                    <FormHelperText error={true}>
                                                        {errors.description.message}
                                                    </FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Controller
                                        control={control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.name)} fullWidth={true}>
                                                <InputLabel>Thẻ</InputLabel>
                                                <OutlinedInput {...field} placeholder="e.g Hiện đại, Sạch sẽ, v.v" />
                                                {errors.name ? (
                                                    <FormHelperText>{errors.name.message}</FormHelperText>
                                                ) : (
                                                    <FormHelperText>
                                                        Các thẻ phải được phân tách bằng dấu phẩy
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button color="secondary" component={RouterLink} href={paths.supplier.products.list}>
                        Huỷ
                    </Button>
                    <Button type="submit" variant="contained">
                        Tạo sản phẩm
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
