import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import {withTradesSubscription} from '../../hocs/withTradesSubscription.js';
import {TradesTable} from '../../components/tradesTable/tradesTable';

const TradesStyled = styled.div`
  display: flex;
`;

class TradesComponent extends PureComponent {
  render() {
    const {
      symbolTrades
    } = this.props;

    if (!symbolTrades) {
      return 'Loading...'
    }

    const data = Object.values(symbolTrades)
      .sort((a, b) => b.mts - a.mts)
      .slice(0, 25);

    return (
      <TradesStyled>
        <TradesTable data={data} />
      </TradesStyled>
    )
  }
}

TradesComponent.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export const Trades = withTradesSubscription(TradesComponent);
