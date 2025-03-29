import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

const user = {
    id: 'USR-000',
    name: 'admin',
    avatar: '/assets/avatar.png',
    email: 'sofia@devias.io',
};

function getDisplayContent(lastMessage, _userId) {
    const author = 'Me: ' ;
    const message = lastMessage;

    return `${author}${message}`;
}

export function ThreadItem({ active = false, thread, messages, onSelect, groupChat }) {
    const recipients = (thread.userGroupDTOList ?? []).filter((participant) => participant.name !== user.name);

    const lastMessage =thread.content;
    

    return (
        <Box component="li" sx={{ userSelect: 'none' }}>
            <Box
                onClick={onSelect}
                onKeyUp={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        onSelect?.();
                    }
                }}
                role="button"
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    flex: '0 0 auto',
                    gap: 1,
                    p: 1,
                    ...(active && { bgcolor: 'var(--mui-palette-action-selected)' }),
                    '&:hover': { ...(!active && { bgcolor: 'var(--mui-palette-action-hover)' }) },
                }}
                tabIndex={0}
            >
                <div>
                    <AvatarGroup
                        max={2}
                        sx={{
                            '& .MuiAvatar-root': {
                                fontSize: 'var(--fontSize-xs)',
                                ...(thread.type === 'group'
                                    ? { height: '24px', ml: '-16px', width: '24px', '&:nth-of-type(2)': { mt: '12px' } }
                                    : { height: '36px', width: '36px' }),
                            },
                        }}
                    >
                        {recipients.map((recipient) => (
                            <Avatar key={recipient.id} src={recipient.avatar} />
                        ))}
                    </AvatarGroup>
                </div>
                <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
                    <Typography noWrap={true} variant="subtitle2">
                        {recipients.map((recipient) => recipient.name).join(', ')}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {(thread.unreadCount ?? 0) > 0 ? (
                            <Box
                                sx={{
                                    bgcolor: 'var(--mui-palette-primary-main)',
                                    borderRadius: '50%',
                                    flex: '0 0 auto',
                                    height: '8px',
                                    width: '8px',
                                }}
                            />
                        ) : null}
                        {lastMessage ? (
                            <Typography
                                color="text.secondary"
                                noWrap={true}
                                sx={{ flex: '1 1 auto' }}
                                variant="subtitle2"
                            >
                                {getDisplayContent(lastMessage)}
                            </Typography>
                        ) : null}
                    </Stack>
                </Box>
                {lastMessage ? (
                    <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                        {dayjs(thread.createdAt).fromNow()}
                    </Typography>
                ) : null}
            </Box>
        </Box>
    );
}
