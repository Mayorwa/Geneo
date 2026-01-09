import React, {type ReactNode, useEffect} from "react";
import Header from "@/components/ui/Header.tsx";

const DefaultLayout: React.FC<{ children: ReactNode; }> = ({children}) => {
    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF"; // dark blue

        return () => {
            document.body.style.backgroundColor = ""; // reset
        };
    }, []);
    return (
        <>
            <div className="bg-black flex flex-col justify-between text-white h-[15rem]">
                <Header/>
                <div className="container my-8">
                    <h2 className="text-6xl font-light">Hilts</h2>
                </div>
            </div>
            <section>
                {children}
            </section>
        </>
    )
};
export default DefaultLayout;
