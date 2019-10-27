import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';
import EmptyList from '../../components/EmptyList';
import api from '../../services/api';
import { colors } from '../../config/theme';

export default function Main({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const usersStorage = await AsyncStorage.getItem('users');
      if (usersStorage) {
        setUsers(JSON.parse(usersStorage));
      }
    })();
  }, []);

  const handleAddUser = async () => {
    setLoading(true);
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    setUsers([...users, data]);
    await AsyncStorage.setItem('users', JSON.stringify([...users, data]));
    setLoading(false);
    Keyboard.dismiss();
  };

  const navigateToDetail = user => {
    navigation.navigate('User', { user });
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add user"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton onPress={handleAddUser} loading={loading}>
          {loading ? (
            <ActivityIndicator color={colors.primaryContrast} />
          ) : (
            <Icon name="add" size={20} color={colors.primaryContrast} />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        ListEmptyComponent={
          <EmptyList text="You haven't added any users yet. Let's start" />
        }
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton
              onPress={() => {
                navigateToDetail(item);
              }}
            >
              <ProfileButtonText>Profile</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Users',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
