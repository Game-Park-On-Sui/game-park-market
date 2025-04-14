import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {createNetworkConfig} from "@mysten/dapp-kit";
import {Transaction} from "@mysten/sui/transactions";

type Network = "mainnet" | "testnet";

const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

const {networkConfig, useNetworkVariable, useNetworkVariables} = createNetworkConfig({
    mainnet: {
        url: getFullnodeUrl("mainnet"),
        variables: {
            GP: {
                PackageID: "",
                UpgradeCap: "",
                Publisher: "",
                GPTreasuryCap: "",
                Pool: "",
                UserTable: ""
            },
            Kiosk: {
                PackageID: "",
                UpgradeCap: "",
                Publisher: "",
                GameParkKioskCap: ""
            }
        }
    },
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            GP: {
                PackageID: "0x87277dd3ce62f7b024c2fb2e5698bd75eded0e414135ee038420b0a3b5462eed",
                UpgradeCap: "0x109304fb11bc6ac1db1758c487ed6df81cba08bca85194b6a06e524e243a1225",
                Publisher: "0xaaa07e29943772a84f61aadfb7c0e324a871af0c06f08adc4307e67c7ce53b6c",
                GPTreasuryCap: "0x700a67c15dca2cbef1b3ebaaafb00b55fd634726d3d0345e36dc548c24472879",
                Pool: "0xf9e962ed230c98064612d0d775c44fb54f7ed024e73dabbb2a153484d91dbea3",
                UserTable: "0x55b6cccc67226ec748aa9f932705c01dd226db3b5aa9527b8ba968cd04114ee2"
            },
            Kiosk: {
                PackageID: "0x867cf4393eb30149fc99dfac86623b905f699f403f1c14b37a769defbe84ce8f",
                UpgradeCap: "0x19d7f1d4dd4766f506ad4f2701a0437e37195adf4b4129a620818b2f38d8ebc9",
                Publisher: "0x3c95204812e719d08c0d1bee957532336bfc3c847433586731b647eb2bf06594",
                GameParkKioskCap: "0x75fb0c34c82d5633805df715150072e4c88fe1d29b8f0cf04101a4f817d99511"
            }
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