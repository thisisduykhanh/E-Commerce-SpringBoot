import CategoryList from '@/components/user/product/CategoryDisplay';
import { Box } from '@mui/material';
import React from 'react';

function CategoriesSection({ categoriesProducts, productsByCategory, selectedProductType, handleProductTypeSelect }) {
    const banners = [
        '/img/image/banner/banner1.png',
        '/img/image/banner/banner2.jpeg',
        '/img/image/banner/banner4.png',
    ];

    const getProducts = (categoryId) => {
        return productsByCategory[selectedProductType.find((group) => group.parentId === categoryId)?.childId] || [];
    };

    const getSelectedSubCategory = (categoryId) => {
        return selectedProductType.find((group) => group.parentId === categoryId)?.childId;
    };

    return (
        <Box
            sx={{
                margin: '0px auto',
                boxSizing: 'border-box',
            }}
        >
            {categoriesProducts.length > 0 &&
                categoriesProducts.map((category, index) => {
                    const products = getProducts(category.id);
                    if (products.length === 0) return null;
                    return (
                        <React.Fragment key={category.id}>
                            <Box
                                sx={{
                                    paddingY: '20px',
                                    margin: '0px auto',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <CategoryList
                                    category={category}
                                    products={products}
                                    selectedSubCategory={getSelectedSubCategory(category.id)}
                                    onSubCategoryClick={(id) => handleProductTypeSelect(category.id, id)}
                                />
                            </Box>

                            {index < categoriesProducts.length - 1 && (
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={banners[index % banners.length]}
                                        alt="Background"
                                        sx={{
                                            width: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            )}
                        </React.Fragment>
                    );
                })}
        </Box>
    );
}

export default CategoriesSection;
