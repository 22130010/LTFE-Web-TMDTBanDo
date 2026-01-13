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

function SPbaoho() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const dobaoho = productsData.filter(
            (item) => item.category === "Đồ bảo hộ lao động"
        );
        setProducts(dobaoho);
    }, []);

    return (
        <ProductList
            customTitle="Danh sách Đồ Bảo Hộ Lao Động"
            searchResult={products}
        />
    );
}

export default SPbaoho;