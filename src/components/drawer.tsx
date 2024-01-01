"use client"

import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import * as icons from '@mui/icons-material'
import {useState} from "react"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
export default function HomeDrawer() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return (
        <div>
            <div className="fixed top-0 left-0 z-50">
            <Button onClick={() => setOpen(true)}><icons.Menu/></Button>
            </div>
            
            <div className="z-0">
                <Drawer 
                    open={open}
                    anchor="left"
                    onClose={() => setOpen(false)}
                >
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    {getList(list, router)}
                </Drawer>
            </div>
        </div>
    )
}

const getList = (listInputs: listInput[], router: AppRouterInstance) => {
    
    const lists = listInputs.map((listInput, index) => {
        const IconComponent = icons[listInput.icon]
        return (
        <Link href={`/${listInput.urlOverride ?? listInput.name.toLowerCase()}`} key={index}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => router.push(`/${listInput.name}`)}>
                    <ListItemIcon>
                        <IconComponent />
                    </ListItemIcon>
                    <ListItemText primary={listInput.name} />
                </ListItemButton>
            </ListItem>
        </Link>
    )})

    return <List>{lists}</List>
}

type listInput = {
    name: string,
    icon: keyof typeof icons
    urlOverride?: string
}

const list: listInput[] = [
    {
        name: "Home",
        icon: "Home",
        urlOverride: "/"
    },
    {
        name: "About",
        icon: "Info"
    },
    {
        name: "Projects",
        icon: "Code"
    },
    {
        name: "Contact",
        icon: "Email"
    },
    {
        name: "Resume",
        icon: "Description"
    }
]