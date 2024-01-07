import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";

type SimpleDropdownProps = {
    options: {
        id: string,
        label: string
    }[]
}

export default function SimpleDropdown({options}: SimpleDropdownProps) {
    const [selectedWorker, setSelectedWorker] = useState("");

    const getOptions = () => {
        return options.map((option, index) => (
            <MenuItem key={index} value={option.id}>
                {option.label}
            </MenuItem>
        ));
    }
    return (
        <div>
            <FormControl fullWidth>
                <Select
                    value={selectedWorker}
                    onChange={(event) => setSelectedWorker(event.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">None</MenuItem>
                    {getOptions()}
                </Select>
            </FormControl>
        </div>
    );
}