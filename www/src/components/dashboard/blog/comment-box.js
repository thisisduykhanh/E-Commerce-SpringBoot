import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

export function CommentBox({ comment }) {
    return (
        <Stack direction="row" spacing={2} sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', alignItems: 'flex-start' }}>
            <Avatar src={comment.author.avatar} />
            <Box sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 1, p: 2, flex: '1 1 auto' }}>
                <Stack spacing={1}>
                    <Box sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)',alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">{comment.author.name}</Typography>
                        <Typography color="text.secondary" variant="caption">
                            {dayjs(comment.createdAt).fromNow()}
                        </Typography>
                    </Box>
                    <Typography sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}} variant="body2">{comment.content}</Typography>
                </Stack>
            </Box>
        </Stack>
    );
}
