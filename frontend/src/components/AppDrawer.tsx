import { AutoFixHigh, ListAlt, VideogameAsset } from "@mui/icons-material";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function AppDrawer() {
    const drawerWidth = 240;
    const location = useLocation()

    const pages = [
        {
            title: 'Modifiers',
            path: '/modWheel',
            icon: <AutoFixHigh />
        },
        {
            title: 'Games',
            path: '/gameWheel',
            icon: <VideogameAsset />
        },
        {
            title: 'Modifier Collection',
            path: '/modifierCollection',
            icon: <ListAlt />
        },
        {
            title: 'Game Collection',
            path: '/gameCollection',
            icon: <ListAlt />
        },
        {
            title: 'Games',
            path: '/games',
            icon: <VideogameAsset />
        }
    ];

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            {/* <List disablePadding sx={{ p: 1 }}> */}
            <List>
                <ListItem>
                    <Typography variant="h5" component="div">
                        RGG Assistant
                    </Typography>
                </ListItem>
                {pages.map(({ title, path, icon }) => (
                    <ListItem key={title} disablePadding>
                        <ListItemButton component={Link} to={path} selected={path === location.pathname}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
