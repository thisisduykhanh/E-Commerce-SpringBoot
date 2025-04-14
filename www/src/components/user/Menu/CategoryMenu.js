import { logger } from '@/lib/default-logger';
import { fetchCategories } from '@/services/category-service';

import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Popper,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@mui/material';

import { SquaresFour } from '@phosphor-icons/react';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function CategoryMenu({ selectedTab, handleTabChange }) {
    const availableTabs = React.useMemo(
        () => [
            { label: 'Trang chủ', value: 0 },
            { label: 'Sản phẩm', value: 1 },
        ],
        []
    );

    const filteredTabs = React.useMemo(
        () => availableTabs.filter((tab) => tab.value >= 0 && tab.value <= 1),
        [availableTabs]
    );
    const [categories] = React.useState(() => {
        // Check if window is defined to ensure localStorage is accessible
        if (typeof window !== 'undefined') {
            const savedCategories = localStorage.getItem('categories');
            return savedCategories ? JSON.parse(savedCategories) : [];
        }
        return [];
    });
    const [activeSubCategories, setActiveSubCategories] = React.useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const currentPath = usePathname();
    const router = useRouter();
    const menuButtonRef = React.useRef(null);
    const firstCategoryRef = React.useRef(null);
    const [activeCategoryTitle, setActiveCategoryTitle] = React.useState('');

    const fetchCategories2 = React.useCallback(async () => {
        if (categories.length > 0) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetchCategories();
            if (response?.data) {
                localStorage.setItem('categories', JSON.stringify(response.data));
            } else {
                logger.error('No category data found');
            }
        } catch (error) {
            logger.error('Failed to fetch categories', error);
        } finally {
            setLoading(false);
        }
    }, [categories]);

    React.useEffect(() => {
        setMenuOpen(true);
        setOpen(false);

        fetchCategories2();
    }, [fetchCategories2]);

    React.useEffect(() => {
        if (['/user/product', '/user/SupplierList'].includes(currentPath)) {
            setMenuOpen(false);
            setOpen(false);
        }
    }, [currentPath]);

    const handleSubMenuOpen = (_event, subCategories, categoryTitle) => {
        setActiveSubCategories(subCategories);
        setActiveCategoryTitle(categoryTitle);
        setMenuAnchorEl(firstCategoryRef.current);
        setOpen(true); // Mở Popper khi chọn danh mục con
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
        setOpen(false); // Đóng Popper
    };

    const handleTabChangeInternal = (event, newValue) => {
        handleTabChange(event, newValue);

        const routes = {
            0: '/user',
            1: '/user/product'
        };

        if (routes[newValue]) {
            router.push(routes[newValue]);
            setMenuOpen(false); // Đóng menu khi chuyển tab
            setOpen(false); // Đóng Popper khi chuyển tab
        }
    };

    const shouldShowCategoryMenu = React.useMemo(
        () => ['/user', '/user/product', '/user/SupplierList'].includes(currentPath),
        [currentPath]
    );

    return (
        shouldShowCategoryMenu && (
            <Toolbar
                className="layout-container"
                sx={{
                    paddingX: '0 !important',
                    justifyContent: 'space-between',
                    minHeight: '48px',
                    backgroundColor: '#FFF',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        ref={menuButtonRef}
                        sx={{
                            color: '#1a1a1a',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '12px',
                            height: '48px',
                            backgroundColor: '#ffffff',
                            // width: '250px',
                            textAlign: 'left',
                        }}
                        onClick={() => {
                            setMenuAnchorEl(menuOpen ? null : menuButtonRef.current);
                            setOpen(false);
                            setMenuOpen((prev) => !prev);
                        }}
                    >
                        <SquaresFour style={{ height: '24px', width: '24px' }} />
                       
                    </Button>

                    {menuOpen ? (
                        <Box
                            sx={{
                                width: '250px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '8px',
                                maxHeight: '531px',
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                                '&::-webkit-scrollbar': { display: 'none' },
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                                position: 'absolute',
                                top: '60px',
                                color: '#1a1a1a',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                zIndex: 999,
                            }}
                        >
                            {loading ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <List disablePadding>
                                    {categories.length > 0 &&
                                        categories.map((category, index) => (
                                            <ListItem
                                                key={category.id}
                                                ref={index === 0 ? firstCategoryRef : null}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',

                                                    paddingY: '10px',
                                                    '&:hover': { backgroundColor: '#f7f7f7' },
                                                }}
                                                onClick={(event) => {
                                                    if (category.productTypeDTOList?.length) {
                                                        handleSubMenuOpen(
                                                            event,
                                                            category.productTypeDTOList.map(
                                                                (item) => item.nameProductType
                                                            ),
                                                            category.name || 'Unnamed Category'
                                                        );
                                                    }
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={category.name || 'Unnamed Category'}
                                                        sx={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Box>
                                            </ListItem>
                                        ))}
                                </List>
                            )}
                        </Box>
                    ) : null}

                    <Popper
                        open={open} // Điều khiển Popper mở/đóng
                        anchorEl={menuAnchorEl} // Gắn anchorEl từ firstCategoryRef
                        onClose={handleClose} // Đóng Popper khi mất focus
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        modifiers={[
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 10],
                                },
                            },
                        ]}
                        sx={{
                            zIndex: 9999,
                            position: 'absolute',
                        }}
                    >
                        <Box
                            sx={{
                                border: '1px solid rgba(243, 240, 240, 0.5)',
                                borderRadius: '8px',
                                backgroundColor: '#ffffff',
                                minWidth: '754px',
                                minHeight: '531px',
                                maxWidth: '754px',
                                maxHeight: '531px',
                                overflowY: 'auto',
                                position: 'absolute',
                                top: '-56px',
                                left: '127px',
                                zIndex: 9999,
                                transform: 'none',
                            }}
                        >
                            <Box sx={{ padding: '10px', borderBottom: '1px solid rgba(243, 240, 240, 0.4)' }}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', alignItems: 'center', display: 'flex', gap: 2 }}
                                >
                                    {activeCategoryTitle}
                                </Typography>
                            </Box>
                            <Box sx={{ padding: '10px' }}>
                                {activeSubCategories.map((sub) => (
                                    <ListItem
                                        key={sub}
                                        sx={{
                                            padding: '8px',
                                            borderRadius: '4px',
                                            '&:hover': { backgroundColor: '#f1f1f1' },
                                            marginBottom: '8px',
                                            width: '100%',
                                            display: 'block',
                                        }}
                                    >
                                        <ListItemText
                                            primary={sub}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '100%',
                                                },
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </Box>
                        </Box>
                    </Popper>

                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChangeInternal}
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 'bold',
                                color: '#1a1a1a !important',
                                minWidth: 'auto',
                                borderRadius: '8px',
                            },
                            '&:hover': { color: '#05A5B7  !important' },
                            '& .Mui-selected': {
                                color: '#05A5B7 !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#05A5B7 !important',
                            },
                        }}
                    >
                        {filteredTabs.map((tab) => (
                            <Tab key={tab.value} label={tab.label} />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                        sx={{
                            color: '#333333 !important',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': { color: '#1976d2' },
                        }}
                    >
                        Sản phẩm mới
                    </Button>
                    <Button sx={{ color: 'red', textTransform: 'none', fontWeight: 'bold' }}>
                        Chương trình
                        <Box
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '2px 10px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                lineHeight: '16px',
                                ml: 1,
                            }}
                        >
                            New
                        </Box>
                    </Button>
                </Box>
            </Toolbar>
        )
    );
}
