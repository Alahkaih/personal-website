import { CombinedGameState, getWorkerLabel } from "@/app/games/combined/combinedGamePageReducer"
import { FormControl, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"

type SimpleDropdownProps = {
    options: {
        id: string
        label: string
    }[]
    onSelect: (target: string, oldTarget?: string) => void
    value: string
}

export default function SimpleDropdown({ options, onSelect, value }: SimpleDropdownProps) {
    const [oldSelectedId, setOldSelectedId] = useState<string>(value)
    const [oldSelectedLabel, setOldSelectedLabel] = useState<string>(getWorkerLabel(Number(value)))

    useEffect(() => {
        setOldSelectedId(value)
        setOldSelectedLabel(getWorkerLabel(Number(value)))
    }, [value])


    const handleSelect = (target: string, oldTarget?: string) => {
        setOldSelectedId(target)
        setOldSelectedLabel(getWorkerLabel(Number(target)))
        onSelect(target, oldTarget)
    }

    const getOptions = () => {
        const currentOption = { label: oldSelectedLabel, id: oldSelectedId }
        let totalOptions = options
        if (oldSelectedId !== "-1" && !totalOptions.find((option) => option.id === oldSelectedId)) {
            totalOptions = [...totalOptions, currentOption]
            totalOptions.sort((a, b) => Number(a.id) - Number(b.id))
        }
        return totalOptions.map((option, index) => (
            <MenuItem key={index} value={option.id}>
                {option.label}
            </MenuItem>
        ))
    }
        return (
<div>
            <FormControl fullWidth>
            <Select
                value={value ?? "-1"}
                onChange={(event) => handleSelect(event.target.value, oldSelectedId)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
            >
                <MenuItem value="-1">None</MenuItem>
                {getOptions()}
            </Select>
                    </FormControl>
        </div>
    )
}
