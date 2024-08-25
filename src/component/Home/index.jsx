import Card from "../Card";
import style from "./index.module.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
    const [cartList, setCartList, productList, setProductList] =
        useOutletContext();
    //console.log("Product List in Home Component:", productList);
    return (
        <>
            <div className={style.cards}>
                {productList.map((product) => {
                    return (
                        <Card
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.image}
                            price={product.price*80}
                            setCartList={setCartList}
                            productList={productList}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Home;
