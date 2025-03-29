import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import * as React from 'react';
import { getUser } from '@/services/auth';



export function MessageBox({ message }) {
    const [user, setUser] = React.useState({
        id: '',
        nameSupply: '',
        status: false,
        address: '',
        image: '',
        nameDelivery: [],
        nameProductType: [],
        email: '',
        phone: '',
        block: false,
        createDate: '',
        supplierStatus: ''
    });
    

    
           /*  const { client } = React.useContext(WebSocketContext); */
             React.useEffect(() => { const fetchUser = async () => { 
                   const userData = await getUser(); 
                   setUser(userData.data);
                }; 
                fetchUser(); 
               }, []);
               const position = user && message.userSend === user.email ? 'right' : 'left';


    return (
        <Box sx={{ alignItems: position === 'right' ? 'flex-end' : 'flex-start', flex: '0 0 auto', display: 'flex' }}>
            <Stack
                direction={position === 'right' ? 'row-reverse' : 'row'}
                spacing={2}
                sx={{
                    alignItems: 'flex-start',
                    maxWidth: '500px',
                    ml: position === 'right' ? 'auto' : 0,
                    mr: position === 'left' ? 'auto' : 0,
                }}
            >
                <Avatar src={"/assets/avatar.png"} sx={{ '--Avatar-size': '32px' }} />
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Card
                        sx={{
                            px: 2,
                            py: 1,
                            ...(position === 'right' && {
                                bgcolor: 'var(--mui-palette-primary-main)',
                                color: 'var(--mui-palette-primary-contrastText)',
                            }),
                        }}
                    >
                        <Stack spacing={1}>
                            <div>
                                <Link color="inherit" sx={{ cursor: 'pointer' }} variant="subtitle2">
                                    {message.userSend}
                                </Link>
                            </div>
                            {/* {message.type === 'image' ? (
                                <CardMedia
                                    image={message.content}
                                    onClick={() => {
                                        // open modal
                                    }}
                                    sx={{ height: '200px', width: '200px' }}
                                />
                            ) : null} */}
                           {/*  {message.type === 'text' ? ( */}
                                <Typography color="inherit" variant="body1">
                                    {message.content}
                                </Typography>
                            {/* ) : null} */}
                        </Stack>
                    </Card>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
                            px: 2,
                        }}
                    >
                        <Typography color="text.secondary" noWrap={true} variant="caption">
                            {dayjs(message.createdAt).fromNow()}
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}
