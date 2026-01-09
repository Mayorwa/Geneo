import React, {useEffect} from "react";

const TimelinePage: React.FC = () => {
    const dates = [1960, 2025]
    const years = [];

    for (let year = dates[0]; year <= dates[1]; year++) {
        years.push(year);
    }
    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF"; // dark blue

        return () => {
            document.body.style.backgroundColor = ""; // reset
        };
    }, []);
    return (
        <>
            <div className="py-8 mx-10">
                <div className="container mb-10">
                    <div className="flex justify-between">
                        <h3 className="text-4xl">Family Timeline</h3>
                        <h3 className="text-7xl text-gray-300">1900-2000</h3>
                    </div>
                </div>
                <div className="overflow-x-scroll">
                    <div className="container">
                        <div className="w-full flex gap-x-40">
                            {years.map((year) => (
                                <div className="min-w-[40px] text-center" key={year}>
                                    <div className="w-[17px] mx-auto relative">
                                        <div className="h-96 w-[1px] mx-auto bg-gray-100" key={year}>
                                            <div className="absolute top-0 border-[4px] border-[#0f62fe7a] border-solid rounded-full left-0 mx-auto">
                                                <span className="bg-black border-[1px] border-white border-solid h-[10px] w-[10px] block rounded-full"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-3 text-gray-600">{year}</div>
                                </div>
                            ))}
                        </div>
                        <div className="w-fit flex gap-x-40 bg-gray-200 rounded">
                            {years.map((year) => (
                                <div key={year} className=" min-w-[40px] flex justify-center">
                                    <span className="block rounded-full h-[7px] w-[7px] bg-black my-1"></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimelinePage;