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

function SPaosomi() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const aoSomiDongPhuc = productsData.filter(
            (item) => item.category === "Áo sơ mi công sở"
        );
        setProducts(aoSomiDongPhuc);
    }, []);

    return (
        <ProductList
            customTitle="Danh sách Áo Sơ Mi Công Sở"
            searchResult={products}
        />
    );
}

export default SPaosomi;