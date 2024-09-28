import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState , useEffect } from "react";


function Buttons({ currentIndex, setCurrentIndex, slides }) {
    return (
        <div className="flex absolute bottom-6 right-1/2 gap-3">
            {slides.map((slide,index) => {
                return (
                    <button key={index} onClick={() => setCurrentIndex(index)}>
                        {currentIndex === index ? (
                            <div className="h-2 w-6 bg-slate-600 rounded-full"></div>
                        ) : (
                            <div className="h-2 w-2 bg-slate-400 rounded-full"></div>
                        )}
                    </button>
                );
                
            })}
        </div>
    );
}



function Carsole({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev === 2) {
                    return 0;
                }
                return prev + 1;
            });
        }, 5000);
        return () => clearInterval(intervalId);
    }, [setCurrentIndex]);

    function goLeft(){
        setCurrentIndex((prev)=> {
            if(prev===0){
                return 2
            }
            return prev-1
        })
    }
    function goRight() {
        setCurrentIndex((prev) => {
            if(prev===2){
                return 0
            }
            return prev+1
        });
    }
    return (
        <div className="relative">
            <div className="flex h-[520px] overflow-hidden mx-44">
                {slides.map((slide, index) => {
                    return (
                        <img
                            key={index}
                            style={{
                                transform: `translateX(${
                                    currentIndex * -100
                                }%)`,
                            }}
                            className="object-cover object-bottom transition-transform duration-500 ease-in-out"
                            src={slide}
                        ></img>
                    );
                })}
            </div>

            <button
                onClick={goLeft}
                className="absolute left-20 top-1/2 flex w-12 h-12 justify-center items-center bg-slate-300 rounded-full hover:bg-slate-400"
            >
                <ChevronLeft size={32} className="text-white" />
            </button>

            <button
                onClick={goRight}
                className="absolute right-20 top-1/2 flex w-12 h-12 justify-center items-center bg-slate-300 rounded-full hover:bg-slate-400"
            >
                <ChevronRight size={32} className="text-white" />
            </button>
            <Buttons
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                slides={slides}
            />
        </div>
    );
}

export default Carsole;
