'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import { UserContext } from '@/contexts/auth/custom/user-context';

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
    email: zod.string().min(1, { message: 'Yêu cầu điền email' }).email(),
    password: zod.string().min(6, { message: 'Mật khẩu phải ít nhất 6 kí tự' }),
});

const defaultValues = { email: '', password: '' };

export function SignInForm() {
    const { setUser } = React.useContext(UserContext);
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);

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

            const response = await authClient.signInWithPassword(values);

            if (response.error) {
                setError('root', { type: 'server', message: response.error });
                setIsPending(false);
                return;
            }

            const { token, role } = response;

            const lowerCaseRole = role.toLowerCase();
            const roleLogin = lowerCaseRole === 'admin' ? 'dashboard' : lowerCaseRole; 
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', roleLogin);
            setUser ( {
                token: token,
                role: roleLogin,
            });


            const toastId = toast.success('Đăng nhập thành công!', {
                position: 'top-right',
                style: {
                    backgroundColor: '#4caf50',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                },
                duration: 2000,
                progressBar: true,
            });

            toast.dismiss(toastId);

            switch (lowerCaseRole) {
                case 'admin':
                    router.push('/dashboard/products');
                    break;
                case 'user':
                    router.push('/user/dashboard/orders');
                    break;
                case 'supplier':
                    router.push('/supplier/products');
                    break;
                default:
                    router.push('/auth/custom/sign-in');
                    break;
            }
            setIsPending(false);
        },
        [router, setError]
    );

    return (
        <Stack spacing={4}>
            <div>
                <Box
                    component={RouterLink}
                    href={paths.home}
                    sx={{
                        display: 'inline-block',
                        fontSize: 0,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    <Link href={paths.user} passHref={true}>
                        <DynamicLogo colorDark="light" colorLight="dark" height={35} width={122} />
                    </Link>
                </Box>
            </div>
            <Stack spacing={1}>
                <Typography variant="h5">Đăng nhập</Typography>
                <Typography color="text.secondary" variant="body2">
                    Chưa có tài khoản?{' '}
                    <Link
                        component={RouterLink}
                        href={paths.auth.custom.signUp}
                        variant="subtitle2"
                        sx={{ color: '#00A6B7' }}
                    >
                        Đăng ký
                    </Link>
                </Typography>
            </Stack>
            <Stack spacing={3}>
                <Stack spacing={2}>
                    {oAuthProviders.map((provider) => (
                        <Button
                            color="secondary"
                            disabled={isPending}
                            endIcon={<Box alt="" component="img" src={provider.logo} height={24} width={24} />}
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
                <Divider>or</Divider>
                <Stack spacing={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
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
                            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="contained"
                                sx={{ background: '#00A6B7' }}
                            >
                                Đăng nhập
                            </Button>
                        </Stack>
                    </form>
                    <div>
                        <Link
                            component={RouterLink}
                            href={paths.auth.custom.resetPassword}
                            variant="subtitle2"
                            sx={{ color: '#00A6B7' }}
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                </Stack>
            </Stack>
            {/* <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert> */}
        </Stack>
    );
}
