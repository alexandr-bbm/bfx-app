import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import {withTickerSubscription} from '../../hocs/withTickerSubscription.js';
import {getPrimaryBackground} from '../../../../../shared/styles/styles.helper';

const TickerStyled = styled.div`
  display: flex;
  background: ${getPrimaryBackground};
  padding: 10px;
  justify-content: space-around;
`;

const Label = styled.span`
  display: flex;
  color: #A4A9AC;
  margin-right: 5px;
`;

const Value = styled.span`
  display: flex;
  color: #A4A9AC;
`;

const TextAccent = styled.span`
  font-size: 16px;
`;

const Row = styled.div`
  display: flex;
  margin: 5px 0;
`;

const Change = styled(Row)`
  color: ${p => p.change < 0 ? p.theme.foreground.negative : p.theme.foreground.positive}
`;

class TickerComponent extends PureComponent {
  render() {
    const {
      symbol,
      symbolTicker
    } = this.props;

    if (!symbolTicker) {
      return 'Loading...'
    }

    const {
      volume,
      low,
      high,
      dailyChange,
      dailyChangePerc,
      lastPrice,
    } = symbolTicker;

    return (
      <TickerStyled>
        <div>
          <TextAccent>{symbol.slice(1)}</TextAccent>
          <Row>
            <Label>VOL</Label>
            <Value>{this._format(volume)}</Value>
            <Label>USD</Label>
          </Row>
          <Row>
            <Label>LOW</Label>
            <Value>{this._format(low)}</Value>
          </Row>
        </div>
        <div>
          <div>
            <TextAccent>{this._format(lastPrice)}</TextAccent>
          </div>
          <Change change={dailyChange}>
            {this._format(dailyChange)} ({dailyChangePerc}%)
          </Change>
          <Row>
            <Label>HIGH</Label>
            <Value>{this._format(high)}</Value>
          </Row>
        </div>
      </TickerStyled>
    )
  }

  _format = value => value.toFixed(1);
}

TickerComponent.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export const Ticker = withTickerSubscription(TickerComponent);
