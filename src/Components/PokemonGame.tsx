import React, { useState, useEffect } from 'react';
import { fetchPokemonData } from '../services/pokeapi'
import PokemonDisplay from './PokemonD';

interface PokemonData {
  name: string;
  sprite: string;
}

const PokemonGame: React.FC = () => {
  const [correctPokemon, setCorrectPokemon] = useState<PokemonData | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [missedCount, setMissedCount] = useState<number>(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const getRandomId = (exclude: number[]): number => {
    let id: number;
    do {
      id = Math.floor(Math.random() * 898) + 1;
    } while (exclude.includes(id));
    return id;
  };

  const loadNewPokemon = async () => {
    setLoading(true);
    setGameOver(false);
    setErrorMessage(null);

    const correctId = Math.floor(Math.random() * 898) + 1;
    const correctData = await fetchPokemonData(correctId);
    setCorrectPokemon(correctData);

    const excludeIds = [correctId];
    const optionIds = [];
    for (let i = 0; i < 3; i++) {
      const newId = getRandomId(excludeIds);
      excludeIds.push(newId);
      optionIds.push(newId);
    }

    const optionPromises = optionIds.map(id => fetchPokemonData(id));
    const optionData = await Promise.all(optionPromises);
    const optionNames = optionData.map(data => data.name);

    const allOptions = [...optionNames, correctData.name];
    allOptions.sort(() => Math.random() - 0.5);
    setOptions(allOptions);

    setLoading(false);
  };

  useEffect(() => {
    loadNewPokemon();
  }, []);

  useEffect(() => {

    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reinicia el audio al principio
    }

    if (gameOver && correctPokemon) {
      const cry = new Audio(`https://play.pokemonshowdown.com/audio/cries/${correctPokemon.name}.ogg`);
      cry.play().catch(() => console.log("Sonido no disponible para este Pokémon"));
      setAudio(cry);
    }
  }, [gameOver, correctPokemon]);

  const handleSelection = (selectedName: string) => {
    if (!correctPokemon) return;

    if (selectedName.toLowerCase() === correctPokemon.name.toLowerCase()) {
      setGameOver(true);
      setErrorMessage(null);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);

    } else {
      setGameOver(true);
      setErrorMessage(`Incorrecto, el Pokémon era ${correctPokemon.name}.`);
      setMissedCount(prev => prev + 1);
      setStreak(0);
      setTimeout(() => {
        loadNewPokemon();
      }, 2000);
    }
  };

  const handleNext = () => {
    if (!gameOver) {
      setMissedCount(prev => prev + 1);
      setStreak(0);
    }
    loadNewPokemon();
  };

  return (
    <div className=" p-6 rounded-lg text-center max-w-md w-full ">
      <img src="https://img.itch.zone/aW1nLzEzMjk4NTM4LnBuZw==/original/g1adSa.png" alt="" />
      <div className=" text-black press-start-2p-regular">
        <p>Aciertos: {correctCount}</p>
        <p>Racha: {streak}</p>
        <p>No adivinados: {missedCount}</p>
      </div>
      {loading ? (
        <p className="text-yellow-400">Cargando...</p>
      ) : (
        correctPokemon && (
          <>
            <PokemonDisplay sprite={correctPokemon.sprite} gameOver={gameOver} />
            {errorMessage && (
              <p className="text-red-500 mb-4 press-start-2p-regular">{errorMessage}</p>
            )}
            {!gameOver && !errorMessage && (
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {options.map((name, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelection(name)}
                      className=" press-start-2p-regular bg-pokemon-yellow hover:bg-red-600 text-black  py-3 px-4 rounded-lg shadow-md border-2 border-white transition-all duration-200 transform hover:scale-105"
                    >
                      {name.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="bg-gray-600 hover:bg-blue-800 text-white press-start-2p-regular py-2 px-4 rounded-lg shadow-md border-2 border-white transition-all duration-200 transform hover:scale-105"
                >
                  Siguiente Pokémon
                </button>
              </div>
            )}
            {gameOver && !errorMessage && (
              
              <div className="mt-4">
                <p className="text-yellow-500 text-lg press-start-2p-regular ">
                  ¡Es {correctPokemon.name.toUpperCase()}!
                </p>
                <button
                  onClick={handleNext}
                  className="mt-2 bg-pokemon-yellow text-white press-start-2p-regular py-2 px-4 rounded-lg shadow-md border-2 border-white transition-all duration-200 transform hover:scale-105"
                >
                  Siguiente Pokémon
                </button>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default PokemonGame;