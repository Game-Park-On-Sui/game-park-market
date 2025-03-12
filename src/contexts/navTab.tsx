'use client'

import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

export const NavTabContext =
    createContext<[number, Dispatch<SetStateAction<number>>]>([0, () => {}]);

export default function NavTabContextProvider({children}: {children: ReactNode}) {
    const [tab, setTab] = useState<number>(0);
    return (
        <NavTabContext.Provider value={[tab, setTab]}>
            {children}
        </NavTabContext.Provider>
    );
}