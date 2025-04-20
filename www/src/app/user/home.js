'use client';

import BannerSection from '@/components/user/home/BannerSection';
import CategoriesSection from '@/components/user/home/CategoriesSection';
import FeaturesSection from '@/components/user/home/FeaturesSection';
import ProductCategories from '@/components/user/home/ProductCategories';
import FeaturedProducts from '@/components/user/home/FeaturedProducts';
import { logger } from '@/lib/default-logger';
import { fetchCategories, fetchProducts } from '@/services/category-service';
import { Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function HomePage() {
    const [_categories, _setCategory] = useState([]);
    const [_products, _setProducts] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState([]);
    const [categoriesProducts, setCategoriesProducts] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});

    const router = useRouter();

    const addGroup = (categoriesProduct) => {
        const updatedGroups = categoriesProduct.map((category) => ({
            parentId: category.id,
            childId: category.productTypeDTOList.length > 0 ? category.productTypeDTOList[0].id : null,
        }));
        setSelectedProductType(updatedGroups);
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: Expected
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetchCategories();
                const categoriesProduct = categoriesResponse.data || [];
                setCategoriesProducts(categoriesProduct);
                addGroup(categoriesProduct);

                const productsByCategoryPromises = categoriesProduct.map(async (category) => {
                    const categoryPromises = category.productTypeDTOList.map(async (productType) => {
                        const productsResponse = await fetchProducts(productType.id);
                        return {
                            categoryId: productType.id,
                            products: productsResponse.data.content || [],
                        };
                    });
                    return Promise.all(categoryPromises);
                });

                const productsData = await Promise.all(productsByCategoryPromises);
                const flattenedProductsData = productsData.flat();
                const allProductsByCategory = flattenedProductsData.reduce((acc, { categoryId, products }) => {
                    acc[categoryId] = products;
                    return acc;
                }, {});

                setProductsByCategory(allProductsByCategory);
            } catch (error) {
                logger.error('Lỗi khi fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const handleProductTypeSelect = (parentId, childId) => {
        setSelectedProductType((prevSelected) =>
            prevSelected.map((group) => (group.parentId === parentId ? { ...group, childId } : group))
        );
    };

    return (
        <>
            <BannerSection router={router} />
            <ProductCategories categories={_categories} products={_products} />
            <FeaturedProducts />
            <FeaturesSection />
            
            <Divider
                sx={{
                    border: '1px solid rgba(243, 240, 240, 0.5)',
                    margin: '0 auto',
                    width: '100%',
                    maxWidth: '1200px',
                    height: '1px',
                }}
            />
            <CategoriesSection
                categoriesProducts={categoriesProducts}
                productsByCategory={productsByCategory}
                selectedProductType={selectedProductType}
                handleProductTypeSelect={handleProductTypeSelect}
            />
        </>
    );
}

export default HomePage;
