'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

const oAuthProviders = [{ id: 'google', name: 'Google', logo: '/assets/logo-google.svg' }];

const schema = zod.object({
    email: zod.string().min(1, { message: 'Yêu cầu điền email' }).email(),
    password: zod.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự' }),
    nameSupply: zod.string().min(1, { message: 'Yêu cầu điền tên cửa hàng' }),
    address: zod.string().min(1, { message: 'Yêu cầu điền địa chỉ' }),
    deliveryInfo: zod.array(zod.string().min(1, { message: 'Yêu cầu điền thông tin giao hàng' })).min(1, {
        message: 'Cần ít nhất một thông tin giao hàng',
    }),
    terms: zod
        .boolean()
        .refine((value) => value, 'Đồng ý với điều khoản và điều kiện để bắt đầu hành trình cùng chúng tôi!'),
});

const defaultValues = {
    email: '',
    password: '',
    nameSupply: '',
    address: '',
    deliveryInfo: [''],
    terms: false,
};

export function SignUpForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [imageFile, setImageFile] = React.useState(null);
    const [submitted, setSubmitted] = React.useState(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ defaultValues, resolver: zodResolver(schema) });

    // UseFieldArray to manage the deliveryInfo array
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'deliveryInfo', // field array name
    });

    const onAuth = React.useCallback(async (providerId) => {
        setIsPending(true);

        const { error } = await authClient.signInWithOAuth({ provider: providerId });

        if (error) {
            setIsPending(false);
            toast.error(error);
            return;
        }

        setIsPending(false);
    }, []);

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    const onSubmit = React.useCallback(
        async (values) => {
            setIsPending(true);
            setSubmitted(true);

            const formData = new FormData();

            if (imageFile) {
                formData.append('image', imageFile);
            } else {
                toast.error('Vui lòng chọn ảnh!');
                setIsPending(false);
                return;
            }

            // Append form values to FormData
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('nameSupply', values.nameSupply);
            formData.append('address', values.address);

            // Handling deliveryInfo as an array
            values.deliveryInfo.forEach((info, index) => {
                formData.append(`deliveryCreateDTOS[${index}].infor`, info);
            });
            // Send FormData to API
            const { error } = await authClient.signUpSeller(formData);

            if (error) {
                setError('root', { type: 'server', message: error });
                setIsPending(false);
                
            } else {
                // Handle successful registration
                const toastId = toast.success('Đăng ký thành công!', {
                    position: 'top-right',
                    style: {
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                    },
                    duration: 3000,
                    progressBar: true,
                });

                // Redirect to login after success
                setTimeout(() => {
                    toast.dismiss(toastId);
                    router.push('/auth/custom/sign-in');
                }, 3000);
            }
        },
        [router, setError, imageFile]
    );

    return (
        <Stack spacing={4}>
            <div>
                <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
                    <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
                </Box>
            </div>
            <Stack spacing={1}>
                <Typography variant="h5">Đăng ký</Typography>
                <Typography color="text.secondary" variant="body2">
                    Bạn đã có tài khoản?{' '}
                    <Link
                        component={RouterLink}
                        href={paths.auth.seller.signIn}
                        variant="subtitle2"
                        sx={{ color: '#00A6B7' }}
                    >
                        Đăng nhập
                    </Link>
                </Typography>
            </Stack>
            <Stack spacing={3}>
                <Stack spacing={2}>
                    {oAuthProviders.map((provider) => (
                        <Button
                            color="secondary"
                            disabled={isPending}
                            endIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
                            key={provider.id}
                            onClick={() => {
                                onAuth(provider.id).catch(() => {});
                            }}
                            variant="outlined"
                        >
                            Đăng nhập với {provider.name}
                        </Button>
                    ))}
                </Stack>
                <Divider>or</Divider>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.email)}>
                                    <InputLabel> Địa chỉ email</InputLabel>
                                    <OutlinedInput {...field} type="email" />
                                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.password)}>
                                    <InputLabel>Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        endAdornment={
                                            showPassword ? (
                                                <EyeIcon
                                                    cursor="pointer"
                                                    fontSize="var(--icon-fontSize-md)"
                                                    onClick={() => {
                                                        setShowPassword(false);
                                                    }}
                                                />
                                            ) : (
                                                <EyeSlashIcon
                                                    cursor="pointer"
                                                    fontSize="var(--icon-fontSize-md)"
                                                    onClick={() => {
                                                        setShowPassword(true);
                                                    }}
                                                />
                                            )
                                        }
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    {errors.password ? (
                                        <FormHelperText>{errors.password.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="nameSupply"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.nameSupply)}>
                                    <InputLabel>Tên cửa hàng</InputLabel>
                                    <OutlinedInput {...field} />
                                    {errors.nameSupply ? (
                                        <FormHelperText>{errors.nameSupply.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="address"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.address)}>
                                    <InputLabel>Địa chỉ</InputLabel>
                                    <OutlinedInput {...field} />
                                    {errors.address ? <FormHelperText>{errors.address.message}</FormHelperText> : null}
                                </FormControl>
                            )}
                        />

                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Controller
                                        control={control}
                                        name={`deliveryInfo[${index}]`}
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.deliveryInfo?.[index])} fullWidth>
                                                <InputLabel>Thông tin giao hàng {index + 1}</InputLabel>
                                                <OutlinedInput {...field} />
                                                {errors.deliveryInfo?.[index] ? <FormHelperText>
                                                        {errors.deliveryInfo[index]?.message}
                                                    </FormHelperText> : null}
                                            </FormControl>
                                        )}
                                    />
                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => remove(index)}
                                            sx={{ height: 40, alignSelf: 'flex-end' }}
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                </Stack>
                            </div>
                        ))}

                        <Button type="button" onClick={() => append('')}>
                            Thêm thông tin giao hàng
                        </Button>

                        <input type="file" onChange={handleImageUpload} />
                        {imageFile ? <img src={URL.createObjectURL(imageFile)} alt="Selected" width="100" /> : null}
                        {submitted && !imageFile ? <FormHelperText error>Vui lòng chọn ảnh!</FormHelperText> : null}
                        <Controller
                            control={control}
                            name="terms"
                            render={({ field }) => (
                                <div>
                                    <FormControlLabel
                                        control={<Checkbox {...field} />}
                                        label={
                                            <React.Fragment>
                                                Tôi đã đọc và đồng ý với các{' '}
                                                <Link sx={{ color: '#00A6B7' }}>điều khoản và điều kiện.</Link>
                                            </React.Fragment>
                                        }
                                    />
                                    {errors.terms ? (
                                        <FormHelperText error>{errors.terms.message}</FormHelperText>
                                    ) : null}
                                </div>
                            )}
                        />
                        {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                        <Button disabled={isPending} type="submit" variant="contained" sx={{ background: '#00A6B7' }}>
                            Đăng ký tài khoản
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
}
