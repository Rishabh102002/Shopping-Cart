import { useState } from "react";

function Counter({ quantity, inputVal, setInputVal }) {
    //handling input change
    const handleChange = (event) => {
        setInputVal(event.target.value);
    };

    const increment = () => {
        setInputVal((prev) => prev + 1);
    };
    const decrement = () => {
        setInputVal((prev) => {
            if (prev > 1) {
                return prev - 1;
            }
            return prev;
        });
    };
    return (
        <div className="flex ">
            <button
                className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-l-lg hover:bg-slate-400"
                onClick={decrement}
            >
                -
            </button>
            <input
                className="flex w-10 text-center border-[3px] border-slate-200"
                type="text"
                onChange={handleChange}
                value={inputVal}
            ></input>
            <button
                className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-r-lg hover:bg-slate-400"
                onClick={increment}
            >
                +
            </button>
        </div>
    );
}

function Card({
    id,
    title,
    imageUrl,
    price,
    setCartList,
    productList,
    discount,
}) {
    const [inputVal, setInputVal] = useState(1);

    //handling add to cart button
    const handleOnclick = (id, quantity) => {
        let ClickedItem = {};
        productList.forEach((product) => {
            if (product.id === id) {
                ClickedItem = {
                    id,
                    quantity: Number(quantity),
                    title: product.title,
                    image: product.image,
                    price: product.price * 80,
                };
            }
        });
        setCartList((prev) => {
            const isAlreadyInCart = prev.some((product) => product.id === id);

            if (isAlreadyInCart) {
                alert("Product already added to cart");
                return [...prev];
            } else {
                return [...prev, ClickedItem];
            }
        });
    };

    return (
        <div className="flex flex-col w-[320px] h-[500px] justify-between p-6 shadow-lg rounded-2xl">
            <div className="relative">
                {discount ? (
                    <div className="absolute bg-emerald-400 p-2 rounded-lg right-0">
                        <p className="text-white text-sm">{discount}% OFF</p>
                    </div>
                ) : (
                    <></>
                )}

                <img src={imageUrl}></img>img
            </div>

            <p className="line-clamp-2 h-11 my-2 font-normal text-slate-600">
                {title}
            </p>
            <div className="h-16 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {discount ? (
                        <p className="span text-md font-medium text-slate-500 py-2 line line-through">
                            ₹{Math.floor((discount / 100) * price) + price}
                        </p>
                    ) : (
                        <></>
                    )}
                    <p className="text-lg font-semibold text-slate-600">
                        ₹{price}
                    </p>
                </div>
                <Counter inputVal={inputVal} setInputVal={setInputVal} />
            </div>
            <button
                className="bg-slate-500 w-full py-3 rounded-xl text-white shadow-lg hover:bg-slate-600 shadow-none"
                onClick={() => handleOnclick(id, inputVal)}
            >
                + Add to Cart
            </button>
        </div>
    );
}

export {Counter};
export default Card;