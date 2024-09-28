import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { Link } from "react-router-dom";

function Orderplaced() {
    const [showConfetti, setShowConfetti] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 4000);

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showConfetti && <ReactConfetti  className="w-full" />}
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <svg
                    id="Layer_1"
                    enable-background="new 0 0 512 512"
                    height="60"
                    viewBox="0 0 512 512"
                    width="60"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-rule="evenodd" fill-rule="evenodd">
                        <path
                            d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z"
                            fill="#34d399"
                        />
                        <path
                            d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
                            fill="#fff"
                        />
                    </g>
                </svg>
                <p className="text-2xl  text-slate-600 font-semibold">
                    Purchase Sucessfull
                </p>
                <p className=" text-slate-600 font-semibold">
                    Your order will arrive some day
                </p>
                <Link to="/">
                    <button className="bg-slate-600 my-4 py-3 px-8 rounded-xl text-white shadow-lg hover:bg-slate-700">
                        Go Back to Homepage
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Orderplaced;
