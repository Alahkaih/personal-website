import { CombinedGameState, getWorkerFromId } from "@/app/games/combined/combinedGamePageReducer"

type InventoryProps = {
    state: CombinedGameState
}

export default function Inventory({ state }: InventoryProps) {
    const renderWorkerCollection = () => {
        return Object.entries(state.resourceCollection.workerCollection)
            .reverse()
            .map((entry) => {
                const [workerId, workerCount] = entry
                const { level, workerType } = getWorkerFromId(Number(workerId))
                const activeWorkers = state.resourceCollection.activeWorkerMap[Number(workerId)]
                return (
                    <div key={workerId} className="w-2/5 bg-blue-400 flex justify-between mx-0.5 mt-4">
                        <div className="ml-2">
                            {workerType} {level}
                        </div>{" "}
                        <div className="mr-2">
                            {activeWorkers ?? 0} : {workerCount}
                        </div>
                    </div>
                )
            })
    }
    return <div className="flex flex-wrap justify-evenly -mx-2">{renderWorkerCollection()}</div>
}
