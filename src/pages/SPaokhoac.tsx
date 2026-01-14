import { useEffect, useState } from "react";
import productsData from "../services/Products.json";
import ProductList from "./ProductList";
import {Product} from "../Interface/Product"

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