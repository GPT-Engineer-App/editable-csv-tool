import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Flex, Avatar } from '@chakra-ui/react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock API call to fetch notifications
    const fetchNotifications = async () => {
      const mockData = [
        { id: 1, type: 'like', user: { name: 'John Doe', avatar: '' }, content: 'liked your post.' },
        { id: 2, type: 'comment', user: { name: 'Jane Smith', avatar: '' }, content: 'commented on your post.' },
        { id: 3, type: 'friend_request', user: { name: 'Alice Johnson', avatar: '' }, content: 'sent you a friend request.' },
      ];
      setNotifications(mockData);
    };

    fetchNotifications();

    socket.on('newNotification', (newNotification) => {
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {notifications.map((notification) => (
          <Box key={notification.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Flex align="center" mb={2}>
              <Avatar src={notification.user.avatar} mr={2} />
              <Text fontWeight="bold">{notification.user.name}</Text>
            </Flex>
            <Text>{notification.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Notifications;