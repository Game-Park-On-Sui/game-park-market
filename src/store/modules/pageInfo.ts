'use client'

import {createSlice, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {getBalance} from "@/libs/contracts";

export type SwapTokenType = {
    name: string,
    image: string,
    balance: number
}

export type initialStateType = {
    account: string,
    tab: number,
    swapTokenInfo: [SwapTokenType, SwapTokenType],
    showWaiting: boolean
}

const initialState: initialStateType = {
    account: "",
    tab: 0,
    swapTokenInfo: [
        {
            name: "Sui",
            image: "https://archive.cetus.zone/assets/image/sui/sui.png",
            balance: 0
        },
        {
            name: "GP",
            image: "/GP-remove.png",
            balance: 0
        }
    ],
    showWaiting: false
}

const pageInfoStore = createSlice({
    name: "pageInfo",
    initialState,
    reducers: {
        setAccount(state, action: {payload: string}) {
            state.account = action.payload;
        },
        setTab(state, action: { payload: number }) {
            state.tab = action.payload;
        },
        setSwapTokenInfo(state, action: { payload: [number, number] }) {
            state.swapTokenInfo[0].balance = action.payload[0];
            state.swapTokenInfo[1].balance = action.payload[1];
        },
        setShowWaiting(state, action: { payload: boolean }) {
            state.showWaiting = action.payload;
        }
    }
});

const {setAccount, setTab, setSwapTokenInfo, setShowWaiting} = pageInfoStore.actions;

const refreshAccount = (account: string) => {
    return async (dispatch: ThunkDispatch<{
        pageInfo: initialStateType
    }, undefined, UnknownAction> & Dispatch<UnknownAction>) => {
        dispatch(setAccount(account));
        if (!account) {
            dispatch(setSwapTokenInfo([0, 0]));
            return;
        }
        dispatch(setSwapTokenInfo(await getBalance(account)));
    }
}

export {setTab, setSwapTokenInfo, setShowWaiting};
export {refreshAccount};
export default pageInfoStore.reducer;