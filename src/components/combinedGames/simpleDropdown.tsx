import { ValidWorkerIds } from "@/app/games/combined/combinedGamePageReducer";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

type SimpleDropdownProps = {
    options: {
        id: string;
        label: string;
    }[];
    onSelect: (target: string, oldTarget?: string) => void;
};

export default function SimpleDropdown({
    options,
    onSelect,
}: SimpleDropdownProps) {
    const [selected, setSelected] = useState<string>("-1");
    const [oldSelected, setOldSelected] = useState<string>();

    // const handleSelect = (target: string, oldTarget?: string) => {
    //     setSelected(target)
    //     onSelect(target, oldTarget)
    // }

    useEffect(() => {
        onSelect(selected, oldSelected);
        setOldSelected(selected);
    }, [selected]);

    const getOptions = () => {
        return options.map((option, index) => (
            <MenuItem key={index} value={option.id}>
                {option.label}
            </MenuItem>
        ));
    };
    return (
        <div>
            <FormControl fullWidth>
                <Select
                    value={selected}
                    defaultValue={"-1"}
                    onChange={(event) => setSelected(event.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem value="-1">None</MenuItem>
                    {getOptions()}
                </Select>
            </FormControl>
        </div>
    );
}
