import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Spinner, Avatar, Flex } from '@chakra-ui/react';
import axios from 'axios';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {posts.map((post) => (
          <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Flex align="center" mb={2}>
              <Avatar src={post.user.avatar} mr={2} />
              <Text fontWeight="bold">{post.user.name}</Text>
            </Flex>
            <Text>{post.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default NewsFeed;