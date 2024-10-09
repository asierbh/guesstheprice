import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import GameOver from './components/GameOver';
import { Product, GameState } from './types';
import { products } from './data/products';
import { ArrowUp, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    highScore: 0,
    leftProduct: products[0],
    rightProduct: products[1],
    gameOver: false,
    products: products,
  });

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setGameState(prevState => ({ ...prevState, highScore: parseInt(storedHighScore, 10) }));
    }
  }, []);

  const getRandomProduct = (exclude: Product): Product => {
    const availableProducts = gameState.products.filter(p => p !== exclude);
    return availableProducts[Math.floor(Math.random() * availableProducts.length)];
  };

  const handleGuess = (guess: 'higher' | 'lower') => {
    const isCorrect = 
      (guess === 'higher' && gameState.rightProduct.price > gameState.leftProduct.price) ||
      (guess === 'lower' && gameState.rightProduct.price < gameState.leftProduct.price);

    if (isCorrect) {
      const newScore = gameState.score + 1;
      const newHighScore = Math.max(newScore, gameState.highScore);
      
      if (newHighScore > gameState.highScore) {
        localStorage.setItem('highScore', newHighScore.toString());
      }

      setGameState(prevState => ({
        ...prevState,
        score: newScore,
        highScore: newHighScore,
        leftProduct: prevState.rightProduct,
        rightProduct: getRandomProduct(prevState.rightProduct),
      }));
    } else {
      setGameState(prevState => ({ ...prevState, gameOver: true }));
    }
  };

  const restartGame = () => {
    setGameState(prevState => ({
      ...prevState,
      score: 0,
      leftProduct: products[0],
      rightProduct: products[1],
      gameOver: false,
    }));
  };

  if (gameState.gameOver) {
    return (
      <GameOver
        score={gameState.score}
        products={gameState.products}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <div className="text-xl text-white">
          Highscore: <span className="font-bold">{gameState.highScore}</span>
        </div>
        <div className="text-xl text-white">
          Score: <span className="font-bold">{gameState.score}</span>
        </div>
      </div>
      <div className="flex justify-between items-start w-full max-w-4xl">
        <div className="flex-1 flex items-center justify-center">
          <ProductCard product={gameState.leftProduct} showPrice={true} />
        </div>
        <div className="flex-shrink-0 flex items-center justify-center mx-4 h-full">
          <div className="vs-text text-white text-4xl font-bold">VS</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <ProductCard product={gameState.rightProduct} showPrice={false} />
          <div className="mt-4 flex flex-col space-y-4">
            <button
              onClick={() => handleGuess('higher')}
              className="button-higher bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center w-40"
            >
              <ArrowUp className="mr-2" size={24} />
              Higher
            </button>
            <button
              onClick={() => handleGuess('lower')}
              className="button-lower bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center w-40"
            >
              <ArrowDown className="mr-2" size={24} />
              Lower
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;