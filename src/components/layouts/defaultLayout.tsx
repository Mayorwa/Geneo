import React, {type ReactNode, useState} from "react";
import { Link } from "react-router-dom";

import Logo from "@/assets/img/logo.svg";
import "./index.css"
const DefaultLayout: React.FC<{ children: ReactNode; }> = ({children}) => {

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

    const activeTab = "family tree"

    return (
        <>
            <main>
                <div className="bg-black flex flex-col justify-between w-full text-white border-solid border-b border-[#393939] h-[20rem]">
                    <div className="container my-4 flex items-center">
                        <img alt="Logo" src={Logo} className="h-9 block logo"/>
                        <h4 className="text-base ml-4">Genea</h4>
                    </div>
                    <div className="container my-8">
                        <h2 className="text-6xl font-light">The Jordan's: <span className="family-color">Tim Jordan</span></h2>
                    </div>
                </div>
                <nav className="default-nav m-0 w-full bg-black">
                    <div className="container mx-auto">
                        <div>
                            <ul className="flex flex-row list-none overflow-x-auto p-0 w-full scrollbar-none">
                                {
                                    tabs.map((tab, index) => (
                                        <li key={index} className="flex">
                                            <Link to={tab.link}  className={`nav-tab ${activeTab === tab.name ? "active" : ""}`}>
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

export default DefaultLayout;