import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Smiley as SmileyIcon } from '@phosphor-icons/react/dist/ssr/Smiley';

const user = {
    id: 'USR-000',
    name: 'Sofia Rivers',
    avatar: 'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg',
    email: 'sofia@devias.io',
};

export function CommentAdd() {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', backgroundColor: '#fff', color: '#1a1a1a' }}>
            <Avatar src={user.avatar} />
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
                <OutlinedInput multiline={true} placeholder="Type your reply" rows={3} sx={{ borderColor: 'rgba(0, 0, 0, 0.1)', width: '100%' }} />
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <IconButton
                            sx={{
                                backgroundColor: '#008D91',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#006F75',
                                },
                                display: { sm: 'none' },
                            }}
                        >
                            <PlusIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: '#008D91',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#006F75',
                                },
                                display: { xs: 'none', sm: 'inline-flex' },
                            }}
                        >
                            <ImageIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: '#008D91',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#006F75',
                                },
                                display: { xs: 'none', sm: 'inline-flex' },
                            }}
                        >
                            <PaperclipIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: '#008D91',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#006F75',
                                },
                                display: { xs: 'none', sm: 'inline-flex' },
                            }}
                        >
                            <LinkIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                backgroundColor: '#008D91',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#006F75',
                                },
                                display: { xs: 'none', sm: 'inline-flex' },
                            }}
                        >
                            <SmileyIcon />
                        </IconButton>
                    </Stack>

                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                background: '#008D91',
                                color: 'white',
                                '&:hover': {
                                    background: '#006F75',
                                },
                            }}
                        >
                            Đăng
                        </Button>
                    </div>
                </Stack>
            </Stack>
        </Stack>
    );
}
