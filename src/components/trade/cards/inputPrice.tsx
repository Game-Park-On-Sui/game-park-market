'use client'

import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {setSellingCard} from "@/store/modules/pageInfo";
import {Delete} from "lucide-react";
import {ChangeEvent, useState} from "react";

export default function InputPrice({nftID}: {nftID: string}) {
    const dispatch = useDispatch<AppDispatch>();
    const [price, setPrice] = useState<string>("");
    const changeInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value;
        for (let i = 0; i < amount.length; i++) {
            const num = amount[i];
            if (num < '0' || num > '9')
                return;
        }
        let i = 0;
        while (i < amount.length && amount[i] === '0')
            i = i + 1;
        const finalAmount = i < amount.length ? amount.slice(i) : '';
        setPrice(finalAmount);
    }

    return (
        <div className="fixed w-full h-full z-50 select-none">
            <div className="w-full h-full bg-black opacity-60" onClick={() => dispatch(setSellingCard(""))}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center w-96 h-96 border border-black rounded-2xl bg-[#afb3b5]">
                    <Delete className="self-start cursor-pointer text-[#35a1f7] hover:text-[#196ae3] m-1" onClick={() => dispatch(setSellingCard(""))}/>
                    <div className="flex-1 flex flex-col gap-8 items-center">
                        <span className="text-4xl mt-5 mb-5 text-[#041f4b]">Sell</span>
                        <div>
                            <span className="text-[#041f4b]">Price: </span>
                            <input className="w-28 font-bold focus:outline-none px-1" placeholder={"InputPrice"} value={price} onChange={changeInputPrice} />
                        </div>
                        <span className="text-[#041f4b]">{`ObjectID: ${nftID.slice(0, 6)}...${nftID.slice(-4)}`}</span>
                    </div>
                    <div className={"w-1/2 h-8 rounded-full border-2 border-[#0a0e0f] bg-[#86C7FB] mb-20 text-center leading-7 text-[#0a0e0f] " + (price ? "hover:bg-[#9AD1FB] cursor-pointer" : "opacity-60")}>{price ? "Confirm" : "Please Enter Price"}</div>
                </div>
            </div>
        </div>
    );
}