import { AutoFixHigh, VideogameAsset } from "@mui/icons-material";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

export default function AppDrawer() {
    const drawerWidth = 240;

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
                {['Modifiers', 'Games'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <AutoFixHigh /> : <VideogameAsset />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
