"use client"

import { Button } from "@mui/material"
export default function Buttons() {
    const getButtons = (buttons: string[]) => {
        return buttons.map((button, index) => (
            <div className="w-1/3 p-2" key={index}>
                <Button onClick={() => alert(button)} variant="contained">
                    {button}
                </Button>
            </div>
        ))
    }

    const buttons = ["projects", "Contact", "Resume", "About"]
    return (
        // <div className="flex flex-wrap justify-center">
        //     {getButtons(buttons)}
        // </div>
        <div className="flex justify-center py-28">
            <div className="flex flex-wrap w-3/4">{getButtons(buttons)}</div>
        </div>
    )
}
