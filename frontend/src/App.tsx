import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import IGame from './types/IGame';

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <ul>
            {games.map((game) => {
              return (
                <li key={game.id}>
                  {game.name} - <a href={game.infoLink}>{game.infoLink}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
