"use client"

import { Button } from "@mui/material"

export default function Header() {
    const pages = ["About", "Projects", "Contact", "Resume"]
    const getButtons = (buttons: string[]) => {
        return buttons.map((button, index) => (
            <div className="w-1/3 p-2">
                <Button key={index} onClick={() => alert(button)} variant="contained">{button}</Button>
            </div>
        ))
    }
    return (
        <div className="flex justify-center">
            {getButtons(pages)}
        </div>
    )
}