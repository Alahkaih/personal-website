"use client";

import ResourceCollection from "@/components/combinedGames/resourceCollection";
import { ReactNode, useReducer } from "react";
import { combinedGameReducer, initialState } from "./combinedGamePageReducer";
import ResourceHeader from "@/components/combinedGames/resourceHeader";

export default function Combined() {
    //TODO FIX BUG WHERE STATE IS PARTIALLY CARRIED OVER BETWEEN REDIRECTS
    //Specifically the selected worker is not being removed/carried over properly
    //Recreate by selecting a different worker and then going to home, and then coming back
    const [state, dispatch] = useReducer(combinedGameReducer, initialState);
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between mb-4">
                <ResourceHeader state={state} />
                <div className="flex justify-end">
                    <button className="bg-gray-300 text-black mr-2 px-5 py-2 rounded">Import</button>
                    <button className="bg-blue-500 text-white px-5 py-2 rounded">Export</button>
                </div>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Temp 1</h2>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Resource Collection</h2>
                        <ResourceCollection dispatch={dispatch} state={state} />
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Temp 2</h2>
                    </div>
                </div>
                <div className="w-full px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                    <h1 className="text-xl font-semibold mb-4">DEBUG</h1>
                        <h2 className="text-xl font-semibold mb-4">{JSON.stringify(state.resourceCollection.activeWorkerList) + ": active worker list"}</h2>
                        <h2 className="text-xl font-semibold mb-4">{JSON.stringify(state.resourceCollection.activeWorkerMap) + ": active worker map"}</h2>
                        <h2 className="text-xl font-semibold mb-4">{JSON.stringify(state.resourceCollection.resourceRateMap) + ": resource rate map"}</h2>
                        <h2 className="text-xl font-semibold mb-4">{JSON.stringify(state.resourceCollection.workerCollection) + ": worker collection"}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
