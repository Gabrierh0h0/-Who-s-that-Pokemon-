import React from 'react';

interface PokemonDisplayProps {
  sprite: string;
  gameOver: boolean;
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ sprite, gameOver }) => {
  return (
    <div className="mb-12 relative w-80 h-44 mx-auto">
      <img
        onContextMenu={(e) => e.preventDefault()} 
        style={{ userSelect: 'none', pointerEvents: 'none' }}
        draggable="false"
        src={sprite}
        alt="Silueta de Pokémon"
        className={`w-60 h-60 mx-auto transition-all duration-500 ${
          gameOver ? 'filter brightness-100 scale-110' : 'filter brightness-0 scale-100'
        }`}
      />
    </div>
  );
};

export default PokemonDisplay;