import { CombinedGameState, CombinedGameReducerAction, WorkerTypes, getWorkerFromId } from "@/app/games/combined/combinedGamePageReducer"
import { Button } from "@mui/material"
import { Dispatch } from "react"

type StoreProps = {
    state: CombinedGameState
    dispatch: Dispatch<CombinedGameReducerAction>
}

export default function Store({ dispatch, state }: StoreProps) {
    const getReadyToBuy = (items: StoreItem["cost"]) => {
        return Object.entries(items).every(([resource, amount]) => state.resources[resource as WorkerTypes] >= amount)
    }
    const getStoreOptions = () => {
        return Object.entries(storeOptions).map((entry) => {
            const [workerId, { cost }] = entry
            const { workerType, level } = getWorkerFromId(Number(workerId))
            const readyToBuy = getReadyToBuy(cost) ? "bg-green-200" : "bg-red-200"
            const buyWorker = () => {
                console.log("clicked")
                dispatch({ type: "buyNewWorker", workerIndex: Number(workerId), cost })
            }
            return (
                <div className="m-5" onClick={buyWorker} key={workerId}>
                    <Button variant="outlined" color="primary" className={`w-full flex justify-between ${readyToBuy}`} key={workerId}>
                        <div>
                            {workerType} {level}
                        </div>{" "}
                        <div className="mr-2">
                            I {cost.iron} G {cost.gold} D {cost.diamond}
                        </div>
                    </Button>
                </div>
            )
        })
    }
    return <div>{getStoreOptions()}</div>
}

export type StoreItem = {
    cost: {
        [resource in WorkerTypes]: number
    }
}
type StoreOptions = {
    [worker: number]: StoreItem
}

const storeOptions: StoreOptions = {
    0: {
        cost: {
            iron: 135,
            gold: 0,
            diamond: 0,
        },
    },
    1: {
        cost: {
            iron: 350,
            gold: 0,
            diamond: 0,
        },
    },
    2: {
        cost: {
            iron: 500,
            gold: 100,
            diamond: 0,
        },
    },
}
