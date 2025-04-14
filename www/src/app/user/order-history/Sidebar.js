import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

function Sidebar({ menuItems, selectedMenu, setSelectedMenu }) {
    return (
        <Box
            sx={{
                bgcolor: '#fff',
                height: '100%',
                color: 'black',
                borderRadius: 2,
                boxShadow: 2,
                p: '0 !important', // Override padding
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    p: '0 !important', // Override padding
                }}
            >
                <Box
                    component="img"
                    src="https://via.placeholder.com/50"
                    alt="Avatar"
                    sx={{
                        width: 50,
                        height: 50,
                        mr: 2,
                    }}
                />
                <Typography variant="h6" fontWeight="bold">
                    Wendy
                </Typography>
            </Box>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        selected={selectedMenu === item}
                        onClick={() => setSelectedMenu(item)}
                        sx={{
                            bgcolor: selectedMenu === item ? '#f0f0f0' : 'transparent',
                            borderRadius: 1,
                            border: selectedMenu === item ? '1px solid #ddd' : '1px solid transparent',
                            mb: 1,
                            '&:hover': {
                                bgcolor: '#f7f7f7',
                                border: '1px solid #ddd',
                            },
                            marginBottom: 0,
                        }}
                    >
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Sidebar;
