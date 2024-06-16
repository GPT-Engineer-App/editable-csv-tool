import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const CELL_SIZE = 20;
const WIDTH = 400;
const HEIGHT = 400;
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * (WIDTH / CELL_SIZE));
  const y = Math.floor(Math.random() * (HEIGHT / CELL_SIZE));
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleKeyDown = useCallback((event) => {
    if (DIRECTIONS[event.key]) {
      setDirection(DIRECTIONS[event.key]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 ||
          head.x >= WIDTH / CELL_SIZE ||
          head.y < 0 ||
          head.y >= HEIGHT / CELL_SIZE ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomPosition());
          setScore((prevScore) => prevScore + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver]);

  const handleRestart = () => {
    setSnake([{ x: 2, y: 2 }]);
    setFood(getRandomPosition());
    setDirection(DIRECTIONS.ArrowRight);
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Text fontSize="2xl" mb={4}>Score: {score}</Text>
      <Box position="relative" width={`${WIDTH}px`} height={`${HEIGHT}px`} border="1px solid black">
        {snake.map((segment, index) => (
          <Box
            key={index}
            position="absolute"
            width={`${CELL_SIZE}px`}
            height={`${CELL_SIZE}px`}
            backgroundColor="green"
            left={`${segment.x * CELL_SIZE}px`}
            top={`${segment.y * CELL_SIZE}px`}
          />
        ))}
        <Box
          position="absolute"
          width={`${CELL_SIZE}px`}
          height={`${CELL_SIZE}px`}
          backgroundColor="red"
          left={`${food.x * CELL_SIZE}px`}
          top={`${food.y * CELL_SIZE}px`}
        />
      </Box>
      {isGameOver && (
        <Button mt={4} onClick={handleRestart}>
          Restart Game
        </Button>
      )}
    </Flex>
  );
};

export default SnakeGame;