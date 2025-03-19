'use client'

import {createBetterTxFactory} from "@/configs/networkConfig";
import {coinWithBalance} from "@mysten/sui/transactions";

export const swapSuiToGPTx = createBetterTxFactory<{
    amount: number,
    sender: string
}>((tx, networkVariables, params) => {
    tx.setSender(params.sender);
    tx.moveCall({
        package: networkVariables.PackageID,
        module: "gp",
        function: "buy",
        arguments: [
            tx.object(networkVariables.GPTreasuryCap),
            tx.object(networkVariables.Pool),
            coinWithBalance({
                balance: params.amount
            })
        ]
    });
    return tx;
})

export const swapGPToSuiTx = createBetterTxFactory<{
    amount: number,
    sender: string
}>((tx, networkVariables, params) => {
    tx.setSender(params.sender);
    tx.moveCall({
        package: networkVariables.PackageID,
        module: "gp",
        function: "sell",
        arguments: [
            tx.object(networkVariables.GPTreasuryCap),
            tx.object(networkVariables.Pool),
            coinWithBalance({
                balance: params.amount,
                type: `${networkVariables.PackageID}::gp::GP`
            })
        ]
    });
    return tx;
})