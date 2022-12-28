import { Box, Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import AppDrawer from "../components/AppDrawer";

export default function MainLayout() {
    return (
        <>
            <AppDrawer />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}
