import { Link } from "react-router-dom";
import ProductHeader from "./Product-Header";
import ProductInfo from "./Product-Info";

const Product = ({ oneProduct }) => {
  return (
    <div className="img2">
      <ProductHeader owner={oneProduct.owner} />
      <Link to={`/product/${oneProduct._id}`} className="img2">
        <img src={oneProduct.product_image.secure_url} alt="" />
      </Link>

      <ProductInfo
        prix={oneProduct.product_price}
        productDetails={oneProduct.product_details}
      />
    </div>
  );
};

export default Product;
