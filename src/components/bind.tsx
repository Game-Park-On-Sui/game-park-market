'use client'

import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

export default function Bind({setIsBinding}: {setIsBinding: Dispatch<SetStateAction<boolean>>}) {
    const [userName, setUserName] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        const newUserName = e.target.value.trim();
        if (newUserName.length > 20)
            return;
        for (let i = 0; i < newUserName.length; i++) {
            const code = newUserName[i];
            if (!(code >= '0' && code <= '9' || code >= 'a' && code <= 'z' || code >= 'A' && code <= 'Z'))
                return;
        }
        setUserName(newUserName);
        setIsVisible(newUserName.length > 0);
    }

    return (
        <div className="fixed w-full h-full z-50">
            <div className="w-full h-full bg-black opacity-60" onClick={() => setIsBinding(false)}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-auto p-20 bg-[#F1F2F5] border border-black rounded-2xl">
                <div className="flex flex-col gap-6 items-center text-[#9d9d9d]">
                    <span className="text-2xl text-[#35a1f7] animate-pulse">Game Park On Sui</span>
                    <div className="flex flex-col gap-1 items-start">
                        <span>UserName:</span>
                        <input className={"focus:outline-none " + (userName.length > 0 ? "text-[#041f4b]" : "")} placeholder="UserName" value={userName} onChange={changeUserName} />
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <span>Sui Address:</span>
                        <input placeholder="UserName" disabled={true} />
                    </div>
                    <div className="opacity-100 text-xs text-gray-400">0-9 a-z A-Z(length not exceeding 20)</div>
                    <div className={"w-full border rounded-full border-[#0a0e0f] bg-[#86C7FB] text-[#041f4b] text-center " + (!isVisible ? "opacity-60" : "hover:bg-[#9AD1FB] cursor-pointer opacity-100")}>Bind</div>
                </div>
            </div>
        </div>
    );
}