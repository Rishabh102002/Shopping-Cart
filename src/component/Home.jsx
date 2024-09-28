import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Card from "./Card";
import Carsole from "./Carsole"
import slide1 from "../assets/slide1.png"
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png"
import { Link } from "react-router-dom";
import {
    Smartphone,
    Tv,
    Headphones,
    Gamepad2,
} from "lucide-react";

const CategoryList = () => {
    return (
        <div className="mx-44 pt-20 pb-16 flex flex-col gap-10 items-center">
            <p className="text-3xl font-bold text-slate-600">
                Search By Categories
            </p>
            <div className="flex gap-6 ">
                <Link to="products">
                    <button className="flex flex-col w-44 items-center py-4 px-8 gap-4 border-2 rounded-xl text-slate-600 font-medium border-slate-400 hover:bg-slate-600 hover:text-white hover:border-none">
                        <Smartphone />
                        Smartphones
                    </button>
                </Link>
                <Link to="products">
                    <button className="flex flex-col w-44 items-center py-4 px-8 gap-4 border-2 rounded-xl text-slate-600 font-medium border-slate-400 hover:bg-slate-600 hover:text-white hover:border-none">
                        <Tv />
                        Televisions
                    </button>
                </Link>
                <Link to="products">
                    <button className="flex flex-col w-44 items-center py-4 px-8 gap-4 border-2 rounded-xl text-slate-600 font-medium border-slate-400 hover:bg-slate-600 hover:text-white hover:border-none">
                        <Headphones />
                        Audio
                    </button>
                </Link>
                <Link to="products">
                    <button className="flex flex-col w-44 items-center py-4 px-8 gap-4 border-2 rounded-xl text-slate-600 font-medium border-slate-400 hover:bg-slate-600 hover:text-white hover:border-none">
                        <Gamepad2 />
                        Gaming
                    </button>
                </Link>
            </div>
        </div>
    );
};


function ProductShowcase({ productList, title, cartList, setCartList }) {
    return (
        <div className="flex-col my-16">
            <div className="flex justify-between mx-44">
                <p className="font-bold text-slate-600 text-3xl">{title}</p>
                <Link to="products">
                    <button className="bg-slate-600 rounded-lg p-2 px-4 text-white hover:bg-slate-700">
                        <p>View more</p>
                    </button>
                </Link>
            </div>
            <div className="flex gap-6 p-10 mx-40 my-6 overflow-scroll no-scrollbar">
                {productList.map((product) => (
                    <div key={product.id}>
                        <Card
                            id={product.id}
                            title={product.title}
                            imageUrl={product.image}
                            price={product.price * 80}
                            discount={product.discount}
                            setCartList={setCartList}
                            productList={productList}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}




function Home() {
  const [slides,setSlides] = useState([slide1,slide2,slide3])
  const [cartList, setCartList, productList, setProductList] = useOutletContext();
  return (
      <>
          <Carsole slides={slides} />
          <CategoryList />
          <ProductShowcase
              productList={productList.filter((product) => product.popular)}
              cartList={cartList}
              setCartList={setCartList}
              title={"Most Popular Products"}
          />
          <ProductShowcase
              productList={productList.filter((product) => product.onSale)}
              cartList={cartList}
              setCartList={setCartList}
              title={"Products On Sale"}
          />
      </>
  );
}

export default Home