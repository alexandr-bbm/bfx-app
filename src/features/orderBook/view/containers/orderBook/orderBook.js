import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import {withOrderBookSubscription} from '../../hocs/withOrderBookSubscription.js';
import {OrdersTable} from '../../components/ordersTable/ordersTable';

const OrderBookStyled = styled.div`
  display: flex;
  min-height: 442px;
`;

const OrderTableContainer = styled.div`
  flex: 1;
  
  :last-child {
    margin-left: 1px;
  }
`;

export class OrderBookComponent extends PureComponent {
  render() {
    const {orderBook, prec, depthScale} = this.props;

    if (!orderBook) {
      return <OrderBookStyled>Loading...</OrderBookStyled>;
    }

    return (
      <OrderBookStyled>
        <OrderTableContainer>
          <OrdersTable
            data={orderBook.bids}
            prec={prec}
            depthScale={depthScale}
          />
        </OrderTableContainer>
        <OrderTableContainer>
          <OrdersTable
            data={orderBook.asks}
            prec={prec}
            depthScale={depthScale}
            isInverted
          />
        </OrderTableContainer>
      </OrderBookStyled>
    )
  }
}

OrderBookComponent.propTypes = {
  symbol: PropTypes.string.isRequired,
  prec: PropTypes.string.isRequired,
};

export const OrderBook = withOrderBookSubscription(OrderBookComponent);
