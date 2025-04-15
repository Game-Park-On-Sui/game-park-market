'use client'

import {Swap, Trade, Waiting} from "@/components";
import {useAppSelector} from "@/store";

export default function Home() {
    const tab = useAppSelector(state => state.pageInfo.tab);
    const showWaiting = useAppSelector(state => state.pageInfo.showWaiting);

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#041f4b] select-none">
                {
                    tab === 0
                        ?
                        <Swap/>
                        :
                        <Trade/>
                }
            </div>
            {showWaiting && <Waiting />}
        </>
    );
}
