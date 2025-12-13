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
            <div className="bg-black flex w-full text-white">
                <Header/>
            </div>
            <section>
                {children}
            </section>
        </>
    )
};
export default DefaultLayout;
