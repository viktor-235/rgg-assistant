import { Box, Container, CssBaseline } from '@mui/material';
import './App.css';
import AppDrawer from './components/AppDrawer';
import GameWheel from './components/GameWheel';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container maxWidth="xl">
          <GameWheel />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
