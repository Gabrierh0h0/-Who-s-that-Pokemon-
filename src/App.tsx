import React from 'react';
import PokemonGame from './Components/PokemonGame';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-pokemon-bg flex items-center justify-start pl-48">
      <PokemonGame />
    </div>
  );
};

export default App;