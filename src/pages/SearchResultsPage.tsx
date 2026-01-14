import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import { SearchHandler } from '../util/SearchHandler';

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('q') || searchParams.get('category') || "";
    //thực hiện tìm kiếm
    const filteredProducts = useMemo(() => {
        if (!keyword) return [];
        return SearchHandler.search(keyword);
    }, [keyword]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4 text-sm text-gray-500">
                Trang chủ / Tìm kiếm
            </div>
            <ProductList
                customTitle={`Kết quả tìm kiếm: "${keyword}"`}
                searchResult={filteredProducts}
            />
        </div>
    );
};

export default SearchResultsPage;