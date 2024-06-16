import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Avatar, Button, Input, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setFriends(response.data.friends);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${userId}`, { name, email });
      setUser({ ...user, name, email });
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Avatar size="xl" src={user.avatar} />
        {editing ? (
          <>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Text fontSize="2xl">{user.name}</Text>
            <Text>{user.email}</Text>
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          </>
        )}
        <Text fontSize="xl">Friends</Text>
        <VStack spacing={2}>
          {friends.map((friend) => (
            <Flex key={friend.id} align="center">
              <Avatar size="sm" src={friend.avatar} mr={2} />
              <Text>{friend.name}</Text>
            </Flex>
          ))}
        </VStack>
        <Text fontSize="xl">Posts</Text>
        <VStack spacing={2}>
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text>{post.content}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default UserProfile;