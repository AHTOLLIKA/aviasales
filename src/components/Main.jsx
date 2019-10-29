import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Filter from './Filter';
import Tabs from './Tabs';
import Cards from './Cards';

const StyledMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 754px;
  margin: auto;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTickets: [],
      currentTickets: [],
      numOfChange: [0],
      sortName: 'price',
    };
  }

  async componentDidMount() {
    const res = await axios.get('https://front-test.beta.aviasales.ru/search');
    const { searchId } = res.data;
    this.searchId = searchId;
    this.getTickets(searchId);
  }

  getTickets = async (searchId, acc = []) => {
    try {
      const res = await axios.get('https://front-test.beta.aviasales.ru/tickets', {
        params: { searchId },
      });
      const { stop, tickets } = res.data;
      const currentTickets = [...acc, ...tickets];
      if (stop) {
        this.setState({ allTickets: currentTickets, currentTickets }, this.filterTickets);
      } else {
        this.getTickets(searchId, currentTickets);
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 500') {
        this.getTickets(searchId, acc);
        return false;
      }
    }
    return false;
  };

  changeFilter = numOfChange => {
    this.setState({ numOfChange }, this.filterTickets);
  };

  changeSort = event => {
    this.setState({ sortName: event.target.dataset.value }, this.sortTickets);
  };

  filterTickets = () => {
    const { numOfChange, allTickets } = this.state;
    const currentTickets = allTickets.filter(({ segments }) => {
      return segments.every(({ stops }) => {
        return numOfChange.includes(stops.length);
      });
    });
    this.setState({ currentTickets }, this.sortTickets);
  };

  sortTickets = () => {
    const { sortName } = this.state;
    switch (sortName) {
      case 'price':
        this.sortTicketsByPrice();
        break;
      case 'speed':
        this.sortTicketsBySpeed();
        break;
      default:
        return false;
    }
    return false;
  };

  sortTicketsBySpeed = () => {
    const { currentTickets } = this.state;
    const tickets = currentTickets.sort(({ segments: segments1 }, { segments: segments2 }) => {
      const duration1 = segments1.reduce((acc, { duration }) => acc + duration, 0);
      const duration2 = segments2.reduce((acc, { duration }) => acc + duration, 0);
      return duration1 - duration2;
    });
    this.setState({ currentTickets: tickets });
  };

  sortTicketsByPrice = () => {
    const { currentTickets } = this.state;
    const tickets = currentTickets.sort(({ price: price1 }, { price: price2 }) => price1 - price2);
    this.setState({ currentTickets: tickets });
  };

  render() {
    const { currentTickets, numOfChange, sortName } = this.state;

    return (
      <StyledMain>
        <Filter numOfChange={numOfChange} changeFilter={this.changeFilter} />
        <div>
          <Tabs changeSort={this.changeSort} sortName={sortName} />
          {<Cards tickets={currentTickets.slice(0, 5)} />}
        </div>
      </StyledMain>
    );
  }
}

export default Main;
