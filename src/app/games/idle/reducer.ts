type UpdateResourceAction = {
    type: "gatherResource",
    resourceId: number
}

type BuyResourceAction = {
    type: "buyResource",
    resourceId: number
}

type CreateResourceAction = {
    type: "createResource",
    resourceName: string,
    costMultiplier: number,
    baseCost: number
}

type updateAllResource = {
    type: "updateAllResources"
}

export type IdleGameReducerAction = UpdateResourceAction | BuyResourceAction | CreateResourceAction | updateAllResource

export type IdleGameState = {
    gold: number,
    resources: {
        [key: number]: {
            name: string,
            count: number,
            costMultiplier: number,
            baseCost: number
        }
    }
}

export const idleGameReducer = (state: IdleGameState, action: IdleGameReducerAction) => {
    switch (action.type) {
        case "gatherResource":
            console.log("gathering resource")
            if (action.resourceId === 0) {
                return {
                    ...state,
                    gold: state.gold + state.resources[0].count
                }
            }
            const resourceToBeUpdated = state.resources[action.resourceId - 1];
            resourceToBeUpdated.count += state.resources[action.resourceId].count
            return {
                ...state,
                resources: {
                    ...state.resources,
                    [action.resourceId - 1]: resourceToBeUpdated
                }
            }
        case "buyResource":
            console.log("buying resource")
            const goldCost = (state.resources[action.resourceId].costMultiplier * state.resources[action.resourceId].count) + state.resources[action.resourceId].baseCost
            if(goldCost > state.gold) {
                return state
            }
            return {
                resources: {
                    ...state.resources,
                    [action.resourceId]: {
                        ...state.resources[action.resourceId],
                        count: state.resources[action.resourceId].count + 1
                    }
                },
                gold: state.gold - goldCost
            }
        case "createResource":
            console.log("creating resource")
            return {
                ...state,
                resources: {
                    ...state.resources,
                    [Object.keys(state.resources).length]: {
                        name: action.resourceName,
                        count: 0,
                        costMultiplier: action.costMultiplier,
                        baseCost: action.baseCost
                    }
                }
            }
        case "updateAllResources":
            console.log("updating all resources")
            const newResources = Object.entries(state.resources).map(entry => {
                const [key, resource] = entry
                const newCount = state.resources[Number(key) + 1]?.count ? resource.count + state.resources[Number(key) + 1]?.count :  resource.count
                return {
                    ...resource,
                    count: newCount
                }
            })

            return {
                gold: state.gold + state.resources[0].count,
                resources: newResources
            }
        default:
            return state
    }
}