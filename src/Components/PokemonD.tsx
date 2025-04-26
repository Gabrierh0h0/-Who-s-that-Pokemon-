import React from 'react';

interface PokemonDisplayProps {
  sprite: string;
  gameOver: boolean;
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ sprite, gameOver }) => {
  return (
    <div className="mb-6 relative w-40 h-40 mx-auto">
      <div className="absolute inset-0"></div>
      <div
        className={`w-40 h-40 mx-auto transition-all duration-500 ${
          gameOver ? 'filter brightness-100 scale-110' : 'filter brightness-0 scale-100'
        }`}
        draggable = "false"
        style={{
          backgroundImage: `url(${sprite})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          userSelect: 'none', // Evita selección
        }}
        
      />
    </div>
  );

};
export default PokemonDisplay;
