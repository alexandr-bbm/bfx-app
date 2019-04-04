import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../../redux/actions';

const WsTogglerStyled = styled.div`
  display: block;
`;

class WsTogglerComponent extends PureComponent {
  render() {
    const {wsEnabled} = this.props;
    return (
      <WsTogglerStyled>
        <div>
          Websocket enabled {Boolean(wsEnabled).toString()}
        </div>
        <button onClick={this._handleToggle}>Toggle</button>
      </WsTogglerStyled>
    )
  }

  _handleToggle = () => this.props.startSetWsState(!this.props.wsEnabled);
}

const mapState = (state) => ({
  wsEnabled: state.config.wsEnabled,
});

const mapDispatch = {
  startSetWsState: actions.startSetWsState,
};

export const WsToggler = connect(mapState, mapDispatch)(WsTogglerComponent);
