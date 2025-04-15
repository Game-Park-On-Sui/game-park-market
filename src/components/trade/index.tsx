'use client'

import {useEffect, useState} from "react";
import {JumpingCard} from "@/components/trade/cards";

const tabTile = ["Jumping", "Soon..."];

export default function Trade() {
    const [tab, setTab] = useState<number>(0);
    const [tempArray, setTempArray] = useState<number[]>([]);
    useEffect(() => {
        const array: number[] = [];
        for (let i = 0; i < 33; i++)
            array.push(i);
        setTempArray(array);
    }, []);

    return (
        <div className="h-[80vh] w-screen">
            <div className="h-full xl:px-32 2xl:px-96 mt-16 transition-all duration-1000">
                <div className="relative h-full w-full p-5 border border-black">
                    <div className="absolute -top-6 left-0">
                        <div className="flex gap-2 items-center border border-[#afb3b5] bg-[#afb3b5] rounded-full">
                            {
                                tabTile.map((title, index) => {
                                    return (
                                        <span key={index}
                                              className={"w-24 rounded-full px-2 text-center cursor-pointer transition-all hover:opacity-100 " + (tab === index ? "bg-white" : "bg-[#afb3b5] opacity-60")}
                                              onClick={() => setTab(index)}>
                                            {title}
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full h-full flex gap-2 flex-wrap content-start overflow-auto">
                        {
                            tempArray.map((idx) => {
                                return (
                                    <div key={idx}>
                                        <JumpingCard/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}