import { Box, CssBaseline } from '@mui/material';
import './App.css';
import Router from './Router';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Router />
    </Box>
  );
}

export default App;
