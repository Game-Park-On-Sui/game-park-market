'use client'

import {GameInfoType} from "@/libs/contracts";
import {useEffect, useState} from "react";

export default function JumpingCard({info}: {info: GameInfoType[]}) {
    const [type, setType] = useState<number>(0);
    useEffect(() => {
        setType(info.length > 1 ? 1 : 0)
    }, [info]);

    return (
        <div className="relative w-36 h-36 text-xs hover:bg-gray-700 rounded-2xl transition-all duration-750 group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url(/BlackSquid-Removebg.png)] bg-contain bg-no-repeat bg-center opacity-60"></div>
            <div className="w-full h-full flex flex-col justify-end items-start pb-2 pl-1 group-hover:opacity-60">
                <span>Owner: 0x2222...3333</span>
                <span>ObjectID: 0x1234...1235</span>
            </div>
            {
                type === 1 &&
                <div className="absolute flex flex-col items-start -top-20 left-0 w-full pl-1 text-white group-hover:top-2 transition-all duration-750 text-[0.6rem]">
                    <span>{`CurPos: ${info[0].fields.value.fields.list}`}</span>
                    <span>{`CurPosAward: ${info[0].fields.value.fields.cur_step_paid}`}</span>
                    <span>{`TotalPos: ${info[0].fields.value.fields.end}`}</span>
                    <span>{`TotalAward: ${info[0].fields.value.fields.final_reward}`}</span>
                </div>
            }
            <div className={"absolute flex flex-col items-start -bottom-20 left-0 w-full pl-1 text-white group-hover:bottom-2 transition-all duration-750 " + (type === 1 ? "text-[0.6rem]" : "")}>
                <span>{`CurPos: ${info[type].fields.value.fields.list}`}</span>
                <span>{`CurPosAward: ${info[type].fields.value.fields.cur_step_paid}`}</span>
                <span>{`TotalPos: ${info[type].fields.value.fields.end}`}</span>
                <span>{`TotalAward: ${info[type].fields.value.fields.final_reward}`}</span>
            </div>
        </div>
    );
}