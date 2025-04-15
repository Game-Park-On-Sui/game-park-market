'use client'

export default function JumpingCard() {
    return (
        <div className="relative w-36 h-36 text-xs hover:bg-gray-700 rounded-2xl transition-all duration-750 group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url(/BlackSquid-Removebg.png)] bg-contain bg-no-repeat bg-center opacity-60"></div>
            <div className="w-full h-full flex flex-col justify-end items-start pb-2 pl-1 group-hover:opacity-60">
                <span>Owner: 0x2222...3333</span>
                <span>ObjectID: 0x1234...1235</span>
            </div>
            <div className="absolute flex flex-col items-start -bottom-20 left-0 w-full pl-1 text-white group-hover:bottom-2 transition-all duration-750">
                <span>CurPos: 1000</span>
                <span>CurPosAward: 10000</span>
                <span>TotalPos: 10000</span>
                <span>TotalAward: 100000</span>
            </div>
        </div>
    );
}