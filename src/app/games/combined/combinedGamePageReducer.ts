type collectFromAllWorkers = {
    type: "collectFromAllWorkers";
};

type addActiveWorker = {
    type: "addActiveWorker";
    activeWorker: number;
    workerBeingRemoved?: number;
};

type removeActiveWorker = {
    type: "removeActiveWorker";
    workerBeingRemoved: number;
};

export type CombinedGameReducerAction =
    | collectFromAllWorkers
    | addActiveWorker
    | removeActiveWorker;

export type CombinedGameState = {
    resources: {
        iron: number;
        gold: number;
        diamond: number;
    };
    resourceCollection: {
        activeWorkers: Record<number, number | undefined>;
        workerCollection: Record<number, number | undefined>;
    };
};

const objectKeys = <T extends object>(obj: T) =>
    Object.keys(obj) as (keyof T)[];

export const combinedGameReducer = (
    state: CombinedGameState,
    action: CombinedGameReducerAction,
) => {
    switch (action.type) {
        case "collectFromAllWorkers":
            // console.log("collecting from all workers", state)
            objectKeys(state.resourceCollection.activeWorkers).forEach(
                (worker) => {
                    // console.log("adding ", getWorkerFromId(worker).level, "to ", getWorkerFromId(worker).workerType, " it is ", getWorkerFromId(worker))
                    const count = state.resourceCollection.activeWorkers[
                        worker
                    ] as number;
                    state.resources[getWorkerFromId(worker).workerType] +=
                        getWorkerFromId(worker).level * count;
                },
            );
            return { ...state };
        case "addActiveWorker":
            console.log(
                "adding ",
                action.activeWorker,
                " removing ",
                action.workerBeingRemoved,
            );
            let workerCount =
                state.resourceCollection.activeWorkers[action.activeWorker];
            if (!workerCount) {
                workerCount = 1;
            } else {
                workerCount += 1;
            }

            state.resourceCollection.activeWorkers[action.activeWorker] =
                workerCount;

            if (action.workerBeingRemoved) {
                workerCount =
                    state.resourceCollection.activeWorkers[
                        action.workerBeingRemoved
                    ];
                if (!workerCount) {
                    delete state.resourceCollection.activeWorkers[
                        action.workerBeingRemoved
                    ];
                } else {
                    workerCount -= 1;
                    state.resourceCollection.activeWorkers[
                        action.workerBeingRemoved
                    ] = workerCount;
                }
            }
            return { ...state };
        case "removeActiveWorker":
            console.log("removing ", action.workerBeingRemoved, state);

            let workerCount2 =
                state.resourceCollection.activeWorkers[
                    action.workerBeingRemoved
                ];
            if (!workerCount2) {
                delete state.resourceCollection.activeWorkers[
                    action.workerBeingRemoved
                ];
            } else {
                workerCount2 -= 1;
                state.resourceCollection.activeWorkers[
                    action.workerBeingRemoved
                ] = workerCount2;
                if (workerCount2 === 0) {
                    delete state.resourceCollection.activeWorkers[
                        action.workerBeingRemoved
                    ];
                }
            }
            return { ...state };
        default:
            return state;
    }
};

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
} as const;

type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>;

const typeSafeModulo = <y extends number>(x: number, y: y) =>
    (x % y) as IntRange<0, y>;

export const getWorkerFromId = (
    id: number,
): { level: number; workerType: "iron" | "gold" | "diamond" } => {
    const level = Math.floor(id / 3) + 1;
    switch (typeSafeModulo(id, 3)) {
        case 0:
            return {
                level,
                workerType: "iron",
            };
        case 1:
            return {
                level,
                workerType: "gold",
            };
        case 2:
            return {
                level,
                workerType: "diamond",
            };
    }
};

workerTypes satisfies {
    [key: number]: {
        workerType: "iron" | "gold" | "diamond";
        level: number;
    };
};

export type ValidWorkerIds = keyof typeof workerTypes;

export const initialState: CombinedGameState = {
    resources: {
        iron: 0,
        gold: 0,
        diamond: 0,
    },
    resourceCollection: {
        activeWorkers: {},
        workerCollection: { "0": 1, "4": 1, "5": 1 },
    },
};
