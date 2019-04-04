import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {CollapsibleContainer} from '../../../../../shared/components/collapsibleContainer/collapsibleContainer';
import {ZoomControl} from '../../../../../shared/components/zoomControl/zoomControl';
import {OrderBook} from '../orderBook/orderBook';

const TitleContent = styled.div`
  display: flex;
`;

const ZoomControlStyled = styled(ZoomControl)`
  margin: 0 20px;
`;

const precToServerPrec = (value) => 'P' + value;

export class OrderBookWidget extends PureComponent {

  state = {
    prec: 1,
    depthScale: 100,
  };

  render() {
    const {prec, depthScale} = this.state;

    const titleContent = this._renderTitleContent();

    return (
      <CollapsibleContainer titleContent={titleContent}>
        <OrderBook
          symbol={this.props.symbol}
          prec={precToServerPrec(prec)}
          depthScale={depthScale}
        />
      </CollapsibleContainer>
    )
  }

  _renderTitleContent = () => {
    return (
      <TitleContent>
        <span>Order book</span>
        <ZoomControlStyled
          propName="prec"
          onChange={this.handlePrecChange}
          maxValue={4}
          minValue={0}
          value={this.state.prec}
          delta={1}
        />
        <ZoomControlStyled
          propName="scale"
          onChange={this.handleDepthScaleChange}
          maxValue={150}
          minValue={50}
          value={this.state.depthScale}
          delta={25}
        />
      </TitleContent>
    )
  };

  handlePrecChange = (value) => this.setState({prec: value});
  handleDepthScaleChange = (value) => this.setState({depthScale: value});
}

OrderBookWidget.propTypes = {
};
