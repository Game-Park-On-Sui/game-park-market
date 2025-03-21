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
            PackageID: "0x6c6f2aebf504f816d0fa28058f937402a23abccc2c2125f0f5964d8b82e86d6d",
            UpgradeCap: "0xcb6999a3d85909ddc26747378016231dec68e782e1f0e808acd11087347de012",
            Publisher: "0x145d8952e628077dfde569535fe36250f5d36b632f66d689b26f4ae67f84752d",
            GPTreasuryCap: "0x0f29ba58784578dc62369ef32f7ad90c97b357a4e279e2fe4fd81e61f0a66007",
            Pool: "0x8afa953a2801c5cfb5672e03f1faf93fa6b993170279d3a2e4088cc2df0b9bca",
            UserTable: "0xd95b3ff7dc99ccdcc422353790d0fed3154d25bd0a3cf7d87414800fca8724a9"
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