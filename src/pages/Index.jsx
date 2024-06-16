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
        <Button as={Link} to="/news-feed">
          Go to News Feed
        </Button>
        <Button as={Link} to="/messaging">
          Messaging
        </Button>
        <Button as={Link} to="/notifications">
          Notifications
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;