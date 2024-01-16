"use client"
import { Button } from "@mui/material"
import { Dispatch, useEffect, useReducer, useState } from "react"
import { IdleGameReducerAction, IdleGameState, idleGameReducer } from "./reducer"
import CustomButton from "@/components/idleGame/customResourceButton"
import Resource from "@/components/idleGame/resource"

export default function Idle() {
    const resources = ["Iron", "Worker", "Mine"]

    useEffect(() => {
        const interval = setInterval(
            () =>
                dispatch({
                    type: "updateAllResources",
                }),
            1000,
        )

        return () => clearInterval(interval)
    }, [])

    const [state, dispatch] = useReducer(idleGameReducer, {
        gold: 0,
        resources: {
            0: {
                name: "Iron",
                count: 1,
                costMultiplier: 2,
                baseCost: 10,
            },
        },
    })

    const getResourceComponents = (resources: typeof state.resources) => {
        return Object.keys(resources).map((key) => {
            return <Resource key={key} state={state} updateState={dispatch} resourceId={Number(key)} />
        })
    }
    return (
        <div className="flex flex-col items-center">
            <div className="p-12">
                <p>Gold: {state.gold}</p>
            </div>
            {getResourceComponents(state.resources)}
            <div className="flex flex-col w-1/4 pt-10">
                <CustomButton
                    primary={"Add new Resource"}
                    secondary={500}
                    color="white"
                    onClick={() => {
                        dispatch({
                            type: "createResource",
                            resourceName: "Resource",
                            baseCost: 100,
                            costMultiplier: 1,
                        })
                    }}
                />
                <CustomButton
                    primary={"Update all resources"}
                    secondary={500}
                    color="white"
                    onClick={() => {
                        dispatch({
                            type: "updateAllResources",
                        })
                    }}
                />
            </div>
        </div>
    )
}
