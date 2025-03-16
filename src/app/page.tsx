'use client'

import Swap from "@/components/swap";
import {useAppSelector} from "@/store";

export default function Home() {
    const tab = useAppSelector(state => state.pageInfo.tab);

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
