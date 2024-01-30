import { CombinedGameReducerAction, CombinedGameState, getWorkerFromId } from "@/app/games/combined/combinedGamePageReducer"
import { Button } from "@mui/material"
import { Dispatch } from "react"

type InventoryProps = {
    state: CombinedGameState
    dispatch: Dispatch<CombinedGameReducerAction>
}

export default function Inventory({ state, dispatch }: InventoryProps) {
    const mergeWorker = (workerIndex: number) => {
        return () => {
            dispatch({
                type: "combineWorkers",
                workerIndex,
            })
        }
    }
    const renderWorkerCollection = () => {
        const getReadyToBuy = (workerCount: number, activeWorkerCount?: number) => {
            if (activeWorkerCount) {
                return workerCount - activeWorkerCount >= 3
            }

            return workerCount >= 3
        }
        const columns: React.ReactNode[][] = [[], [], []]
        Object.entries(state.resourceCollection.workerCollection)
            .reverse()
            .forEach((entry) => {
                const [workerId, workerCount] = entry
                const { level, workerType } = getWorkerFromId(Number(workerId))
                const activeWorkers = state.resourceCollection.activeWorkerMap[Number(workerId)]
                const readyToBuy = getReadyToBuy(workerCount, activeWorkers) ? "bg-green-200" : "bg-red-200"
                columns[Number(workerId) % 3].push(
                    <div className="w-full h-10" onClick={mergeWorker(Number(workerId))} key={workerId}>
                        <Button variant="outlined" color="primary" className={`w-full h-full flex justify-between ${readyToBuy}`} key={workerId}>
                            <div>
                                {workerType[0]} {level}
                            </div>{" "}
                            <div className="mr-2">
                                {activeWorkers ?? 0} : {workerCount}
                            </div>
                        </Button>
                    </div>,
                )
            })
        return columns
    }
    const [ironColumn, goldColumn, diamondColumn] = renderWorkerCollection()
    return (
        <div className="flex">
            <div className="w-1/3">{ironColumn}</div>
            <div className="w-1/3">{goldColumn}</div>
            <div className="w-1/3">{diamondColumn}</div>
        </div>
    )
}
