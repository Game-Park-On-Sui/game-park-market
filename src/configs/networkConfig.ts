import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {createNetworkConfig} from "@mysten/dapp-kit";
import {Transaction} from "@mysten/sui/transactions";

const network = "testnet";

const {networkConfig, useNetworkVariable, useNetworkVariables} = createNetworkConfig({
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            PackageID: "0x56a6de0ab18d5e9ca8d69a451197bd512ecca73e1d9a6f76dc9381a3f8680af7",
            UpgradeCap: "0xa533ceff52f814e20640c3d54a294f81551ba35a47fb17ea11b4c084cc512746",
            Publisher: "0xe9fb014d83d8ec10c9e7e6ed17d3a2c0cee2b272e7033c69f4c54b8d9dd7230f",
            GPTreasuryCap: "0xb19670384c0988274466554d57329fb35ecb1710fde2740f2498ce845e66a177",
            Pool: "0xaefbda6f85454f269b2ee48465fcf1563bf139384d5bc38bdb5d78a728a91305",
            UserTable: "0x9e6c20ebd1fb5c57fe1c685647acaa531a966def91d5960fa7cfec992ce4eede"
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