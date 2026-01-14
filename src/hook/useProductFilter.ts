import { useState, useMemo } from "react";
import { Product } from "../Interface/Product";

export const useProductFilter = (initialProducts: Product[]) => {
    const [sortOrder, setSortOrder] = useState<string>('default');
    const [priceFilter, setPriceFilter] = useState<string>('all');
    const [fakePromo, setFakePromo] = useState<string[]>([]);

    const togglePromo = (val: string) => {
        setFakePromo(prev =>
            prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
        );
    };

    const resetFilters = () => {
        setSortOrder('default');
        setPriceFilter('all');
        setFakePromo([]);
    };

    const processedProducts = useMemo(() => {
        let data = [...initialProducts];
        //lọc theo giá
        if (priceFilter === 'under200') {
            data = data.filter(p => p.price < 200000);
        } else if (priceFilter === 'over200') {
            data = data.filter(p => p.price >= 200000);
        }
        //sort
        if (sortOrder === 'asc') {
            data.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            data.sort((a, b) => b.price - a.price);
        }
        return data;
    }, [initialProducts, sortOrder, priceFilter]);

    return {
        processedProducts,
        filters: { sortOrder, priceFilter, fakePromo },
        setters: { setSortOrder, setPriceFilter, togglePromo, resetFilters }
    };
};