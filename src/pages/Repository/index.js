import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({ navigation }) {
  const repositoryUrl = navigation.getParam('repositoryUrl');
  return <WebView source={{ uri: repositoryUrl }} />;
}

Repository.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('name');
  return { title };
};

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
