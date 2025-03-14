'use client'

import {ReactNode} from "react";
import NavTabContextProvider, {NavTabContext} from "@/contexts/navTab";
import SwapTokenInfoContextProvider, {SwapTokenType, SwapTokenInfoContext} from "@/contexts/swapTokenInfo";

export type {
    SwapTokenType
}

export {
    NavTabContext,
    SwapTokenInfoContext,
}

export default function CustomProvider({children}: {children: ReactNode}) {
    return (
        <NavTabContextProvider>
            <SwapTokenInfoContextProvider>
                {children}
            </SwapTokenInfoContextProvider>
        </NavTabContextProvider>
    );
}