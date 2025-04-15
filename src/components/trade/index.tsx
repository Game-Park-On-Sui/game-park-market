'use client'

import {useEffect, useState} from "react";
import {JumpingCard} from "@/components/trade/cards";

const TabTile = ["Jumping", "Soon..."];
const TradeType = ["Buy", "Sell"];

export default function Trade() {
    const [tab, setTab] = useState<number>(0);
    const [tradeType, setTradeType] = useState<number>(0);
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
                <div className="relative h-full w-full p-5">
                    <div className="absolute -top-6 left-0 w-full flex justify-between items-center">
                        <div className="flex gap-2 items-center border border-[#afb3b5] bg-[#afb3b5] rounded-full">
                            {
                                TabTile.map((title, index) => {
                                    return (
                                        <span key={index}
                                              className={"w-24 rounded-full px-2 text-center cursor-pointer transition-all hover:opacity-100 " + (tradeType === index ? "bg-white" : "bg-[#afb3b5] opacity-60")}
                                              onClick={() => setTradeType(index)}>
                                            {title}
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <div className="flex gap-2 items-center border border-[#afb3b5] bg-[#afb3b5] rounded-full">
                            {
                                TradeType.map((type, index) => {
                                    return (
                                        <span key={index}
                                              className={"w-24 rounded-full px-2 text-center cursor-pointer transition-all hover:opacity-100 " + (tab === index ? "bg-white" : "bg-[#afb3b5] opacity-60")}
                                              onClick={() => setTab(index)}>
                                            {type}
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full h-full flex gap-4 flex-wrap content-start overflow-auto">
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