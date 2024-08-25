import style from "./index.module.css";
import { useState } from "react";
function Card({ id, title, imageUrl, price, setCartList, productList }) {
    const [inputVal, setInputVal] = useState(1);

    //handling input change
    const handleChange = (event) => {
        setInputVal(event.target.value);
    };

    const increment = ()=>{
        setInputVal(prev=> prev+1);
    }
     const decrement = () => {
         setInputVal((prev) => {
            if(prev>1){
                return prev-1;
            }
            return prev
         });
     };

    //handling add to cart button
    const handleOnclick = (id, quantity) => {
        let ClickedItem = {};
        productList.forEach( product => {
            if(product.id === id){
                ClickedItem = {
                    id, quantity:Number(quantity), title: product.title, image: product.image, price: product.price*80
                }
            }
        });
        setCartList((prev) => {
            const isAlreadyInCart = prev.some((product) => product.id === id);

            if (isAlreadyInCart) {
                alert("Product already added to cart");
                return [...prev];
            } 
            else {
                return [...prev, ClickedItem];
            }
        });
    };

    return (
        <div className={style.card}>
            <img src={imageUrl}></img>
            <p>{title}</p>
            {/* <p>
                rating: <span>{rating.rate}</span>
            </p> */}
            <p>₹{price}</p>
            <div className={style.qs}>
                <button
                    onClick={decrement}
                    className={style.button}
                >
                    -
                </button>
                <input className={style.number}
                    type="number"
                    onChange={handleChange}
                    value={inputVal}
                ></input>
                <button
                    onClick={increment}
                    className={style.button}
                >
                    +
                </button>
            </div>
            <button onClick={() => handleOnclick(id, inputVal)}>
                + Add to Cart
            </button>
        </div>
    );
}

export default Card;
