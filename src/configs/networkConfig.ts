import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {createNetworkConfig} from "@mysten/dapp-kit";
import {Transaction} from "@mysten/sui/transactions";

type Network = "mainnet" | "testnet";

const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

const {networkConfig, useNetworkVariable, useNetworkVariables} = createNetworkConfig({
    mainnet: {
        url: getFullnodeUrl("mainnet"),
        variables: {
            PackageID: "",
            UpgradeCap: "",
            Publisher: "",
            GPTreasuryCap: "",
            Pool: "",
            UserTable: ""
        }
    },
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            PackageID: "0x4db1c630558c5c1d9b648b253875750a5dfd5cb8d116392f580cbb21928e9198",
            UpgradeCap: "0x0aed9c31475130cc4696e37bd78a805c09f8c7efc5026c6f723c9c6bd0162691",
            Publisher: "0xc07f133e1187d68e674ff071d29c5d886a89950ac94cf5650451083603573692",
            GPTreasuryCap: "0xbd5eb7ca80a5e46e6f3dc782a50f582411a984819924a5b8c161486492b38d78",
            Pool: "0x2ee15f3d9acda37e0b7c4e486226c4171998e6db0dc39113d93e43e44c54365f",
            UserTable: "0x1d3f8e242b212d08fe552f3fb9908b61f97984ab5709acb1e1d208406e199a2d"
        }
    }
});

const suiClient = new SuiClient({
    url: networkConfig[network].url
});

type NetworkVariables = ReturnType<typeof useNetworkVariables>;

function getNetworkVariables() {
    return networkConfig[network].variables;
}

function createBetterTxFactory<T extends Record<string, unknown>>(
    fn: (tx: Transaction, networkVariables: NetworkVariables, params: T) => Transaction
) {
    return (params: T) => {
        const tx = new Transaction();
        const networkVariables = getNetworkVariables();
        return fn(tx, networkVariables, params);
    }
}

export type {NetworkVariables};
export {
    network,
    useNetworkVariable,
    useNetworkVariables,
    networkConfig,
    suiClient,
    createBetterTxFactory
}