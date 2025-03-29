import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Typography,
    Avatar,
    Rating,
    Pagination,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const ProductTabs = ({ productDetail, productDescription, reviews }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const currentData = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (_event, value) => {
        setCurrentPage(value);
    };

    const handleTabChange = (_event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    marginBottom: '20px',
                    borderBottom: '1px solid #B3B3B3',
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#00A6B7',
                        height: '3px',
                    },
                    color: '#000',
                }}
            >
                <Tab
                    label="Mô tả"
                    sx={{
                        textTransform: 'none',
                        fontWeight: activeTab === 0 ? 'bold' : 'normal',
                        color: activeTab === 0 ? '#000 !important' : '#555',
                    }}
                />
                <Tab
                    label="Đánh giá"
                    sx={{
                        textTransform: 'none',
                        fontWeight: activeTab === 1 ? 'bold' : 'normal',
                        color: activeTab === 1 ? '#000 !important' : '#555',
                    }}
                />
                <Tab
                    label="Công ty"
                    sx={{
                        textTransform: 'none',
                        fontWeight: activeTab === 2 ? 'bold' : 'normal',
                        color: activeTab === 2 ? '#000 !important' : '#555',
                    }}
                />
                <Tab
                    label="Chứng nhận"
                    sx={{
                        textTransform: 'none',
                        fontWeight: activeTab === 3 ? 'bold' : 'normal',
                        color: activeTab === 3 ? '#000 !important' : '#555',
                    }}
                />
            </Tabs>
            {activeTab === 0 && (
                <Box>
                    <Typography variant="body1">{productDescription}</Typography>
                </Box>
            )}
            {activeTab === 1 && (
                <Box>
                    {currentData.map((review, index) => (
                        <Card key={index} sx={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Avatar src={review.avatar} sx={{ marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">{review.name}</Typography>
                                        <Rating value={review.rating} readOnly={true} />
                                    </Box>
                                </Box>
                                <Typography variant="body2">{review.comment}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <Pagination
                        count={Math.ceil(reviews.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                    />
                </Box>
            )}
            {activeTab === 2 && (
                <Box>
                    <Typography variant="body1">{productDetail.company}</Typography>
                </Box>
            )}
            {activeTab === 3 && (
                <Box>
                    <List>
                        {productDetail.certifications.map((certification, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckCircleIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={certification} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};
