import { StoreItem } from "@/components/combinedGames/store"
import { objectKeys, objectEntries } from "@/utilities/typeSafeObjects"

type collectFromAllWorkers = {
    type: "collectFromAllWorkers"
}

type addActiveWorker = {
    type: "addActiveWorker"
    workerIndex: number
    activeWorker: number
    workerBeingRemoved?: number
}

type removeActiveWorker = {
    type: "removeActiveWorker"
    workerIndex: number
    workerBeingRemoved: number
}

type BuyNewWorker = {
    type: "buyNewWorker"
    workerIndex: number
    cost: StoreItem["cost"]
}

export type CombinedGameReducerAction = collectFromAllWorkers | addActiveWorker | removeActiveWorker | BuyNewWorker

export type CombinedGameState = {
    resources: {
        iron: number
        gold: number
        diamond: number
    }
    resourceCollection: {
        activeWorkerMap: Record<number, number | undefined>
        activeWorkerList: number[]
        resourceRateMap: Record<WorkerTypes, number>
        workerCollection: Record<number, number>
        activeWorkerLimit: number
    }
}

export const combinedGameReducer = (state: CombinedGameState, action: CombinedGameReducerAction) => {
    switch (action.type) {
        case "collectFromAllWorkers":
            // console.log("collecting from all workers", state)
            objectKeys(state.resourceCollection.activeWorkerMap).forEach((worker) => {
                // console.log("adding ", getWorkerFromId(worker).level, "to ", getWorkerFromId(worker).workerType, " it is ", getWorkerFromId(worker))
                const count = state.resourceCollection.activeWorkerMap[worker] as number
                const { workerType, level } = getWorkerFromId(worker)
                state.resources[workerType] += level * count
            })
            return { ...state }
        case "addActiveWorker":
            console.log("adding ", action.activeWorker, " removing ", action.workerBeingRemoved)
            let workerCount = state.resourceCollection.activeWorkerMap[action.activeWorker]
            if (!workerCount) {
                workerCount = 1
            } else {
                workerCount += 1
            }
            const { workerType: addedWorkerType, level: addedLevel } = getWorkerFromId(action.activeWorker)

            state.resourceCollection.resourceRateMap[addedWorkerType] += addedLevel
            state.resourceCollection.activeWorkerMap[action.activeWorker] = workerCount
            state.resourceCollection.activeWorkerList[action.workerIndex] = action.activeWorker

            if (action.workerBeingRemoved !== undefined && action.workerBeingRemoved !== -1) {
                workerCount = state.resourceCollection.activeWorkerMap[action.workerBeingRemoved]
                if (workerCount) {
                    workerCount -= 1
                    if (workerCount === 0) {
                        delete state.resourceCollection.activeWorkerMap[action.workerBeingRemoved]
                    } else {
                        state.resourceCollection.activeWorkerMap[action.workerBeingRemoved] = workerCount
                    }
                }
                const { workerType: removedWorkerType, level: removedLevel } = getWorkerFromId(action.workerBeingRemoved)
                state.resourceCollection.resourceRateMap[removedWorkerType] -= removedLevel
            }
            return { ...state }
        case "removeActiveWorker":
            console.log("removing ", action.workerBeingRemoved, state)

            let workerCount2 = state.resourceCollection.activeWorkerMap[action.workerBeingRemoved]
            if (workerCount2) {
                delete state.resourceCollection.activeWorkerMap[action.workerBeingRemoved]
                workerCount2 -= 1
                state.resourceCollection.activeWorkerMap[action.workerBeingRemoved] = workerCount2
                if (workerCount2 === 0) {
                    delete state.resourceCollection.activeWorkerMap[action.workerBeingRemoved]
                }
            }
            const { workerType: removedWorkerType, level: removedLevel } = getWorkerFromId(action.workerBeingRemoved)
            state.resourceCollection.resourceRateMap[removedWorkerType] -= removedLevel
            state.resourceCollection.activeWorkerList[action.workerIndex] = -1
            return { ...state }
        case "buyNewWorker": 
        console.log("buying new worker", action)
            const canBuy = objectEntries(action.cost).every(([resource, amount]) => state.resources[resource] >= amount)
            if(!canBuy) return state
            objectKeys(state.resources).forEach((resource) => {
                state.resources[resource] -= action.cost[resource]
            })
            if(state.resourceCollection.workerCollection[action.workerIndex])
                state.resourceCollection.workerCollection[action.workerIndex] += 1
            else
                state.resourceCollection.workerCollection[action.workerIndex] = 1
            return {...state}
        default:
            return state
    }
}

export const workerTypes = {
    "0": {
        workerType: "iron",
        level: 0,
    },
    "1": {
        workerType: "iron",
        level: 1,
    },
    "2": {
        workerType: "gold",
        level: 1,
    },
    "3": {
        workerType: "diamond",
        level: 1,
    },
    "4": {
        workerType: "iron",
        level: 2,
    },
    "5": {
        workerType: "gold",
        level: 2,
    },
    "6": {
        workerType: "diamond",
        level: 2,
    },
} as const

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

const typeSafeModulo = <y extends number>(x: number, y: y) => (x % y) as IntRange<0, y>

export type WorkerTypes = "iron" | "gold" | "diamond"

export const getWorkerFromId = (id: number): { level: number; workerType: WorkerTypes } => {
    const level = Math.floor(id / 3) + 1
    switch (typeSafeModulo(id, 3)) {
        case 0:
            return {
                level,
                workerType: "iron",
            }
        case 1:
            return {
                level,
                workerType: "gold",
            }
        case 2:
            return {
                level,
                workerType: "diamond",
            }
    }
}

export const getWorkerLabel = (id: number) => {
    if (id === -1) {
        return "None"
    }
    const { level, workerType } = getWorkerFromId(id)
    return `${workerType} ${level}`
}

workerTypes satisfies {
    [key: number]: {
        workerType: "iron" | "gold" | "diamond"
        level: number
    }
}

export type ValidWorkerIds = keyof typeof workerTypes

const baseWorkerLimit = 2

export const initialState: CombinedGameState = {
    resources: {
        iron: 0,
        gold: 0,
        diamond: 0,
    },
    resourceCollection: {
        activeWorkerMap: {},
        activeWorkerLimit: baseWorkerLimit,
        activeWorkerList: Array(baseWorkerLimit).fill("-1"),
        resourceRateMap: {
            iron: 0,
            gold: 0,
            diamond: 0,
        },
        workerCollection: { "0": 2, "4": 1, "5": 1, "7": 0 },
    },
}
