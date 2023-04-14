import { Box, CssBaseline } from '@mui/material';
import { useSnackbar } from 'notistack';
import './App.css';
import { ApiClientProvider } from './contexts/ApiClientContext';
import Router from './Router';
import { ApiClient } from './services/ApiClient';

function App() {
  const { enqueueSnackbar } = useSnackbar()
  const apiClient = new ApiClient({
    onError: (err) => { enqueueSnackbar(err.message) }
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ApiClientProvider value={apiClient}>
        <Router />
      </ApiClientProvider>
    </Box>
  );
}

export default App;
