'use client';

import * as React from 'react';
import RouterLink from 'next/link';
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
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

const oAuthProviders = [{ id: 'google', name: 'Google', logo: '/assets/logo-google.svg' }];

const schema = zod.object({
    firstName: zod.string().min(1, { message: 'First name is required' }),
    lastName: zod.string().min(1, { message: 'Last name is required' }),
    email: zod.string().min(1, { message: 'Email is required' }).email(),
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false };

export function SignUpForm() {
    const [firebaseAuth] = React.useState(getFirebaseAuth());

    const [isPending, setIsPending] = React.useState(false);

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ defaultValues, resolver: zodResolver(schema) });

    const onAuth = React.useCallback(
        async (providerId) => {
            setIsPending(true);

            let provider;

            switch (providerId) {
                case 'google':
                    provider = new GoogleAuthProvider();
                    break;
                default:
                    throw new Error(`Unknown provider: ${providerId}`);
            }

            try {
                await signInWithPopup(firebaseAuth, provider);
                // UserProvider will handle Router refresh
                // After refresh, GuestGuard will handle the redirect
            } catch (err) {
                setIsPending(false);
                toast.error(err.message);
            }
        },
        [firebaseAuth]
    );

    const onSubmit = React.useCallback(
        async (values) => {
            setIsPending(true);

            try {
                await createUserWithEmailAndPassword(firebaseAuth, values.email, values.password);
                // UserProvider will handle Router refresh
                // After refresh, GuestGuard will handle the redirect
            } catch (err) {
                setError('root', { type: 'server', message: err.message });
                setIsPending(false);
            }
        },
        [firebaseAuth, setError]
    );

    return (
        <Stack spacing={4}>
            <div>
                <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
                    <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
                </Box>
            </div>
            <Stack spacing={1}>
                <Typography variant="h5">Sign up</Typography>
                <Typography color="text.secondary" variant="body2">
                    Already have an account?{' '}
                    <Link component={RouterLink} href={paths.auth.firebase.signIn} variant="subtitle2">
                        Sign in
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
                            Continue with {provider.name}
                        </Button>
                    ))}
                </Stack>
                <Divider>or</Divider>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.firstName)}>
                                    <InputLabel>First name</InputLabel>
                                    <OutlinedInput {...field} />
                                    {errors.firstName ? (
                                        <FormHelperText>{errors.firstName.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.lastName)}>
                                    <InputLabel>Last name</InputLabel>
                                    <OutlinedInput {...field} />
                                    {errors.lastName ? (
                                        <FormHelperText>{errors.lastName.message}</FormHelperText>
                                    ) : null}
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormControl error={Boolean(errors.email)}>
                                    <InputLabel>Email address</InputLabel>
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
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput {...field} type="password" />
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
                                                I have read the <Link>terms and conditions</Link>
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
                        <Button disabled={isPending} type="submit" variant="contained">
                            Create account
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    );
}
