import {
    CombinedGameReducerAction,
    CombinedGameState,
    ValidWorkerIds,
    getWorkerFromId,
    workerTypes,
} from "@/app/games/combined/combinedGamePageReducer"
import { Dispatch, useEffect } from "react"
import SimpleDropdown from "./simpleDropdown"
//TODO: add reducer with resources and selected workers
type ResourceCollectionProps = {
    dispatch: Dispatch<CombinedGameReducerAction>
    state: CombinedGameState
}

export default function ResourceCollection({ dispatch, state }: ResourceCollectionProps) {
    useEffect(() => {
        const interval = setInterval(
            () =>
                dispatch({
                    type: "collectFromAllWorkers",
                }),
            1000,
        )

        return () => clearInterval(interval)
    }, [dispatch])

    const getOptions = () => {
        return Object.entries(state.resourceCollection.workerCollection)
            .map((entry) => {
                const [workerId, workerCount] = entry
                const numberOfActiveWorkers = state.resourceCollection.activeWorkerMap[Number(workerId)]
                if (workerCount === 0) return
                if (numberOfActiveWorkers && workerCount - numberOfActiveWorkers <= 0) return
                const worker = getWorkerFromId(Number(workerId))
                return {
                    id: workerId,
                    label: `${worker.workerType} ${worker.level}`,
                }
            })
            .filter((option) => option) as {
            id: ValidWorkerIds
            label: string
        }[]
    }

    const handleSelect = (workerIndex: number, workerId: string, oldWorkerId?: string) => {
        console.log(state)
        if (workerId === "" || Number.isNaN(Number(workerId))) return
        if (workerId === "-1") {
            dispatch({
                type: "removeActiveWorker",
                workerBeingRemoved: Number(oldWorkerId),
                workerIndex,
            })
            return
        }
        dispatch({
            type: "addActiveWorker",
            activeWorker: Number(workerId),
            workerBeingRemoved: Number(oldWorkerId),
            workerIndex,
        })
    }

    const generateHandleSelect = (workerIndex: number) => {
        return (workerId: string, oldWorkerId?: string) => {
            handleSelect(workerIndex, workerId, oldWorkerId)
        }
    }

    const getDropDowns = () => {
        const dropdowns = []
        for (let i = 0; i < state.resourceCollection.activeWorkerLimit; i++) {
            dropdowns.push(
                <SimpleDropdown
                    key={i}
                    options={getOptions()}
                    onSelect={generateHandleSelect(i)}
                    value={state.resourceCollection.activeWorkerList[i].toString()}
                />,
            )
        }
        return dropdowns
    }
    return (
        <div>
            {/* <SimpleDropdown options={getOptions()} onSelect={handleSelect} value={Object.keys(state.resourceCollection.activeWorkers)[0]} /> */}
            {getDropDowns()}
        </div>
    )
}
