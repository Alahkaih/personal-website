import { CombinedGameReducerAction, CombinedGameState, getWorkerFromId } from "@/app/games/combined/combinedGamePageReducer";
import { Dispatch } from "react";

type InventoryProps = {
    dispatch: Dispatch<CombinedGameReducerAction>;
    state: CombinedGameState;
}

export default function Inventory({state, dispatch} : InventoryProps) {
    const renderWorkerCollection = () => {
        return Object.entries(state.resourceCollection.workerCollection).reverse().map((entry) => {
            const [workerId, workerCount] = entry;
            const {level, workerType} = getWorkerFromId(Number(workerId))
            return <div key={workerId} className="w-2/5 bg-blue-400 flex justify-between mx-0.5 mt-4">
                <div className="ml-2">{workerType} {level}</div> <div className="mr-2">{workerCount}</div>
            </div>
        })
    }
    return (
        <div className="flex flex-wrap justify-evenly -mx-2">
            {renderWorkerCollection()}
        </div>
    );
}