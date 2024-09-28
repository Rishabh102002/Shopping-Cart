import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <li className="flex w-full shadow-sm py-6 justify-between">
            <div className="flex items-center gap-4 max-w-[700px]">
                <img className="h-24" src={product.image}></img>
                <p className="line-clamp-2">{product.title}</p>
            </div>
            <div className="flex items-center gap-6">
                <p className="text-md font-semibold text-slate-600">
                    {(product.price * productQuantity).toFixed(2)}
                </p>

                <div className="flex">
                    <button
                        className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-l-lg hover:bg-slate-400"
                        onClick={() => changeQuantity("decrement")}
                    >
                        -
                    </button>
                    <span className="flex w-10 items-center justify-center border-[3px] border-slate-200">
                        {productQuantity}
                    </span>
                    <button
                        className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-r-lg hover:bg-slate-400"
                        onClick={() => changeQuantity("increment")}
                    >
                        +
                    </button>
                </div>

                <button
                    className="bg-slate-500 h-10 px-4 rounded-xl text-white hover:bg-slate-600"
                    onClick={() => remove(product.id)}
                >
                    Remove
                </button>
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
        <div className="flex flex-col items-end space-y-4 mx-48">
            <div className="flex w-full gap-4">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
                        stroke=" #475569"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
                        stroke=" #475569"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M2.25 3.75H5.25L7.5 16.5H19.5"
                        stroke=" #475569"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6"
                        stroke=" #475569"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <h2 className="text-2xl  text-slate-600 font-semibold">
                    Your Cart ({cartList.length})
                </h2>
            </div>
            <div className="flex-col w-full">
                {cartList.length <= 0 ? (
                    <p className="text-lg font-semibold text-slate-400">
                        Empty cart
                    </p>
                ) : (
                    <ul>
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
            </div>
            <div className="flex-col h-full w-[500px] py-6 gap-4 font-medium text-slate-500 justify-between">
                <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <p>Shipping Cost:</p>
                    <span>₹{(cartList.length * 70).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t-2 border-t-slate-100 my-2 py-2">
                    <p>Grandtotal:</p>
                    <span>₹{(total + cartList.length * 70).toFixed(2)}</span>
                </div>
                <Link to="/orderplaced">
                    <button
                        className="bg-slate-600 w-full py-3 rounded-xl text-white shadow-lg hover:bg-slate-700"
                    >
                        PURCHASE
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
