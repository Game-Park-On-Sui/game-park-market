'use client'

import {network, networkConfig, suiClient} from "@/configs/networkConfig";

async function getNFTID(owner: string, cursor: string | null | undefined): Promise<string | undefined> {
    const data = await suiClient.getOwnedObjects({
        owner,
        cursor,
        options: {
            showType: true
        }
    });
    const found = data.data.find(data => data.data?.type === `${networkConfig[network].variables.Jumping.PackageID}::nft::BlackSquidJumpingNFT`);
    return found ? found.data?.objectId : (data.hasNextPage ? await getNFTID(owner, data.nextCursor) : undefined);
}

type DataPoolType = {
    fields: {
        pool_table: {
            fields: {
                id: {
                    id: string
                }
            }
        }
    }
}

export type GameInfoType = {
    fields: {
        key: string,
        value: {
            fields: {
                list: string | number,
                row: string | number,
                end: string | number,
                cur_step_paid: string | number,
                final_reward: string | number
            }
        }
    }
}

type UserInfoType = {
    fields: {
        value: {
            fields: {
                hash_data: {
                    fields: {
                        contents: GameInfoType[]
                    }
                },
                steps: string
            }
        }
    }
}

async function getUserInfoID(id: string, cursor: string | null | undefined, nftID: string): Promise<string | undefined> {
    const data = await suiClient.getDynamicFields({
        parentId: id,
        cursor,
    });
    const found = data.data.find(data => (data.name.value as string) === nftID);
    return found ? found.objectId : (data.hasNextPage ? await getUserInfoID(id, data.nextCursor, nftID) : undefined);
}

async function getUserInfo(id: string) {
    const data = await suiClient.getObject({
        id,
        options: {
            showContent: true
        }
    });
    return data.data?.content as unknown as UserInfoType;
}

export async function getGameInfo(owner: string) {
    if (!owner)
        return [];
    const nftID = await getNFTID(owner, null);
    if (!nftID)
        return [];
    const dataPool = await suiClient.getObject({
        id: networkConfig[network].variables.Jumping.DataPool,
        options: {
            showContent: true
        }
    });
    const userInfoID = await getUserInfoID((dataPool.data?.content as unknown as DataPoolType).fields.pool_table.fields.id.id, null, nftID);
    if (!userInfoID)
        return [];
    const userInfo = await getUserInfo(userInfoID);
    return userInfo.fields.value.fields.hash_data.fields.contents;
}