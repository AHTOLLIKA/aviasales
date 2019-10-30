import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from './colors';

const StyledTabs = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: nowrap;
`;

const Tab = styled.button`
  flex-grow: 1;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => (props.active ? '#fff' : `${colors.fontMain}`)};
  background-color: ${props => (props.active ? `${colors.blue}` : '#fff')};
  border: ${props => (props.active ? 'none' : '1px solid #dfe5ec')};
  cursor: pointer;
`;

const LeftTab = styled(Tab)`
  border-radius: 5px 0 0 5px;
`;

const RightTab = styled(Tab)`
  border-radius: 0 5px 5px 0;
`;

const Tabs = React.memo(({ changeSort, sortName }) => (
  <StyledTabs>
    <LeftTab active={sortName === 'price'} data-value="price" onClick={changeSort}>
      Самый дешевый
    </LeftTab>
    <RightTab active={sortName === 'speed'} data-value="speed" onClick={changeSort}>
      Самый быстрый
    </RightTab>
  </StyledTabs>
));

Tabs.propTypes = {
  changeSort: PropTypes.func.isRequired,
  sortName: PropTypes.string,
};

Tabs.defaultProps = {
  sortName: 'price',
};

export default Tabs;
