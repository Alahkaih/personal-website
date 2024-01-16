import { IdleGameState, IdleGameReducerAction } from "@/app/games/idle/reducer"
import { Dispatch } from "react"
import CustomButton from "./customResourceButton"

type resourceProps = {
    state: IdleGameState
    updateState: Dispatch<IdleGameReducerAction>
    resourceId: number
}

export default function Resource({ state, updateState, resourceId }: resourceProps) {
    const gatherResource = () => {
        updateState({
            type: "gatherResource",
            resourceId: resourceId,
        })
    }
    const buyResource = () => {
        updateState({
            type: "buyResource",
            resourceId: resourceId,
        })
    }
    const { baseCost, costMultiplier, count, name } = state.resources[resourceId]
    return (
        <div className="flex flex-col w-1/4 pt-10">
            <CustomButton primary={name} secondary={count} color="white" onClick={gatherResource} />
            <CustomButton primary={`Buy`} secondary={costMultiplier * count + baseCost} color="purple" onClick={buyResource} />
        </div>
    )
}
