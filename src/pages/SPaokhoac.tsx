import { useEffect, useState } from "react";
import productsData from "../services/Products.json";
import ProductList from "./ProductList";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string | string[];
    description: string;
    sizes: string[];
    colors: string[];
}

function SPaothun() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const aoThunDongPhuc = productsData.filter(
            (item) => item.category === "Áo khoác gió"
        );
        setProducts(aoThunDongPhuc);
    }, []);

    return (
        <ProductList
            customTitle="Danh sách Áo khoác gió"
            searchResult={products}
        />
    );
}

export default SPaothun;