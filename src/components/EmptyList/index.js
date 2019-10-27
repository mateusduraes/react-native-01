import React from 'react';

import PropTypes from 'prop-types';
import { Container, EmptyText } from './styles';

export default function EmptyList({ text }) {
  return (
    <Container>
      <EmptyText>{text}</EmptyText>
    </Container>
  );
}

EmptyList.propTypes = {
  text: PropTypes.string.isRequired,
};
