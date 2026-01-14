import { useEffect, useState } from "react";
import productsData from "../services/Products.json";
import ProductList from "./ProductList";
import {Product} from "../Interface/Product"

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