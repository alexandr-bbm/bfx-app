import React, {Component} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const StyledLayout = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Body = styled.div`
  display: flex;
  margin-top: 10px;
  flex-grow: 1;
`;

const Sidebar = styled.div`
  flex: 1 1 350px;
  margin: 10px;
`;

const Content = styled.div`
  flex: 1 1 1500px;
  margin: 10px;
`;

export class Layout extends Component {

  static Row = styled.div`
    display: flex;
  `;

  static Col = styled.div`
    flex: 1;
    & + & {
      margin-left: 10px;
    }
  `;

  render() {
    const {
      sideBar,
      children,
    } = this.props;
    return (
      <StyledLayout>
        <Body>
          <Sidebar>
            {sideBar}
          </Sidebar>
          <Content>
            {children}
          </Content>
        </Body>
      </StyledLayout>
    )
  }
}

Layout.propTypes = {
  sideBar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
