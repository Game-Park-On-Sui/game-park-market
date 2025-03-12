'use client'

import Image from "next/image";
import {useState} from "react";
import {ConnectButton} from "@mysten/dapp-kit";

export default function Navigation() {
    const [tab, setTab] = useState<number>(0);

    return (
        <>
            <div className="fixed w-screen h-screen bg-[#F1F2F5] -z-50"></div>
            <div className="fixed w-screen h-16 bg-[#282828] text-[#9d9d9d] z-30">
                <div className="flex justify-between items-center h-full px-3 xl:px-32 2xl:px-96 transition-all duration-1000">
                    <div className="flex items-center gap-10">
                        <Image src="/Game_Park_On_Sui-remove.png" alt="Game Park On Sui" width={80} height={80}/>
                        <div
                            className={"cursor-pointer hover:text-white h-16 leading-[4rem] transition-all " + (tab !== 0 ? "" : "px-4 text-white bg-[#080808]")}
                            onClick={() => setTab(0)}>
                            Swap
                        </div>
                        <div
                            className={"cursor-pointer hover:text-white h-16 leading-[4rem] transition-all " + (tab !== 1 ? "" : "px-4 text-white bg-[#080808]")}
                            onClick={() => setTab(1)}>
                            Trade
                        </div>
                    </div>
                    <ConnectButton />
                </div>
            </div>
        </>
    )
}