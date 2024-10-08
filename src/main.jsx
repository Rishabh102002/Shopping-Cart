import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./component/Home";
import Cart from "./component/Cart";
import Orderplaced from "./component/Orderplaced";
import ProductsPage from "./component/ProductsPage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home />},
            { path: "products", element: <ProductsPage /> },
            { path: "cart", element: <Cart /> },
        ],
    },{
        path: "/orderplaced",
        element: <Orderplaced />
    }
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
