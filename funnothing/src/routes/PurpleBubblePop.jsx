import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Heart } from "lucide-react";

const PurpleBubblePop = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [level, setLevel] = useState(1);

  const colors = [
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
  ];

  const spawnBubble = () => {
    const newBubble = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // Keep bubbles within 10-90% of width
      y: Math.random() * 80 + 10, // Keep bubbles within 10-90% of height
      size: Math.random() * 20 + 30, // Size between 30-50px
      color: colors[Math.floor(Math.random() * colors.length)],
      points: Math.floor(Math.random() * 3) + 1, // 1-3 points per bubble
      speed: Math.random() * 0.5 + 0.5, // Random speed modifier
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setBubbles([]);
    setGameOver(false);
  };

  const popBubble = (bubbleId, points) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
    setScore((prev) => {
      const newScore = prev + points;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });
  };

  const loseLive = (bubbleId) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
    setLives((prev) => prev - 1);
    if (lives <= 1) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (!gameOver && lives > 0) {
      const spawnInterval = setInterval(() => {
        if (bubbles.length < 5 + level) {
          spawnBubble();
        }
      }, 1000 - level * 100);

      const checkInterval = setInterval(() => {
        setBubbles((prev) => {
          const now = Date.now();
          return prev.filter((bubble) => {
            if ((now - bubble.id) / 1000 > 3) {
              loseLive(bubble.id);
              return false;
            }
            return true;
          });
        });
      }, 100);

      return () => {
        clearInterval(spawnInterval);
        clearInterval(checkInterval);
      };
    }
  }, [gameOver, level, lives, bubbles.length]);

  useEffect(() => {
    if (score > level * 10) {
      setLevel((prev) => prev + 1);
    }
  }, [score]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-purple-100">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-purple-800">
          Purple Bubble Pop
        </CardTitle>
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Crown className="text-purple-600" />
            <span className="text-purple-800">High Score: {highScore}</span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: lives }).map((_, i) => (
              <Heart key={i} className="text-red-500" size={20} />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-purple-200 rounded-lg overflow-hidden">
          {gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-900/80">
              <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
              <p className="text-white mb-4">Final Score: {score}</p>
              <Button
                onClick={startGame}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Play Again
              </Button>
            </div>
          ) : (
            <>
              <div className="absolute top-4 left-4 text-purple-800">
                Score: {score} | Level: {level}
              </div>
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={() => popBubble(bubble.id, bubble.points)}
                  className={`absolute rounded-full ${bubble.color} transition-transform hover:scale-90 cursor-pointer`}
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                  }}
                >
                  <span className="text-white text-sm">+{bubble.points}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PurpleBubblePop;
