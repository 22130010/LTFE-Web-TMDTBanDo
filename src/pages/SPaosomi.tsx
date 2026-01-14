import { useEffect, useState } from "react";
import productsData from "../services/Products.json";
import ProductList from "./ProductList";
import {Product} from "../Interface/Product"

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