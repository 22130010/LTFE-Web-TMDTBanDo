import '../styles/footer.scss';
import {dataMenu} from "../styles/constant";

const Footer =()=>{
    return (
        <footer className="footer">
            <p style={{fontSize: '35px'}}>ĐỒNG PHỤC HAPPY</p>

            <div className="boxNav">
                {dataMenu.map((item)=>(
                    <div>{item.content}</div>
                ))}
            </div>

            <div className="payment" style={{marginBottom: '20px'}}>
                <p>Các hình thứ thanh toán</p>
                <img
                    src="https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/elementor/thumbs/Icons-123-pzks3go5g30b2zz95xno9hgdw0h3o8xu97fbaqhtb6.png" alt=""/>
            </div>

            <div>
                <p>© 2025 Đồng Phục Happy. All rights reserved.</p>
            </div>
        </footer>
    )
};

export default Footer;
