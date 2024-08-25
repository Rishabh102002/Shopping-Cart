import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./component/Cart";
import Home from "./component/Home"
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {index: true, element: <Home/>},
            {path: "cart", element: <Cart/>}
        ],
    },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
