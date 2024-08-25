import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./index.module.css";

function ListItem({ product, cartList, setCartList}) {
    const [productQuantity, setProductQuantity] = useState(product.quantity);

    const changeQuantity = (change) => {
        setProductQuantity((prev) => {
            if(change=="increment"){
                let newQuantity = prev + 1;
                setCartList((prevCartList) =>
                    prevCartList.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
                return newQuantity;
            }
            else if(change=="decrement"){
                let newQuantity;
                if (prev>1){
                    newQuantity= prev - 1;
                    setCartList((prevCartList) =>
                    prevCartList.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                    )
                    return newQuantity;
                }
                return prev;
            }
            
        });
    };
    const remove = (id) => {
        setCartList(cartList.filter((product)=> product.id != id));
    }
    return (
        <li>
            <div className={style.ImageAndTitle}>
                <img className={style.productImg} src={product.image}></img>
                {product.title}
            </div>
            <button onClick={()=>remove(product.id)}>Remove</button>
            <div className={style.quantityAndPrice}>
                <div className={style.qs}>
                    <button
                        onClick={() => changeQuantity("decrement")}
                        className={style.button}
                    >
                        -
                    </button>
                    <span className={style.number}>{productQuantity}</span>
                    <button
                        onClick={() => changeQuantity("increment")}
                        className={style.button}
                    >
                        +
                    </button>
                </div>

                <p>{(product.price * productQuantity).toFixed(2)}</p>
            </div>
        </li>
    );
}

function Cart() {
    const [cartList, setCartList, productList, setProductList] =
        useOutletContext(); //here i learned that each state and func through outlet context needs to be in their proper position.
    const [total, setTotal] = useState(0)
    
    
    useEffect(() => {
        let total = cartList.reduce((total,item)=>{
            return total+item.price*item.quantity
        },0);
        setTotal(total)
    }, [cartList]);

    return (
        <div className={style.main}>
            <h2>Cart</h2>
            {cartList.length <= 0 ? (
                <p>empty cart</p>
            ) : (
                <ul className={style.productList}>
                    {cartList.map((product) => {
                        return (
                            <ListItem
                                key={product.id}
                                product={product}
                                cartList={cartList}
                                setCartList={setCartList}
                            />
                        );
                    })}
                </ul>
            )}
            <div className={style.total}>Total Price = {total.toFixed(2)}</div>
        </div>
    );
}

export default Cart;
