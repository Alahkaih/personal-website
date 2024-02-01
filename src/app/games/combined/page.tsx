"use client"

import ResourceCollection from "@/components/combinedGames/resourceCollection"
import { ChangeEvent, ReactNode, useReducer } from "react"
import { combinedGameReducer, combinedGameStateZod, initialState } from "./combinedGamePageReducer"
import ResourceHeader from "@/components/combinedGames/resourceHeader"
import Inventory from "@/components/combinedGames/inventory"
import Store from "@/components/combinedGames/store"

export default function Combined() {
    const [state, dispatch] = useReducer(combinedGameReducer, initialState)
    const downloadStateToURL = () => {
       const json = JSON.stringify(state)
       const blob = new Blob([json], {type: "application/json"});
       return URL.createObjectURL(blob);
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        fileReader.readAsText(event.target.files![0], "UTF-8")
        fileReader.onload = (e) => {
            try {
                if(!e.target?.result) throw new Error("No file found")
                dispatch({
                    type: "updateState",
                    newState: combinedGameStateZod.parse(JSON.parse(e.target.result.toString()))
                })
                alert("State imported successfully")
            } catch (error) {
                if(error instanceof Error) {
                    console.error(error.message)
                    alert(error.message)
                }
            }

        }
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between mb-4">
                <ResourceHeader state={state} />
                <div className="flex justify-end">
                    <input type="file" className="hidden" id="file-input" onChange={handleFileUpload}/>
                    <button className="bg-gray-300 text-black mr-2 px-5 py-2 rounded" onClick={() => document.getElementById("file-input")?.click()}>Import</button>
                    <a href={downloadStateToURL()} download={"IdleGameState.json"}><button className="bg-blue-500 text-white px-5 py-2 rounded">Export</button></a>
                </div>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/3 px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Store</h2>
                        <Store state={state} dispatch={dispatch} />
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
                        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
                        <Inventory state={state} dispatch={dispatch} />
                    </div>
                </div>
                {/* <div className="w-full px-2 mb-4">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <h1 className="text-xl font-semibold mb-4">DEBUG</h1>
                        <h2 className="text-xl font-semibold mb-4">
                            {JSON.stringify(state.resourceCollection.activeWorkerList) + ": active worker list"}
                        </h2>
                        <h2 className="text-xl font-semibold mb-4">
                            {JSON.stringify(state.resourceCollection.activeWorkerMap) + ": active worker map"}
                        </h2>
                        <h2 className="text-xl font-semibold mb-4">
                            {JSON.stringify(state.resourceCollection.resourceRateMap) + ": resource rate map"}
                        </h2>
                        <h2 className="text-xl font-semibold mb-4">
                            {JSON.stringify(state.resourceCollection.workerCollection) + ": worker collection"}
                        </h2>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
