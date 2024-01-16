"use client"

import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Home, Menu, Info, Code, Email, Description } from "@mui/icons-material"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
export default function HomeDrawer() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return (
        <div>
            <div className="fixed top-0 left-0">
                <Button onClick={() => setOpen(true)}>
                    <Menu
                        sx={{
                            color: "white",
                        }}
                    />
                </Button>
            </div>

            <div>
                <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{
                            color: "black",
                        }}
                    >
                        Close
                    </Button>
                    {getList(list, router)}
                </Drawer>
            </div>
        </div>
    )
}

const getList = (listInputs: listInput[], router: AppRouterInstance) => {
    const lists = listInputs.map((listInput, index) => {
        return (
            <Link href={`/${listInput.urlOverride ?? listInput.name.toLowerCase()}`} key={index}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => router.push(`/${listInput.name}`)}>
                        <ListItemIcon>{listInput.icon}</ListItemIcon>
                        <ListItemText primary={listInput.name} />
                    </ListItemButton>
                </ListItem>
            </Link>
        )
    })

    return <List>{lists}</List>
}

type listInput = {
    name: string
    icon: JSX.Element
    urlOverride?: string
}

const list: listInput[] = [
    {
        name: "Home",
        icon: <Home />,
        urlOverride: "/",
    },
    {
        name: "About",
        icon: <Info />,
    },
    {
        name: "Projects",
        icon: <Code />,
    },
    {
        name: "Contact",
        icon: <Email />,
    },
    {
        name: "Resume",
        icon: <Description />,
    },
    {
        name: "Games",
        icon: <Code />,
        urlOverride: "games/combined",
    },
]
