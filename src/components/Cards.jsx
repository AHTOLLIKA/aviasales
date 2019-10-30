import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Row = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Price = styled.h3`
  color: #2196f3;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  flex-grow: 1;
`;

const Logo = styled.img`
  width: 110px;
  height: 36px;
`;

const CardItem = styled.div`
  width: 33%;
`;

const CardItemTitle = styled.div`
  color: #a0b0b9;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 18px;
  text-transform: uppercase;
`;

const CardItemText = styled.div`
  color: #4a4a4a;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
`;

const Segment = ({ origin, destination, date, stops, duration }) => {
  const originDate = new Date(date);
  const endDate = new Date(originDate);
  endDate.setMinutes(originDate.getMinutes() + duration);
  const originDateStr = originDate.toLocaleTimeString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const endDateStr = endDate.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });

  let numTransferStr = '';

  switch (stops.length) {
    case 0:
      numTransferStr = `${stops.length} пересадок`;
      break;
    case 1:
      numTransferStr = `${stops.length} пересадка`;
      break;
    default:
      numTransferStr = `${stops.length} пересадки`;
  }

  return (
    <Row>
      <CardItem>
        <CardItemTitle>
          {origin} – {destination}
        </CardItemTitle>
        <CardItemText>
          {originDateStr} – {endDateStr}
        </CardItemText>
      </CardItem>
      <CardItem>
        <CardItemTitle>В пути</CardItemTitle>
        <CardItemText>
          {Math.floor(duration / 60)} ч {duration % 60} мин
        </CardItemText>
      </CardItem>
      <CardItem>
        <CardItemTitle>{numTransferStr}</CardItemTitle>
        <CardItemText>{stops.join(', ')}</CardItemText>
      </CardItem>
    </Row>
  );
};

Segment.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  date: PropTypes.string,
  stops: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
};

Segment.defaultProps = {
  origin: '',
  destination: '',
  date: '',
  stops: [],
  duration: 0,
};

const Cards = ({ tickets }) =>
  tickets.map(({ price, carrier, segments }) => (
    <Card key={price + carrier + segments[0].stops}>
      <Row>
        <Price>{price.toLocaleString('ru-RU')} P</Price>
        <Logo src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </Row>
      {segments.map(item => (
        <Segment key={item.date} {...item} />
      ))}
    </Card>
  ));

Cards.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object),
};

Cards.defaultProps = {
  tickets: [],
};

export default Cards;
