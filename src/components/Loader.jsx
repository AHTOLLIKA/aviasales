import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import colors from './colors';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 120%;
  overflow: hidden;
  height: 8px;
`;

const LoaderKeyframes = keyframes`
  from {
    transform: translateX(-56px);
  }

  to {
    transform: translateX(0px);
  }
`;

const LoaderAnimation = css`
  animation: ${LoaderKeyframes} 2.5s infinite linear both;
  animation-play-state: ${({ isActive }) => (isActive ? 'running' : 'pasued')};
`;

const StyledLoader = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2196f3;
  background-image: repeating-linear-gradient(
    135deg,
    ${colors.lightBlue},
    ${colors.lightBlue} 20px,
    ${colors.blue} 0,
    ${colors.blue} 40px
  );
  ${LoaderAnimation};
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  transition: opacity 0.2s linear;
`;

const Loader = ({ isActive }) => (
  <LoaderContainer>
    <StyledLoader isActive={isActive} />
  </LoaderContainer>
);

Loader.propTypes = {
  isActive: PropTypes.bool,
};

Loader.defaultProps = {
  isActive: false,
};

export default React.memo(Loader);
