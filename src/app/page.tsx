'use client'

import {Swap, Trade, Waiting} from "@/components";
import {useAppSelector} from "@/store";
import {InputPrice} from "@/components/trade/cards";

export default function Home() {
    const tab = useAppSelector(state => state.pageInfo.tab);
    const showWaiting = useAppSelector(state => state.pageInfo.showWaiting);
    const sellingCard = useAppSelector(state => state.pageInfo.sellingCard);

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
            {sellingCard && <InputPrice nftID={sellingCard} />}
        </>
    );
}
