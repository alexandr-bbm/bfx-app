import React, {Component} from 'react';
import {Layout} from '../../shared/components/layout/layout';
import {CollapsibleContainer} from '../../shared/components/collapsibleContainer/collapsibleContainer';
import {Trades} from '../../features/trades/view/containers/trades/trades';
import {Ticker} from '../../features/ticker/view/containers/ticker/ticker';
import {WsToggler} from '../../features/config/view/containers/wsToggler/wsToggler';
import {OrderBookWidget} from '../../features/orderBook/view/containers/orderBookWidget/orderBookWidget';

export class MainPage extends Component {
  render() {
    const currentSymbol = 'tBTCUSD';

    const sideBar = (
      <div>
        <Ticker symbol={currentSymbol} />
      </div>
    );

    return (
      <Layout sideBar={sideBar}>
        <Layout.Row>
          <Layout.Col>
            <OrderBookWidget symbol={currentSymbol} />
          </Layout.Col>
          <Layout.Col>
            <CollapsibleContainer titleContent="Trades">
              <Trades symbol={currentSymbol} />
            </CollapsibleContainer>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <WsToggler />
        </Layout.Row>
      </Layout>
    )
  }
}
