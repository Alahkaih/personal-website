import {
    CombinedGameReducerAction,
    CombinedGameState,
    ValidWorkerIds,
    getWorkerFromId,
    workerTypes,
} from "@/app/games/combined/combinedGamePageReducer";
import { Dispatch, useEffect } from "react";
import SimpleDropdown from "./simpleDropdown";
//TODO: add reducer with resources and selected workers
type ResourceCollectionProps = {
    dispatch: Dispatch<CombinedGameReducerAction>;
    state: CombinedGameState;
};

export default function ResourceCollection({
    dispatch,
    state,
}: ResourceCollectionProps) {
    useEffect(() => {
        const interval = setInterval(
            () =>
                dispatch({
                    type: "collectFromAllWorkers",
                }),
            1000,
        );

        return () => clearInterval(interval);
    }, []);

    const getOptions = () => {
        return Object.entries(state.resourceCollection.workerCollection)
            .map((entry) => {
                const [workerId, workerCount] = entry;
                if (workerCount === 0) return;
                const worker = getWorkerFromId(Number(workerId));
                return {
                    id: workerId,
                    label: `${worker.workerType} ${worker.level}`,
                };
            })
            .filter((option) => option) as {
            id: ValidWorkerIds;
            label: string;
        }[];
    };

    const handleSelect = (workerId: string, oldWorkerId?: string) => {
        if (workerId === "" || Number.isNaN(Number(workerId))) return;
        if (workerId === "-1") {
            dispatch({
                type: "removeActiveWorker",
                workerBeingRemoved: Number(oldWorkerId),
            });
            return;
        }
        dispatch({
            type: "addActiveWorker",
            activeWorker: Number(workerId),
            workerBeingRemoved: Number(oldWorkerId),
        });
    };
    return (
        <div>
            <SimpleDropdown options={getOptions()} onSelect={handleSelect} />
        </div>
    );
}
