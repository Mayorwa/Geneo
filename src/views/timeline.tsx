import React, {useEffect} from "react";

const TimelinePage: React.FC = () => {
    const jumps = 20;
    let thresholds = [1900, 2000];

    const loaded_dates = [1960, 1980];
    const years = [];

    for (let year = loaded_dates[0]; year <= loaded_dates[1]; year++) {
        years.push(year);
    }

    const events = {
        "1965": {
            type: "birth",
        },
        "1970": {
            type: "death",
        },
        "1960": {
            type: "divorce",
        },
        "1963": {
            type: "divorce",
        },
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
                        <h3 className="text-7xl text-gray-300">{loaded_dates[0]}-{loaded_dates[1]}</h3>
                    </div>
                </div>
                <div className="overflow-x-scroll">
                    <div className="container">
                        <div className="flex gap-x-16 items-end">
                            <div className="h-60 border-r-[1.5px] border-solid mx-auto border-[#0f62fe7a] [writing-mode:sideways-lr] text-3xl">
                                1900 - 1920
                            </div>

                            <div className="h-60 border-r-[1.5px] border-solid mx-auto border-[#0f62fe7a] [writing-mode:sideways-lr] text-3xl">
                                1920 - 1940
                            </div>
                            <div className="h-60 border-r-[1.5px] border-solid mx-auto border-[#0f62fe7a] [writing-mode:sideways-lr] text-3xl">
                                1940 - 1960
                            </div>
                            <div>
                                <div className="flex gap-x-40">
                                    {years.map((year) => (
                                        <div className="min-w-[40px] text-center" key={year}>
                                            <div className="w-[17px] mx-auto relative">
                                                <div className="h-96 w-[1px] mx-auto bg-gray-100" key={year}>
                                                    {
                                                        (year in events) && <div className="cursor-pointer absolute top-[20%] border-[4px] border-[#0f62fe7a] border-solid rounded-full left-0 mx-auto">
                                                            <span className="bg-black border-[1px] border-white border-solid h-[10px] w-[10px] block rounded-full"></span>
                                                        </div>
                                                    }
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
                            <div className="h-60 border-r-[1.5px] border-solid mx-auto border-[#0f62fe7a] [writing-mode:sideways-lr] text-3xl">
                                1980 - 2000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimelinePage;