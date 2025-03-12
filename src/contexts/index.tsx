'use client'

import {ReactNode} from "react";
import NavTabContextProvider, {NavTabContext} from "@/contexts/navTab";

export {
    NavTabContext,
}

export default function CustomProvider({children}: {children: ReactNode}) {
    return (
        <NavTabContextProvider>
            {children}
        </NavTabContextProvider>
    );
}