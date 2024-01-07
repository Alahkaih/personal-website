"use client"

import SimpleDropdown from "./simpleDropdown";
//TODO: add reducer with resources and selected workers

export default function ResourceCollection() {
    const options = [
        {
            id: "iron",
            label: "Iron",
        },
        {
            id: "gold",
            label: "Gold",
        },
        {
            id: "wood",
            label: "Wood",
        }
    ]
    return (
        <div>
            <SimpleDropdown options={options}/>
        </div>
    );
}