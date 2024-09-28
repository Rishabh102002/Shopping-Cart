import { useState, useEffect } from "react";
import Nav from "./component/Nav";
import { Outlet } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

function App() {
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState("/")

    useEffect(() => {
        fetch("https://fakestoreapi.in/api/products?limit=50")
            .then((res) => res.json())
            .then((json) => {
                setProductList(json.products);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Nav cartList={cartList} />
            {loading ? (
                <div className="flex justify-center items-center h-screen gap-4">
                    <CgSpinnerTwo className="animate-spin text-4xl text-slate-600" />
                    Loading...
                </div>
            ) : (
                <>
                    <Outlet
                        context={[
                            cartList,
                            setCartList,
                            productList,
                            setProductList,
                        ]}
                    />
                </>
            )}
        </div>
    );
}

export default App;
