import { Button } from "@mui/material"

type customButtonProps = {
    primary: string
    secondary: string | number
    color: string
    onClick: () => void
}
export default function CustomButton({ primary, secondary, color, onClick }: customButtonProps) {
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
    )
}
