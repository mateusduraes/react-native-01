import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TouchableHighlight } from 'react-native';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingContainer,
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  const getData = async (page = 1) => {
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred?page=${page}`);
    setNextPage(page + 1);
    setStars(response.data);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    })();
  }, []);

  const user = navigation.getParam('user');

  const navigateToDetail = starredItem => {
    navigation.navigate('Repository', {
      repositoryUrl: starredItem.html_url,
      name: starredItem.name,
    });
  };

  const refreshList = async () => {
    setNextPage(1);
    setLoadingRefresh(true);
    await getData();
    setLoadingRefresh(false);
  };

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#7159c1" />
        </LoadingContainer>
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.4}
          onEndReached={() => getData(nextPage)}
          onRefresh={refreshList}
          refreshing={loadingRefresh}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => navigateToDetail(item)}>
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableHighlight>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => {
  const user = navigation.getParam('user');
  return {
    title: user.name,
  };
};

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
