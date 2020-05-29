import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  max-width: fit-content;
  padding-top: 10px;
  padding-bottom: 11px;
  padding-left: 30px;
  padding-right: 30px;
  background: #ca578e;
  color: #b2b5c4;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

function Button({btnText, isActive, onClick}) {
  return (
    <Wrapper onClick={() => onClick} isActive={isActive}>
      {btnText}
    </Wrapper>
  );
}

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

Button.defaultProps = {
  isActive: false
};

export default Button;
