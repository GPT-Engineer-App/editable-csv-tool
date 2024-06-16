import React from "react";
import { Container, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Button as={Link} to="/snake-game">
          Play Snake Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;