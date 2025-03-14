'use client'

import {createContext, ReactNode, useEffect, useState} from "react";

export type SwapTokenType = {
    name: string,
    image: string,
    balance: number
}

export const SwapTokenInfoContext =
    createContext<[SwapTokenType[], () => void]>([[], () => {}]);

export default function SwapTokenInfoContextProvider({children}: {children: ReactNode}) {
    const [tokenInfo, setTokenInfo] = useState<SwapTokenType[]>([]);

    const refreshBalance = () => {
        console.log("refresh balance");
    }

    useEffect(() => {
        setTokenInfo([
            {
                name: "Sui",
                image: "https://archive.cetus.zone/assets/image/sui/sui.png",
                balance: 1000000000
            },
            {
                name: "GP",
                image: "/GP-remove.png",
                balance: 99999
            }
        ]);
    }, []);

    return (
        <SwapTokenInfoContext.Provider value={[tokenInfo, refreshBalance]}>
            {children}
        </SwapTokenInfoContext.Provider>
    )
}