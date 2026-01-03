import Header from "../componnents/Header";
import Banner from "../componnents/Banner";
import Footer from "../componnents/Footer";
import SPnoibat from "../componnents/SPnoibat";
import ProductList from "../componnents/ProductList";

function Home()  {
    return (
        <div>
            <Header/>
            <Banner/>
            <ProductList/>
            <Footer/>
        </div>
    );
}
export default Home;