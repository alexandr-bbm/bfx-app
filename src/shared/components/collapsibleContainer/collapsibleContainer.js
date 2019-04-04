import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {UnmountClosed as CollapsedLib} from 'react-collapse';
import styled from 'styled-components';
import {getPrimaryBackground} from '../../styles/styles.helper';

const StyledCollapsibleContainer = styled.div`
  background: ${getPrimaryBackground};
  padding: 10px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.border.primary};
  padding-bottom: 10px;
`;

export class CollapsibleContainer extends Component {

  state = {
    isOpened: true,
  };

  render() {
    const {titleContent, children} = this.props;
    const {isOpened} = this.state;
    return (
      <StyledCollapsibleContainer>
        <Header onClick={this.toggleIsOpened}>
          <div>
            {titleContent}
          </div>
        </Header>
        <CollapsedLib isOpened={isOpened}>
          <div>
            {children}
          </div>
        </CollapsedLib>
      </StyledCollapsibleContainer>
    )
  }

  toggleIsOpened = () => this.setState({isOpened: !this.state.isOpened});
}

CollapsibleContainer.propTypes = {
  titleContent: PropTypes.node.isRequired,
};
