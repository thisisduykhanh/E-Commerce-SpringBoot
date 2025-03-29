'use client';
import { Paper, Typography } from '@mui/material';

function PolicyContent({ title, content }) {
    return (
        <Paper
            sx={{
                padding: 3,
                backgroundColor: 'white',
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            }}
        >
            <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: '#1a1a1a !important', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    marginTop: 4,
                    backgroundColor: 'white',
                    color: '#1a1a1a !important',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    fontFamily:
                        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                    '& ul': {
                        fontWeight: 'normal',
                        fontSize: { xs: '1rem', sm: '0.5rem', md: '1rem' },
                        margin: 0,
                    },
                    '& li': {
                        fontWeight: 'normal',
                        fontSize: { xs: '1rem', sm: '0.5rem', md: '1rem' },
                        marginBottom: 1,
                    },
                }}
            >
                {content}
            </Typography>
        </Paper>
    );
}

export default PolicyContent;
