import { Link } from "react-router-dom";
import style from "./index.module.css"
function Nav({cartList}) {
    return (
        <div className={style.nav}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="cart">Cart ({cartList.length} Items)</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav