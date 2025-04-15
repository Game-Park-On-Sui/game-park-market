'use client'

import {createSlice, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {GameInfoType, getBalance, getGameInfo, getInfo} from "@/libs/contracts";

export type SwapTokenType = {
    name: string,
    image: string,
    balance: number
}

export type LinkedUserInfo = {
    name: string,
    isLinked: boolean
}

export type initialStateType = {
    account: string,
    tab: number,
    swapTokenInfo: [SwapTokenType, SwapTokenType],
    showWaiting: boolean,
    linkedUserInfo: LinkedUserInfo,
    gameInfo: GameInfoType | null | undefined
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
    showWaiting: false,
    linkedUserInfo: {
        name: "",
        isLinked: false
    },
    gameInfo: null
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
        },
        setLinkedUserInfo(state, action: { payload: string }) {
            state.linkedUserInfo.name = action.payload;
            state.linkedUserInfo.isLinked = action.payload !== "";
        },
        setGameInfo(state, action: { payload: GameInfoType | null | undefined }) {
            state.gameInfo = action.payload;
        }
    }
});

const {setAccount, setTab, setSwapTokenInfo, setShowWaiting, setLinkedUserInfo, setGameInfo} = pageInfoStore.actions;

const refreshAccount = (account: string) => {
    return async (dispatch: ThunkDispatch<{
        pageInfo: initialStateType
    }, undefined, UnknownAction> & Dispatch<UnknownAction>) => {
        dispatch(setAccount(account));
        if (!account) {
            dispatch(setSwapTokenInfo([0, 0]));
            dispatch(setLinkedUserInfo(""));
            dispatch(setGameInfo(null));
            return;
        }
        dispatch(setSwapTokenInfo(await getBalance(account)));
        dispatch(setLinkedUserInfo(await getInfo(account)));
        dispatch(setGameInfo(await getGameInfo(account)));
    }
}

export {setTab, setSwapTokenInfo, setShowWaiting};
export {refreshAccount};
export default pageInfoStore.reducer;