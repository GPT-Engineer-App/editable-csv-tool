import React, { useState, useEffect } from 'react';
import { Box, VStack, Input, Button, Text, Flex } from '@chakra-ui/react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Messaging = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, { content: message, sender: 'You' }]);
      setMessage('');
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Box width="100%" height="400px" overflowY="scroll" borderWidth="1px" borderRadius="lg" p={4}>
          {messages.map((msg, index) => (
            <Flex key={index} justify={msg.sender === 'You' ? 'flex-end' : 'flex-start'}>
              <Text>{msg.sender}: {msg.content}</Text>
            </Flex>
          ))}
        </Box>
        <Flex width="100%">
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
          <Button onClick={sendMessage} ml={2}>Send</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Messaging;