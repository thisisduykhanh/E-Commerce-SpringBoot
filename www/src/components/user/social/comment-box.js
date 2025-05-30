import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

export function CommentBox({ comment }) {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', backgroundColor: '#fff', color: '#1a1a1a' }}>
            <Avatar src={comment.author.avatar} sx={{ cursor: 'pointer' }} />
            <Stack spacing={1} sx={{ borderRadius: 1, flex: '1 1 auto', p: 2 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Link sx={{ color: '#1a1a1a' }} variant="subtitle2">
                        {comment.author.name}
                    </Link>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Typography color="text.secondary" variant="caption">
                        {dayjs(comment.createdAt).fromNow()}
                    </Typography>
                </Stack>
                <Typography variant="body2">{comment.content}</Typography>
            </Stack>
        </Stack>
    );
}
