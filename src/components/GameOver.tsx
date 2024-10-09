import React from 'react';
import { Product } from '../types';
import { Share2 } from 'lucide-react';

interface GameOverProps {
  score: number;
  products: Product[];
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, products, onRestart }) => {
  const shareScore = () => {
    const text = `I scored ${score} points in Guess The Price! Can you beat my score?`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-[#1e293b] rounded-lg p-8 max-w-2xl w-full text-white">
        <h2 className="text-3xl font-bold mb-4">Game Over</h2>
        <p className="text-xl mb-6">Your score: {score}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 bg-[#2d3748] rounded hover:bg-[#4a5568] transition-colors"
            >
              <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-full mr-2" />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onRestart}
            className="bg-[#4f46e5] text-white px-6 py-2 rounded hover:bg-[#4338ca] transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={shareScore}
            className="bg-[#10b981] text-white px-6 py-2 rounded hover:bg-[#059669] transition-colors flex items-center"
          >
            <Share2 className="mr-2" size={18} />
            Share Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;