import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const ZoomControlStyled = styled.div`
  display: flex;
`;

const Control = styled.div`
  cursor: pointer;
  margin: 0 5px;
`;

export class ZoomControl extends PureComponent {
  render() {
    const {
      propName,
      className,
      value,
    } = this.props;
    return (
      <ZoomControlStyled className={className}>
          <div>{propName}: {value}</div>
          <Control onClick={this.handleIncrease}>+</Control>
          <Control onClick={this.handleDecrease}>-</Control>
      </ZoomControlStyled>
    )
  }

  handleIncrease = (e) => {
    e.stopPropagation();
    const {
      onChange,
      maxValue,
      value,
      delta,
    } = this.props;

    if (value < maxValue) {
      onChange(value + delta)
    }
  };

  handleDecrease = (e) => {
    e.stopPropagation();
    const {
      onChange,
      value,
      minValue,
      delta,
    } = this.props;

    if (value > minValue) {
      onChange(value - delta)
    }
  }
}

ZoomControl.propTypes = {
  propName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  delta: PropTypes.number.isRequired,
};
