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
  color: ${props => (props.isActive ? '#fff' : `${colors.fontMain}`)};
  background-color: ${props => (props.isActive ? `${colors.blue}` : '#fff')};
  border: ${props => (props.isActive ? 'none' : '1px solid #dfe5ec')};
  cursor: pointer;
`;

const LeftTab = styled(Tab)`
  border-radius: 5px 0 0 5px;
`;

const RightTab = styled(Tab)`
  border-radius: 0 5px 5px 0;
`;

const changeSortToPice = changeSort => () => {
  changeSort('price');
};

const changeSortToSpeed = changeSort => () => {
  changeSort('speed');
};

const Tabs = ({ changeSort, sortName }) => (
  <StyledTabs>
    <LeftTab isActive={sortName === 'price'} onClick={changeSortToPice(changeSort)}>
      Самый дешевый
    </LeftTab>
    <RightTab isActive={sortName === 'speed'} onClick={changeSortToSpeed(changeSort)}>
      Самый быстрый
    </RightTab>
  </StyledTabs>
);

Tabs.propTypes = {
  changeSort: PropTypes.func.isRequired,
  sortName: PropTypes.string,
};

Tabs.defaultProps = {
  sortName: 'price',
};

export default React.memo(Tabs);
