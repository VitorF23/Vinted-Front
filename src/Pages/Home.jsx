import Product from "../Components/Product";
import imageMain from "../img/hero.jpg";

const Home = ({ productList }) => {
  return (
    <div className="home">
      <img src={imageMain} alt="" />
      <div className="main-list">
        <div className="list">
          {productList.map((product, index) => {
            return <Product key={index} oneProduct={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
