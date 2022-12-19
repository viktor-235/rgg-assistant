import { useEffect, useState } from 'react';
import './App.css';
import IGame from './types/IGame';
import { AppBar, Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import { AutoFixHigh, Inbox, Mail, VideogameAsset } from '@mui/icons-material';

function App() {
  const drawerWidth = 240;
  const [games, setGames] = useState<Array<IGame>>([]);

  useEffect(() => {
    fetch('/games')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container maxWidth="sm">
          <Stack spacing={2}>
            {games.map((game) =>
              <Card sx={{ minWidth: 275 }} key={game.id}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Game
                  </Typography>
                  <Typography variant="h5" component="div">
                    {game.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href={game.infoLink}>About</Button>
                </CardActions>
              </Card>
            )}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
