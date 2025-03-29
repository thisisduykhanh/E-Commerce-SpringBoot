'use client';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 150;
const WIDTH = 150;

export function Logo({ height = HEIGHT, width = WIDTH }) {
    // let url ;

    // if (emblem) {
    //     url = color === 'light' ? '/logo/2.png' : '/logo/1.png';
    // } else {
    //     url = color === 'light' ? '/logo/2.png' : '/logo/1.png';
    // }
    const url = '/img/image/logo/asizon.svg';

    return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export function DynamicLogo({ colorDark = 'light', colorLight = 'dark', height = HEIGHT, width = WIDTH, ...props }) {
    const { colorScheme } = useColorScheme();
    const color = colorScheme === 'dark' ? colorDark : colorLight;

    return (
        <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
            <Logo color={color} height={height} width={width} {...props} />
        </NoSsr>
    );
}
