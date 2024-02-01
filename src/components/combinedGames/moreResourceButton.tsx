import { CombinedGameReducerAction, CombinedGameState } from "@/app/games/combined/combinedGamePageReducer";
import { Button } from "@mui/material";
import { Dispatch } from "react";

type MoreResourceButtonProps = {
    state: CombinedGameState
    dispatch: Dispatch<CombinedGameReducerAction>
}

export default function MoreResourceButton({state, dispatch}: MoreResourceButtonProps) {
    const iron = 100 * Math.pow(2, state.resourceCollection.activeWorkerLimit)
    const gold = state.resourceCollection.activeWorkerLimit > 3 ? 100 * Math.pow(2, state.resourceCollection.activeWorkerLimit - 3) : 0
    const diamond = state.resourceCollection.activeWorkerLimit > 6 ? 100 * Math.pow(2, state.resourceCollection.activeWorkerLimit - 6) : 0

    const readyToBuy = iron <= state.resources.iron && gold <= state.resources.gold && diamond <= state.resources.diamond ? "bg-green-200" : "bg-red-200"

    const buyNewResource = () => {
        dispatch({
            type: "buyNewResource",
            cost: {iron, gold, diamond}
        })
    }

    return (
        <Button variant="outlined" color="primary" className={`flex justify-between w-full ${readyToBuy}`} onClick={buyNewResource}>
                <p>{`Buy a new resource \n`}</p>
                <div className="mt-2">
                <p>Iron: {iron}</p>
                <p>Gold: {gold}</p>
                <p>Diamond: {diamond}</p>
                </div>
        </Button>
    )
}