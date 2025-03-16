import {createSlice} from "@reduxjs/toolkit";

export type SwapTokenType = {
    name: string,
    image: string,
    balance: number
}

export type initialStateType = {
    tab: number,
    swapTokenInfo: [SwapTokenType, SwapTokenType]
}

const initialState: initialStateType = {
    tab: 0,
    swapTokenInfo: [
        {
            name: "Sui",
            image: "https://archive.cetus.zone/assets/image/sui/sui.png",
            balance: 1000000000
        },
        {
            name: "GP",
            image: "/GP-remove.png",
            balance: 99999
        }
    ]
}

const pageInfoStore = createSlice({
    name: "pageInfo",
    initialState,
    reducers: {
        setTab(state, action: { payload: number }) {
            state.tab = action.payload;
        },
        setSwapTokenInfo(state, action: { payload: [number, number] }) {
            state.swapTokenInfo[0].balance = action.payload[0];
            state.swapTokenInfo[1].balance = action.payload[1];
        }
    }
});

const {setTab, setSwapTokenInfo} = pageInfoStore.actions;

export {setTab, setSwapTokenInfo};
export default pageInfoStore.reducer;