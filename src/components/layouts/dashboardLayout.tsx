import React, {type ReactNode, useState} from "react";
import { Link, useLocation } from "react-router-dom";

import "./index.css"
import Header from "@/components/ui/Header.tsx";
import Footer from "@/components/ui/Footer.tsx";
const DashboardLayout: React.FC<{ children: ReactNode; }> = ({children}) => {
    const location = useLocation();
    const { pathname } = location;
    const [tabs, ] = useState([
        {
            name: "biography",
            link: "/bio"
        },
        {
            name: "Family members",
            link: "/members"
        },
        {
            name: "timeline",
            link: "/timeline"
        }
    ]);

    const [directories, ] = useState([
        {
            name: "home",
            link: "/home"
        },
        {
            name: "family members",
            link: "/tree"
        },
    ])

    return (
        <>
            <main>
                <div className="bg-black flex flex-col justify-between w-full text-white border-solid border-b border-[#393939] h-[20rem]">
                    <Header />
                    <div className="container my-8">
                        <ul className="flex flex-row">
                            {
                                directories.map((dir, index) => (
                                    <React.Fragment key={index}>
                                        {index !== 0 && (<span className="mx-3 text-[--bg-secondary-3]">/</span>)}
                                        <li className={`${index === directories.length-1 ? 'underline': 'hover:underline'} uppercase`} key={index}><Link to={dir.link} className="text-xs">{dir.name}</Link></li>
                                    </React.Fragment>
                                ))
                            }
                        </ul>
                        <div className="mt-6 flex items-center">
                            <img src="https://preview.lsvr.sk/lineago/wp-content/uploads/sites/8/2021/12/portrait_01_2-300x300.jpg" className="h-24 rounded-full" alt=""/>
                            <h2 className="text-5xl font-light ml-2"><span className="family-color">Alicia Harper</span></h2>
                        </div>

                    </div>
                </div>
                <nav className="default-nav m-0 w-full bg-black">
                    <div className="container mx-auto">
                        <div className="mx-[-14px]">
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
            <Footer />
        </>
    );
}

export default DashboardLayout;