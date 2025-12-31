import {useState, useEffect} from "react";
import "../styles/productList.scss"

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
    size:string[];
    colors:string[];

}
const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const loadData = () => {
        fetch("http://localhost:3001/products")// http://localhost:3001/products
            .then((response: Response) => response.json()) // ép kiểu dữ liệu
            .then((data: Product[]) => setProducts(data))
            .catch((error) => console.log(error));

    };
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div className="product-list">
            {products.length === 0 ? (
                <p>Không có sản phẩm</p>
            ) : (
                products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image_url} alt={product.name}  width={200}/>

                        <h3>{product.name}</h3>
                        <p>Danh mục: {product.category}</p>
                        <p>Giá: {product.price.toLocaleString("vi-VN")} vnd</p>
                        <p>{product.description}</p>
                        <p>Size:
                            {product.size?.map((s) =>(
                                <span key={s}>{s}</span>
                            ))}
                        </p>
                        <p>Màu:
                            {product.colors?.map((c) =>(
                                <span key={c}>{c}</span>
                            ))}
                        </p>

                    </div>
                ))
            )}

        </div>
    )

};
export default ProductList;