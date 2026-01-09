import React, {type ReactNode, useState} from "react";
import { Link, useLocation } from "react-router-dom";

import "./index.css"
import Header from "@/components/ui/Header.tsx";
const DashboardLayout: React.FC<{ children: ReactNode; }> = ({children}) => {
    const location = useLocation();
    const { pathname } = location;
    const [tabs, _] = useState([
        {
            name: "bio",
            link: "/bio"
        },
        {
            name: "family tree",
            link: "/tree"
        },
        {
            name: "timeline",
            link: "/timeline"
        }
    ]);

    return (
        <>
            <main>
                <div className="bg-black flex flex-col justify-between w-full text-white border-solid border-b border-[#393939] h-[20rem]">
                    <Header />
                    <div className="container my-8">
                        <h2 className="text-6xl font-light">Hilts: <span className="family-color">The Jordan's</span></h2>
                    </div>
                </div>
                <nav className="default-nav m-0 w-full bg-black">
                    <div className="container mx-auto">
                        <div>
                            <ul className="flex flex-row list-none overflow-x-auto p-0 w-full scrollbar-none">
                                {
                                    tabs.map((tab, index) => (
                                        <li key={index} className="flex">
                                            <Link to={tab.link}  className={`nav-tab ${pathname === tab.link ? "active" : ""}`}>
                                                {tab.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <section>
                    {children}
                </section>
            </main>
        </>
    );
}

export default DashboardLayout;