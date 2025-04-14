'use client';

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
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';
import { authClient } from '@/lib/auth/custom/client';
import { paths } from '@/paths';

const oAuthProviders = [{ id: 'google', name: 'Google', logo: '/assets/logo-google.svg' }];

const schema = zod.object({
    fullName: zod.string().min(1, { message: 'Yêu cầu điền họ tên' }),
    phone: zod
        .string()
        .min(1, { message: 'Yêu cầu điền số điện thoại' })
        .regex(/^\d+$/, { message: 'Số điện thoại chỉ được chứa các chữ số' })
        .length(10, { message: 'Số điện thoại phải đủ 10 chữ số' }),

    email: zod.string().min(1, { message: 'Yêu cầu điền email' }).email(),
    password: zod.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự' }),
    terms: zod
        .boolean()
        .refine((value) => value, 'Đồng ý với điều khoản và điều kiện để bắt đầu hành trình cùng chúng tôi!'),
});

const defaultValues = { fullName: '', phone: '', email: '', password: '', terms: false };

export function SignUpForm() {
    const router = useRouter();

    // const { checkSession } = useUser();
    const [showPassword, setShowPassword] = React.useState();

    const [isPending, setIsPending] = React.useState(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ defaultValues, resolver: zodResolver(schema) });

    const onAuth = React.useCallback(async (providerId) => {
        setIsPending(true);

        const { error } = await authClient.signInWithOAuth({ provider: providerId });

        if (error) {
            setIsPending(false);
            toast.error(error);
            return;
        }

        setIsPending(false);

        // Redirect to OAuth provider
    }, []);

    const onSubmit = React.useCallback(
        async (values) => {
            setIsPending(true);

            const { error } = await authClient.signUp(values);

            if (error) {
                setError('root', { type: 'server', message: error });
                setIsPending(false);
                return;
            }

            // Thông báo đăng ký thành công với thanh tiến trình
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

            // Sau khi thông báo hoàn tất (5000ms), chuyển hướng tới trang đăng nhập
            setTimeout(() => {
                toast.dismiss(toastId);
                router.push('/auth/custom/sign-in');
            }, 3000);
        },
        [router, setError]
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
                        href={paths.auth.custom.signIn}
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
                                onAuth(provider.id).catch(() => {
                                    // noop
                                });
                            }}
                            variant="outlined"
                        >
                            Đăng nhập với {provider.name}
                        </Button>
                    ))}
                </Stack>
                <Divider>hoặc</Divider>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            control={control}
                            name="fullName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.fullName)}>
                                    <InputLabel>Họ tên</InputLabel>
                                    <OutlinedInput {...field} />
                                    {errors.fullName ? (
                                        <FormHelperText>{errors.fullName.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.phone)}>
                                    <InputLabel htmlFor="phone-input">Số điện thoại</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        id="phone-input"
                                        type="text"
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); // Removes non-numeric characters
                                            field.onChange(value);
                                        }}
                                    />
                                    {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
                                </FormControl>
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.email)}>
                                    <InputLabel>Địa chỉ email</InputLabel>
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
            {/* <Alert color="warning">Created users are not persisted</Alert> */}
        </Stack>
    );
}
