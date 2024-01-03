"use client";
import { Button } from "@mui/material";
import { Dispatch, useEffect, useReducer, useState } from "react";
import { IdleGameReducerAction, IdleGameState, idleGameReducer } from "./reducer";

export default function Idle() {
    const resources = ["Iron", "Worker", "Mine"]

    useEffect(() => {
        const interval = setInterval(() => 
            dispatch({
                type: "updateAllResources"
            }), 1000);
    
        return () => clearInterval(interval);
      }, []);
    
    const [state, dispatch] = useReducer(idleGameReducer, {
        gold: 0,
        resources: {
            0: {
                name: "Iron",
                count: 1,
                costMultiplier: 2,
                baseCost: 10
            },
        },
    });

    const getResourceComponents = (resources: typeof state.resources) => {
        return Object.entries(resources).map(entry => {
            const [key, value] = entry
            return <Resource
                key={key}
                state={state}
                updateState={dispatch}
                resourceId={Number(key)}
            />
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
                        costMultiplier: 1
                    })
                }}
            />
            <CustomButton
                primary={"Update all resources"}
                secondary={500}
                color="white"
                onClick={() => {
                    dispatch({
                        type: "updateAllResources"
                    })
                }}
            />
        </div>
        </div>
    );
}

type resourceProps = {
    state: IdleGameState;
    updateState: Dispatch<IdleGameReducerAction>;
    resourceId: number
};
function Resource({
    state,
    updateState,
    resourceId,
}: resourceProps) {
    const gatherResource = () => {
        updateState({
            type: "gatherResource",
            resourceId: resourceId,
        });
    }
    const buyResource = () => {
        updateState({
            type: "buyResource",
            resourceId: resourceId,
        });
    };
    const {baseCost, costMultiplier, count, name} = state.resources[resourceId];
    return (
        <div className="flex flex-col w-1/4 pt-10">
            <CustomButton
                primary={name}
                secondary={count}
                color="white"
                onClick={gatherResource}
            />
            <CustomButton
                primary={`Buy`}
                secondary={costMultiplier * count + baseCost}
                color="purple"
                onClick={buyResource}
            />
        </div>
    );
}

type customButtonProps = {
    primary: string;
    secondary: string | number;
    color: string;
    onClick: () => void;
};
function CustomButton({
    primary,
    secondary,
    color,
    onClick,
}: customButtonProps) {
    return (
        <Button
            sx={{
                color,
            }}
            variant="contained"
            className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onClick}
        >
            <span>{primary}</span>
            <span>{secondary}</span>
        </Button>
    );
}
