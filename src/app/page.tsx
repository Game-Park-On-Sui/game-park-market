'use client'

import {useContext} from "react";
import {NavTabContext} from "@/contexts";
import Swap from "@/components/swap";

export default function Home() {
    const [tab] = useContext(NavTabContext);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#041f4b] select-none">
            {
                tab === 0
                ?
                <Swap />
                :
                <div>1</div>
            }
        </div>
    );
}
